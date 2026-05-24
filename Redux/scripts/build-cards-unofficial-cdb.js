const path = require("path");

const { copyFileInRedux } = require("./utils");

module.exports = function buildCardsUnofficialDb({ reduxRoot }) {
  copyFileInRedux({
    reduxRoot,
    source: path.join(reduxRoot, "vanilla", "cards-unofficial.cdb"),
    output: path.join(reduxRoot, "modded", "cards-unofficial.cdb"),
  });
};
