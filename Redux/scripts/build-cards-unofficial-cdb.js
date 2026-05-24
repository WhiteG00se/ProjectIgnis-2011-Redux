const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const { copyFileInRedux } = require("./utils");

module.exports = function buildCardsUnofficialDb({ reduxRoot }) {
  const output = path.join(reduxRoot, "modded", "cards-unofficial.cdb");

  copyFileInRedux({
    reduxRoot,
    source: path.join(reduxRoot, "vanilla", "cards-unofficial.cdb"),
    output,
  });

  const db = new DatabaseSync(output);
  const result = db
    .prepare("UPDATE datas SET atk = ?, def = ? WHERE id = ?")
    .run(1900, 1900, 21593987); // Makyura the Destructor (Pre-Errata)
  db.close();

  if (Number(result.changes) !== 1) {
    throw new Error("Expected to update Makyura the Destructor (Pre-Errata) once");
  }
};
