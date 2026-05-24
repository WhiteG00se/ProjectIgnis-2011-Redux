const path = require("path");

const buildCardsDb = require("./build-cards-cdb");
const buildCardsUnofficialDb = require("./build-cards-unofficial-cdb");
const buildLflist = require("./build-lflist");
const { cleanDirectory } = require("./utils");

const reduxRoot = path.resolve(__dirname, "..");
const moddedDir = path.join(reduxRoot, "modded");

const buildTargets = [
  buildLflist,
  buildCardsDb,
  buildCardsUnofficialDb,
];

cleanDirectory(reduxRoot, moddedDir);
cleanDirectory(reduxRoot, path.join(moddedDir, "script"));

for (const buildTarget of buildTargets) {
  buildTarget({ reduxRoot });
}

console.log(`Built ${buildTargets.length} Redux file(s) into ${moddedDir}`);
