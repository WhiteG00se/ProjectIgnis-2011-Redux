const fs = require("fs");
const path = require("path");

function assertInsideRedux(reduxRoot, targetPath) {
  const relative = path.relative(reduxRoot, targetPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside Redux: ${targetPath}`);
  }
}

function cleanDirectory(reduxRoot, targetDir) {
  assertInsideRedux(reduxRoot, targetDir);
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
}

function copyFileInRedux({ reduxRoot, source, output }) {
  assertInsideRedux(reduxRoot, output);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.copyFileSync(source, output);
}

module.exports = {
  cleanDirectory,
  copyFileInRedux,
};
