const fs = require("fs");
const path = require("path");

const { copyFileInRedux } = require("./utils");

const limitChanges = new Map([
  ["511003012", 1], // Witch of the Black Forest (Pre-Errata)
  ["69015963", 1], // Cyber-Stein
  ["3078576", 1], // Yata-Garasu
  ["34206604", 1], // Magical Scientist
  ["511003019", 3], // Mind Master (Pre-Errata)
  ["33184167", 3], // Tribe-Infecting Virus
  ["34853266", 1], // Tsukuyomi
  ["511002992", 1], // Rescue Cat
  ["31560081", 2], // Magician of Faith
  ["511000818", 1], // Sinister Serpent
  ["20663556", 1], // Substitoad
  ["93369354", 3], // Fishborg Blaster
  ["511000229", 1], // Dark Strike Fighter
  ["511002994", 1], // Goyo Guardian
  ["42703248", 1], // Giant Trunade
  ["46411259", 2], // Metamorphosis
  ["29762407", 3], // Temple of the Kings
  ["69243953", 2], // Butterfly Dagger - Elma
  ["70828912", 1], // Premature Burial
  ["35316708", 1], // Time Seal
  ["83555666", 1], // Ring of Destruction
  ["423705", 0], // Gearfried the Iron Knight
  ["21593987", 3], // Makyura the Destructor (Pre-Errata)
  ["511001039", 1], // Dark Magician of Chaos
  ["35027493", 1], // Deck Devastation Virus
  ["54974237", 1], // Eradicator Epidemic Virus
  ["5318639", 1], // Mystical Space Typhoon
  ["88307361", 1], // Superancient Deepsea King Coelacanth
  ["98777036", 3], // Tragoedia
  ["423585", 3], // Summoner Monk
  ["79106360", 1], // Morphing Jar #2
  ["85087012", 3], // Card Trooper
  ["70583996", 3], // Dewloren, Tiger King of the Ice Barrier
  ["45305419", 1], // Symbol of Heritage
  ["45809008", 3], // Destiny Draw
  ["72302403", 1], // Swords of Revealing Light
  ["72405967", 1], // Royal Tribute
  ["98494543", 3], // Magical Stone Excavation
  ["91623717", 1], // Chain Strike
  ["29843091", 1], // Ojama Trio
  ["62279055", 1], // Magic Cylinder
  ["511003026", 1], // Mind Crush
  ["95308449", 0], // Final Countdown
  ["33396948", 0], // Exodia the Forbidden One
  ["7902349", 3], // Left Arm of the Forbidden One
  ["44519536", 3], // Left Leg of the Forbidden One
  ["70903634", 3], // Right Arm of the Forbidden One
  ["8124921", 3], // Right Leg of the Forbidden One
  ["92826944", 2], // Mezuki
  ["41470137", 2], // Gladiator Beast Bestiari
  ["96216229", 1], // Gladiator Beast War Chariot
  ["28297833", 2], // Necroface
  ["14943837", 3], // Debris Dragon
  ["73580471", 1], // Black Rose Dragon
  ["95503687", 2], // Lumina, Lightsworn Summoner
  ["511002631", 2], // Sangan
  ["48686504", 2], // Lonefire Blossom
  ["15341821", 2], // Dandylion
  ["16226786", 2], // Night Assailant
  ["33420078", 2], // Plaguespreader Zombie
  ["50091196", 3], // Formula Synchron
  ["1475311", 3], // Allure of Darkness
  ["2295440", 2], // One for One
  ["32807846", 2], // Reinforcement of the Army
  ["213326", 1], // E - Emergency Call
  ["43040603", 3], // Monster Gate
  ["58577036", 2], // Reasoning
  ["67169062", 2], // Pot of Avarice
  ["81439173", 2], // Foolish Burial
  ["46052429", 2], // Advanced Ritual Art
  ["14087893", 2], // Book of Moon
  ["48976825", 2], // Burial from a Different Dimension
  ["67723438", 2], // Emergency Teleport
  ["73915051", 2], // Scapegoat
  ["3136426", 0], // Level Limit - Area B
  ["27174286", 2], // Return from the Different Dimension
  ["46652477", 3], // The Transmigration Prophecy
  ["64697231", 0], // Trap Dustshoot
  ["17078030", 0], // Wall of Revealing Light
  ["84749824", 1], // Solemn Warning
]);

module.exports = function buildLflist({ reduxRoot }) {
  const output = path.join(reduxRoot, "modded", "2011-Redux.lflist.conf");

  copyFileInRedux({
    reduxRoot,
    source: path.join(reduxRoot, "vanilla", "2011-Redux.lflist.conf"),
    output,
  });

  const updatedPasscodes = new Map();
  let lflist = fs.readFileSync(output, "utf8");

  lflist = lflist.replace(/^(\d+) ([0-3])(?= --)/gm, (entry, passcode) => {
    if (!limitChanges.has(passcode)) {
      return entry;
    }

    updatedPasscodes.set(passcode, (updatedPasscodes.get(passcode) ?? 0) + 1);
    return `${passcode} ${limitChanges.get(passcode)}`;
  });

  const invalidPasscodes = [...limitChanges.keys()].filter(
    (passcode) => updatedPasscodes.get(passcode) !== 1,
  );
  if (invalidPasscodes.length > 0) {
    throw new Error(
      `Expected each LF-list card exactly once: ${invalidPasscodes.join(", ")}`,
    );
  }

  fs.writeFileSync(output, lflist);
};
