const path = require("path");

const { copyFileInRedux } = require("./utils");

module.exports = function buildLflist({ reduxRoot }) {
  copyFileInRedux({
    reduxRoot,
    source: path.join(reduxRoot, "vanilla", "2011-Redux.lflist.conf"),
    output: path.join(reduxRoot, "modded", "2011-Redux.lflist.conf"),
  });
};
