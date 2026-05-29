const fs = require("fs");
const path = require("path");

const { copyFileInRedux } = require("./utils");

module.exports = function buildCardPics({ reduxRoot }) {
  const sourceDir = path.join(reduxRoot, "assets", "pics");

  if (!fs.existsSync(sourceDir)) {
    return;
  }

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (!entry.isFile()) {
      continue;
    }

    copyFileInRedux({
      reduxRoot,
      source: path.join(sourceDir, entry.name),
      output: path.join(reduxRoot, "modded", "pics", entry.name),
    });
  }
};
