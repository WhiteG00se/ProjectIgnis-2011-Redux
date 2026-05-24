const path = require("path");

const { copyFileInRedux } = require("./utils");

module.exports = function buildCardsDb({ reduxRoot }) {
  copyFileInRedux({
    reduxRoot,
    source: path.join(reduxRoot, "vanilla", "cards.cdb"),
    output: path.join(reduxRoot, "modded", "cards.cdb"),
  });
};
