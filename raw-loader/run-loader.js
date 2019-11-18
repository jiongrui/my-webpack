const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: path.join(__dirname, "./src/demo.txt"),
    loaders: [
      {
        loader: path.join(__dirname, "./src/raw-loader.js"),
        options: {
          name: "test-name"
        }
      }
    ],
    context: {
      minimize: true
    },
    readResource: fs.readFile.bind(fs)
  },
  function(err, result) {
    err ? console.log("err", err) : console.log("result", result);
  }
);
