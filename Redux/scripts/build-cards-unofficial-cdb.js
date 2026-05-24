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
  const makyuraStatsResult = db
    .prepare("UPDATE datas SET atk = ?, def = ? WHERE id = ?")
    .run(1900, 1900, 21593987); // Makyura the Destructor (Pre-Errata)
  const witchTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'When this card is sent from the field to the Graveyard: Add 1 monster with 600 or less DEF from your Deck to your hand. You can only use this effect of "Witch of the Black Forest" once per turn.',
      511003012,
    ); // Witch of the Black Forest (Pre-Errata)
  const sanganTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'When this card is sent from the field to the Graveyard: Add 1 monster with 1500 or less ATK from your Deck to your hand. You can only use this effect of "Sangan" once per turn.',
      511002631,
    ); // Sangan (Pre-Errata)
  const mindMasterTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'You can only use this effect of "Mind Master" once per turn. You can pay 800 LP and Tribute 1 Psychic-Type monster; Special Summon 1 Level 4 or lower Psychic-Type monster from your Deck in face-up Attack Position.',
      511003019,
    ); // Mind Master (Pre-Errata)
  const diskCommanderTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'If this card is Special Summoned: Draw 1 card. You can only use this effect of "Destiny HERO - Disk Commander" once per turn.',
      511003116,
    ); // Destiny HERO - Disk Commander (Pre-Errata)
  db.close();

  if (Number(makyuraStatsResult.changes) !== 1) {
    throw new Error("Expected to update Makyura the Destructor (Pre-Errata) once");
  }
  if (Number(witchTextResult.changes) !== 1) {
    throw new Error("Expected to update Witch of the Black Forest (Pre-Errata) text once");
  }
  if (Number(sanganTextResult.changes) !== 1) {
    throw new Error("Expected to update Sangan (Pre-Errata) text once");
  }
  if (Number(mindMasterTextResult.changes) !== 1) {
    throw new Error("Expected to update Mind Master (Pre-Errata) text once");
  }
  if (Number(diskCommanderTextResult.changes) !== 1) {
    throw new Error(
      "Expected to update Destiny HERO - Disk Commander (Pre-Errata) text once",
    );
  }
};
