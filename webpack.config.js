const path = require("path");

module.exports = {
  entry: {
    app: [path.resolve(__dirname, "dev/app.js")],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, "dev"),
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  devtool: 'source-map',
  watch: true,
};