const path = require("path");
const webpack = require('webpack');

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
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  },
  resolve: {
    modules: ["node_modules", "client"],
    mainFiles: ["_index", "index"]
  },
  plugins: [
		new webpack.ProvidePlugin({
      THREE: 'three',
    }),
	],
  devtool: 'source-map',
  watch: true,
};