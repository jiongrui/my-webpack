const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");

module.exports = function(source) {
  const { name } = loaderUtils.getOptions(this);
  console.log("name", name);
  const json = JSON.stringify(source)
    .replace("foo", "")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  const callback = this.async();
  fs.readFile(path.join(__dirname, "./async.txt"), "utf-8", (err, data) => {
    if (err) {
      callback(err, data);
    }
    callback(null, data);
  });

  //   return `export default ${json}`;
  //err ? new Error(err) :null
  //   this.callback(null, json);
};
