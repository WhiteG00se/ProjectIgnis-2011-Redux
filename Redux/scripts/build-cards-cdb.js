const { DatabaseSync } = require("node:sqlite");
const path = require("path");

const { copyFileInRedux } = require("./utils");

module.exports = function buildCardsDb({ reduxRoot }) {
  const output = path.join(reduxRoot, "modded", "cards.cdb");

  copyFileInRedux({
    reduxRoot,
    source: path.join(reduxRoot, "vanilla", "cards.cdb"),
    output,
  });

  const db = new DatabaseSync(output);
  const lastWillTextResult = db
    .prepare("UPDATE texts SET desc = ?, str2 = ? WHERE id = ?")
    .run(
      'If a monster on your side of the field was sent to your Graveyard this turn, you can Special Summon 1 monster with an ATK of 1500 points or less from your Deck once during this turn. Then shuffle your Deck. You can only activate 1 "Last Will" per turn. You cannot conduct your Battle Phase the turn you activate this card.',
      "Cannot conduct your Battle Phase this turn",
      85602018,
    );
  const changeOfHeartTextResult = db
    .prepare("UPDATE texts SET desc = ?, str1 = ? WHERE id = ?")
    .run(
      "Discard 1 card, then target 1 monster your opponent controls; take control of it until the End Phase. You cannot conduct your Battle Phase the turn you activate this card.",
      "Cannot conduct your Battle Phase this turn",
      4031928,
    );
  const dimensionFusionTextResult = db
    .prepare("UPDATE texts SET desc = ?, str1 = ? WHERE id = ?")
    .run(
      'Pay half your LP. Both players Special Summon as many of their banished monsters as possible. You can only activate 1 "Dimension Fusion" per turn. You cannot conduct your Battle Phase the turn you activate this card.',
      "Cannot conduct your Battle Phase this turn",
      23557835,
    );
  const cyberSteinTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      '(This card is not treated as a "Cyber" card.)\nYou can only use this effect of "Cyber-Stein" once per turn. You can pay half your LP; Special Summon 1 Fusion Monster from your Extra Deck in Defense Position.',
      69015963,
    );
  const yataGarasuTextResult = db
    .prepare("UPDATE texts SET desc = ?, str1 = ?, str2 = ? WHERE id = ?")
    .run(
      "Cannot be Special Summoned. During the End Phase of the turn this card was Normal Summoned or flipped face-up: Return it to the hand. If this card inflicts battle damage to your opponent: If they have 2 or more cards in their hand during the Draw Phase of their next turn, skip that Draw Phase.",
      "Skip your opponent's next Draw Phase if they have 2 or more cards in their hand",
      'Affected by "Yata-Garasu": will skip next Draw Phase with 2 or more cards in hand',
      3078576,
    );
  const magicalScientistTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      'You can only use this effect of "Magical Scientist" once per turn. Special Summon 1 Level 6 or lower Fusion Monster from your Extra Deck in face-up Attack or Defense Position. That Fusion Monster cannot attack your opponent\'s Life Points directly, and is returned to your Extra Deck at the end of the turn.',
      34206604,
    );
  const painfulChoiceTextResult = db
    .prepare("UPDATE texts SET desc = ?, str1 = ? WHERE id = ?")
    .run(
      'Pay half your LP; select 2 cards from your Deck and show them to your opponent. Your opponent selects 1 card among them. Add that card to your hand and discard the remaining card to the Graveyard. You can only activate 1 "Painful Choice" per turn.',
      "Select 2 cards from your Deck",
      74191942,
    );
  const blackLusterSoldierTextResult = db
    .prepare("UPDATE texts SET desc = ? WHERE id = ?")
    .run(
      "Cannot be Normal Summoned/Set. Must first be Special Summoned (from your hand) by banishing 1 LIGHT and 1 DARK monster from your GY. Once per turn, you can activate 1 of these effects.\r\n● Target 1 face-up monster on the field; banish it. This card cannot attack the turn this effect is activated.\r\n● If this attacking card destroys an opponent's monster by battle: It can make a second attack in a row, but it cannot inflict battle damage with that attack.",
      72989439,
    );
  db.close();

  if (Number(lastWillTextResult.changes) !== 1) {
    throw new Error("Expected to update Last Will text once");
  }
  if (Number(changeOfHeartTextResult.changes) !== 1) {
    throw new Error("Expected to update Change of Heart text once");
  }
  if (Number(dimensionFusionTextResult.changes) !== 1) {
    throw new Error("Expected to update Dimension Fusion text once");
  }
  if (Number(cyberSteinTextResult.changes) !== 1) {
    throw new Error("Expected to update Cyber-Stein text once");
  }
  if (Number(yataGarasuTextResult.changes) !== 1) {
    throw new Error("Expected to update Yata-Garasu text once");
  }
  if (Number(magicalScientistTextResult.changes) !== 1) {
    throw new Error("Expected to update Magical Scientist text once");
  }
  if (Number(painfulChoiceTextResult.changes) !== 1) {
    throw new Error("Expected to update Painful Choice text once");
  }
  if (Number(blackLusterSoldierTextResult.changes) !== 1) {
    throw new Error(
      "Expected to update Black Luster Soldier - Envoy of the Beginning text once",
    );
  }
};
