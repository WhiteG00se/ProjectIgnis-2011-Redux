const path = require("path");

const { copyFileInRedux } = require("./utils");

const cardScripts = [
  path.join("official", "c69015963.lua"), // Cyber-Stein
  path.join("official", "c3078576.lua"), // Yata-Garasu
  path.join("pre-errata", "c511003012.lua"), // Witch of the Black Forest
  path.join("pre-errata", "c511002631.lua"), // Sangan
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
