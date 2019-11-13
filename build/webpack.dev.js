const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",

  devServer: {
    hot: true,
    contentBase: "/dist",
    publicPath: "/",
    stats: "errors-only"
  },
  // devtool: "source-map",
  // module: {},
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
