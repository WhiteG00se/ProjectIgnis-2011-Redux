# ProjectIgnis-2011-Redux

This is a fork of Project Ignis: EDOPro.<br>
The banned list and erratas are custom for a format centered around the formats before XYZs were introduced.<br>
In TCG, the first XYZ monsters were released on 08.07.2011, so the cutoff is 24.06.2011.<br>
Banned cards were nerfed to be unbanned, the only banned cards are alternate win conditions (Exodia, Final Countdown, Burn).<br>
[Googlesheet with Card DB and Banlist](https://docs.google.com/spreadsheets/d/1NCD4u_KRdl6T0fOKFnFGOmMbWwV9U_HEFP6O4gS5jf8/edit?gid=1008737686#gid=1008737686)

## Development workflow

Custom format data is built from immutable baseline files rather than edited
directly in EDOPro's active files. This makes card-pool and errata changes
reviewable in Git through the build scripts that apply them.

Development requires [Node.js LTS 22](https://nodejs.org/).

The Redux folders have three roles:

- `Redux\vanilla`: original baseline inputs, including the list and card
  databases required by selected pre-errata cards. Do not edit these after they
  have been captured.
- `Redux\scripts`: readable build and transformation scripts. Implement format
  changes here.
- `Redux\modded`: generated EDOPro input files. Do not edit these directly.

Run the build from the repository root with Node.js:

```powershell
node .\Redux\scripts\build.js
```

The build recreates `Redux\modded`, copies the vanilla inputs, and applies any
declared transformations. EDOPro reads the generated folder through
`config\configs.json`; the local `2011 Redux` entry is readable but not
auto-updated.

The LF list is both the forbidden / limited list and the format card pool.
Its selected passcodes are intentional, including pre-errata card versions.
Project guidance and implementation rules can be found in `AGENTS.md`.

### Prerequisites for WindBot Ignite (AI):

- Windows: install .NET Framework 4 if you don't have it. This ships with Windows 10.
- Linux: install the mono-complete package https://www.mono-project.com/download/stable/#download-lin
- macOS: install Mono with the .pkg https://www.mono-project.com/download/stable/#download-mac

## Keyboard and mouse shortcuts

### General:

- ESC: Minimizes the window if not typing
- F9: Toggle topdown field view
- F10: Mac and Windows: Save the current window position (shift+F10 to restore it)
- F11: Toggles fullscreen
- F12: Captures a screenshot
- CTRL+O: Opens the additional settings window
- R: Reloads fonts if not typing
- CTRL+R: Reloads current skin
- CTRL+1: Switch to card info tab
- CTRL+2: Switch to duel log tab
- CTRL+3: Switch to chat log tab
- CTRL+4: Switch to settings tab
- CTRL+5: Switch to repositories tab
- Drag and drop support for files and text:
  - drop an `ydk` file in the main menu or the deck edit area to load that deck
  - drop a card passcode or card name in the deck edit area to add that card to the deck
  - drop a `ydke://` URL in the deck edit area to load the deck specified by that URL
  - drop a `yrpX` file in the main menu or the replay selection menu to load that replay, if valid
  - drop a Lua file in the main menu or the puzzle selection menu to load that puzzle, if valid
  - drop text in a text box to insert text
  - drop a `.pem`, `.cer`, `.crt` certificate bundle file to make the client use that for ssl verification (if you're getting ssl certificate is invalid)

### Deck editor:

- Right Mouse Button: Adds/removes a card from the deck
- Middle Mouse Button: Adds another copy of a card to the deck or side deck
- Shift+Right Mouse Button or Hold Left Mouse Button then click Right Mouse Button: Adds a card to the side deck
- With the exception of Shift+Right Mouse Button, holding Shift will ignore ALL deck building rules

While not typing:

- CTRL+C: Copies a `ydke://` URL of the deck list for sharing
- CTRL+SHIFT+C: Copies a plain text deck list for sharing
- CTRL+V: Imports a `ydke://` URL decklist from the clipboard

### Duel:

- Hold A or Hold Left Mouse Button: Lets the system stop at every timing.
- Hold S or Hold Right Mouse Button: Lets the system skip every timing.
- Hold D: Lets the system stop at available timing.
- F1 to F4: Shows the cards in your GY, banished, Extra Deck, Xyz Materials respectively.
- F5 to F8: Shows the cards in your opponent's GY, banished, Extra Deck, Xyz Materials respectively.
- Double click (or tap) on a card pile: Shows the cards in such pile.
- Use the Tab key to navigate between options in dialogue boxes, and press Space to select an option.

### macOS:

Note that system hotkeys may intercept some of the above keyboard shortcuts.
The following app shortcuts are also available in the app and dock menus:

- Cmd+N opens a new instance with audio muted
- Cmd+Q quits the game
- Ctrl+Cmd+F toggles fullscreen

## Deck editor search functions

- `string`:
  returns all cards that have `string` in their name OR in the card text.
  Example: `Hero`
- `@string`
  returns all cards that belong to the `string` archetype. If no string is provided, returns all cards that are part of any archetype.
  Example: `@Hero`
- `$string`
  returns all cards that have `string` in their name only, which ignores the card text.
  Example: `$Heroic`
- `!!string`:
  negative lookup (NOT)
- `string1*string2`
  replaces any character in any amount. Example: `Eyes*Dragon` will return cards Blue-Eyes White Dragon, Red-Eyes B. Dragon, Galaxy-Eyes Photon Dragon, etc.
- `string1||string2`
  returns all cards that have `string1` OR `string2` in their name/text. Any of the strings can have any of the modifiers above.
  Example: `Trickstar||Bounzer`
- `string1`&&`string2`
  returns all cards that match `string1` and `string2`. Any of the strings can have any of the modifiers above.

These can be combined. Example: `@blue-eyes||$eyes of blue` returns all cards that belong to either the `Blue-Eyes` archetype or have `Eyes of Blue` in their names.

The ATK, DEF, Level/Rank, and Scale textboxes support searching for `?`. You can also prefix the search with comparison modifiers <, <=, >=, >, and =.
