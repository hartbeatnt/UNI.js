const path = require("path");

module.exports = {
  entry: {
    app: ["./dev/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  module: {
      loaders: [
          { test: /\.css$/, loader: "style!css" }
      ]
  },
  devtool: 'source-map',
  watch: true,
};