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
  const imperialOrderTextResult = db
    .prepare("UPDATE texts SET desc = ?, str1 = ? WHERE id = ?")
    .run(
      "Negate all Spell effects on the field. Once per turn, during your End Phase, you can pay 1700 LP or destroy this card.",
      "Pay 1700 LP?",
      511002996,
    ); // Imperial Order (Pre-Errata)
  const chaosEmperorDragonTextResult = db
    .prepare("UPDATE texts SET desc = ?, str2 = ? WHERE id = ?")
    .run(
      "Cannot be Normal Summoned/Set. Must first be Special Summoned (from your hand) by banishing 2 LIGHT and 2 DARK monsters from your GY. If this card is Special Summoned from your hand: You can pay half your LP; destroy all other cards on the field, then both players gain 300 LP for each card destroyed by this effect.",
      "Destroy other cards and gain LP",
      511000819,
    ); // Chaos Emperor Dragon - Envoy of the End (Pre-Errata)
  const darkMagicianOfChaosTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'When this card is Normal or Special Summoned: You can target 1 Spell in your Graveyard; add it to your hand. You can only use this effect of "Dark Magician of Chaos" once per turn. Banish any monster this card destroys by battle, instead of sending it to the Graveyard. If this face-up card would leave the field, banish it instead.',
      511001039,
    ); // Dark Magician of Chaos (Pre-Errata)
  const darkStrikeFighterTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      '1 Tuner + 1+ non-Tuner monsters\r\nYou can Tribute 1 monster; inflict damage to your opponent equal to the Tributed monster\'s Level on the field x 200. You can only use this effect of "Dark Strike Fighter" once per turn.',
      511000229,
    ); // Dark Strike Fighter (Pre-Errata)
  const sinisterSerpentTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'During your Standby Phase, if there is a "Sinister Serpent" in your Graveyard: You can add this card from your Graveyard to your hand. You can only use this effect of "Sinister Serpent" once per turn.',
      511000818,
    ); // Sinister Serpent (Pre-Errata)
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
  if (Number(imperialOrderTextResult.changes) !== 1) {
    throw new Error("Expected to update Imperial Order (Pre-Errata) text once");
  }
  if (Number(chaosEmperorDragonTextResult.changes) !== 1) {
    throw new Error(
      "Expected to update Chaos Emperor Dragon - Envoy of the End (Pre-Errata) text once",
    );
  }
  if (Number(darkMagicianOfChaosTextResult.changes) !== 1) {
    throw new Error("Expected to update Dark Magician of Chaos (Pre-Errata) text once");
  }
  if (Number(darkStrikeFighterTextResult.changes) !== 1) {
    throw new Error("Expected to update Dark Strike Fighter (Pre-Errata) text once");
  }
  if (Number(sinisterSerpentTextResult.changes) !== 1) {
    throw new Error("Expected to update Sinister Serpent (Pre-Errata) text once");
  }
};
