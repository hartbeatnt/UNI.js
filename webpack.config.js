const path = require("path");

module.exports = {
  entry: {
    app: ["./dev/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/public/",
    filename: "bundle.js"
  }
};