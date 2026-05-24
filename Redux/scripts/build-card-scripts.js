const path = require("path");

const { copyFileInRedux } = require("./utils");

const cardScripts = [
  path.join("official", "c85602018.lua"), // Last Will
  path.join("official", "c23557835.lua"), // Dimension Fusion
  path.join("official", "c4031928.lua"), // Change of Heart
  path.join("official", "c69015963.lua"), // Cyber-Stein
  path.join("official", "c3078576.lua"), // Yata-Garasu
  path.join("official", "c34206604.lua"), // Magical Scientist
  path.join("official", "c74191942.lua"), // Painful Choice
  path.join("pre-errata", "c511003012.lua"), // Witch of the Black Forest
  path.join("pre-errata", "c511002631.lua"), // Sangan
  path.join("pre-errata", "c511003019.lua"), // Mind Master
  path.join("pre-errata", "c511003116.lua"), // Destiny HERO - Disk Commander
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
