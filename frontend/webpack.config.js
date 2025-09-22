const path = require("path");

module.exports = {
  entry: "./src/index.js", // main React file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,         // <-- handle CSS files
        use: ["style-loader", "css-loader"], // inject CSS into DOM
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "development",
};
