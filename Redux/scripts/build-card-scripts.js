const path = require("path");

const { copyFileInRedux } = require("./utils");

const cardScripts = [
  path.join("official", "c69015963.lua"), // Cyber-Stein
];

module.exports = function buildCardScripts({ reduxRoot }) {
  for (const cardScript of cardScripts) {
    copyFileInRedux({
      reduxRoot,
      source: path.join(reduxRoot, "scripts", "card-scripts", cardScript),
      output: path.join(reduxRoot, "modded", "script", cardScript),
    });
  }
};
