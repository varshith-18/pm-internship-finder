const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: String,
  sector: String,
  location: String,
  skills_required: [String],
  description: String,
});

module.exports = mongoose.model("Internship", internshipSchema);
