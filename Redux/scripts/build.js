const path = require("path");

const buildCardsDb = require("./build-cards-cdb");
const buildCardsUnofficialDb = require("./build-cards-unofficial-cdb");
const buildCardScripts = require("./build-card-scripts");
const buildLflist = require("./build-lflist");
const { cleanDirectory } = require("./utils");

const reduxRoot = path.resolve(__dirname, "..");
const moddedDir = path.join(reduxRoot, "modded");

const buildTargets = [
  buildLflist,
  buildCardsDb,
  buildCardsUnofficialDb,
  buildCardScripts,
];

cleanDirectory(reduxRoot, moddedDir);
cleanDirectory(reduxRoot, path.join(moddedDir, "script"));

for (const buildTarget of buildTargets) {
  buildTarget({ reduxRoot });
}

console.log(`Built ${buildTargets.length} Redux target(s) into ${moddedDir}`);
