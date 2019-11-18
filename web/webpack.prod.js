"use strict";

const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index.js$/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ["vendor", pageName],
        injects: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  mode: "production",
  entry: entry,
  output: {
    filename: "[name]_[chunkhash:8].js",
    path: path.join(__dirname + "/dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          // 自动补齐前缀
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()]
            }
          },
          // px 转换为 rem
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[hash:8].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    //拆分 css
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    }),
    //压缩 css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano")
    }),
    //每次打包之前清除dist文件夹
    new CleanWebpackPlugin()
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
    //       global: "React"
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
    //       global: "ReactDOM"
    //     }
    //   ]
    // })
  ].concat(htmlWebpackPlugins),
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /(react|react-dom)/,
  //         name: "vendor",
  //         chunks: "all"
  //       }
  //     }
  //   }
  // }
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
};
