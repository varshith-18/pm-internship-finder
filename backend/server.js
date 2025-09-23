const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recommendRoutes = require("./routes/recommendRoutes");
const path = require("path");

const app = express();
const PORT = 5000;

// Seed internships if DB is empty
const Internship = require('./models/Internship');
const fs = require('fs');
const internshipsPath = path.join(__dirname, 'data', 'internships.json');

mongoose.connection.once('open', async () => {
  const count = await Internship.countDocuments();
  if (count === 0 && fs.existsSync(internshipsPath)) {
    const data = JSON.parse(fs.readFileSync(internshipsPath, 'utf-8'));
    await Internship.insertMany(data);
    console.log('Seeded internships to DB');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pm-internship-finder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/recommend", recommendRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// For any other route, serve index.html from the React build
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
