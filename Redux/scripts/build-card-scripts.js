const path = require("path");

const { copyFileInRedux } = require("./utils");

const cardScripts = [
  path.join("official", "c85602018.lua"), // Last Will
  path.join("official", "c23557835.lua"), // Dimension Fusion
  path.join("official", "c4031928.lua"), // Change of Heart
  path.join("official", "c53129443.lua"), // Dark Hole
  path.join("official", "c69015963.lua"), // Cyber-Stein
  path.join("official", "c3078576.lua"), // Yata-Garasu
  path.join("official", "c34206604.lua"), // Magical Scientist
  path.join("official", "c74191942.lua"), // Painful Choice
  path.join("official", "c72989439.lua"), // Black Luster Soldier - Envoy of the Beginning
  path.join("official", "c40044918.lua"), // Elemental HERO Stratos
  path.join("official", "c84749824.lua"), // Solemn Warning
  path.join("official", "c82732705.lua"), // Skill Drain
  path.join("official", "c83555666.lua"), // Ring of Destruction
  path.join("official", "c27970830.lua"), // Gateway of the Six
  path.join("official", "c52687916.lua"), // Trishula, Dragon of the Ice Barrier
  path.join("pre-errata", "c511001039.lua"), // Dark Magician of Chaos
  path.join("pre-errata", "c511000229.lua"), // Dark Strike Fighter
  path.join("pre-errata", "c511000818.lua"), // Sinister Serpent
  path.join("pre-errata", "c511003012.lua"), // Witch of the Black Forest
  path.join("pre-errata", "c511002631.lua"), // Sangan
  path.join("pre-errata", "c511003019.lua"), // Mind Master
  path.join("pre-errata", "c511003116.lua"), // Destiny HERO - Disk Commander
  path.join("pre-errata", "c511002996.lua"), // Imperial Order
  path.join("pre-errata", "c511000819.lua"), // Chaos Emperor Dragon - Envoy of the End
  path.join("pre-errata", "c511002993.lua"), // Brionac, Dragon of the Ice Barrier
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
