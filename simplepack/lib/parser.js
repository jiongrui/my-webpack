const fs = require("fs");
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const { transformFromAst } = require("babel-core");

module.exports = {
  getAst: path => {
    const source = fs.readFileSync(path, "utf-8");

    return babylon.parse(source, {
      sourceType: "module"
    });
  },
  getDependencies: ast => {
    const dependencies = [];

    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });

    return dependencies;
  },
  transform: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"]
    });

    return code;
  }
};
