const baseConfig = require("./webpack.base");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    publicPath: "./"
  },
  module: {
    rules: []
  },
  plugins: [new CleanWebpackPlugin()],
  stats: "errors-only"
});
