# ProjectIgnis-2011-Redux

This is a fork of Project Ignis: EDOPro.<br>
The banned list and erratas are custom for a format centered around the formats before XYZs were introduced.<br>
In TCG, the first XYZ monsters were released on 08.07.2011, so the cutoff is 24.06.2011.<br>
Banned cards were nerfed to be unbanned, the only banned cards are alternate win conditions (Exodia, Final Countdown, Burn).<br>
[Googlesheet with Card DB and Banlist](https://docs.google.com/spreadsheets/d/1NCD4u_KRdl6T0fOKFnFGOmMbWwV9U_HEFP6O4gS5jf8/edit?gid=1008737686#gid=1008737686)

## Errata

| Cardname                  | Limit  | Changes                                                                                           |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| Change of Heart           | 0 => 1 | Discard 1 card as cost; cannot conduct the Battle Phase during the turn it is activated           |
| Chaos Emperor Dragon - Envoy of the End | 0 => 1 | Summon cost is 2 LIGHT and 2 DARK monsters; effect triggers only when Special Summoned from the hand, costs half LP, destroys other cards on the field, and makes both players gain 300 LP per destroyed card |
| Cyber-Stein               | 0 => 1 | Once per turn; pay half LP instead of 5000 LP; summoned Fusion Monster enters in Defense Position |
| Destiny HERO - Disk Commander | 0 => 3 | Once per turn; draws 1 card instead of 2; triggers when Special Summoned from any location     |
| Dimension Fusion          | 0 => 1 | Once per turn; pay half LP instead of 2000 LP; cannot conduct the Battle Phase during the turn it is activated |
| Imperial Order            | 0 => 1 | Maintenance occurs during your End Phase instead of your Standby Phase; optionally pay 1700 LP instead of 700 LP |
| Last Will                 | 0 => 1 | Once per turn; cannot conduct the Battle Phase during the turn it is activated                         |
| Magical Scientist         | 0 => 1 | Once per turn; no LP cost                                                                         |
| Makyura the Destructor    | 0 => 3 | Buffed ATK/DEF to 1900/1900 (from 1600/1200)                                                      |
| Mind Master               | 0 => 3 | Once per turn                                                                                     |
| Painful Choice            | 0 => 1 | Once per turn; pay half LP; select 2 cards from the Deck instead of 5                            |
| Yata-Garasu               | 0 => 1 | Skips the opponent's next Draw Phase only if they have 2 or more cards in hand during it          |
| Witch of the Black Forest | 0 => 1 | Once per turn; searches monsters with 600 or less DEF instead of 1500 or less DEF                 |
| Sangan                    | 1 => 2 | Once per turn                                                                                     |

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

# Project Ignis: EDOPro Original README

All assets for the game, except card images. See LICENSE and COPYING in each folder for proper credits, copyright, and rules for redistribution.
On Windows, please do not put your game install in Program Files, Downloads, or any other location that might be read-only or require admin permissions.
On Linux, after moving the game install to your preferred location, you can run `./install.sh` from a terminal to install desktop files for the current user.

<details>
<summary>System requirements</summary>

Supported platforms:

- Windows XP Service Pack 3 or later, 32-bit or 64-bit
- macOS 10.9 or later
- 64-bit/AArch64 GNU/Linux with glibc 2.27+ (e.g. Debian 10+, Ubuntu 18.04+, Fedora, CentOS 8+, rolling release distros like Arch)

1 GB free disk space recommended for asset updates and images.

1 GB free RAM recommended, though the game is not expected to exceed 300 MB of memory during normal usage.

### Prerequisites for WindBot Ignite (AI):

- Windows: install .NET Framework 4 if you don't have it. This ships with Windows 10.
- Linux: install the mono-complete package https://www.mono-project.com/download/stable/#download-lin
- macOS: install Mono with the .pkg https://www.mono-project.com/download/stable/#download-mac

</details>

<details>
<summary>Keyboard and mouse shortcuts</summary>

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

</details>

<details>
<summary>Deck editor search functions</summary>

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

</details>

<details>
<summary>Test hand</summary>

A Hand Test mode is accessible from the deck editor, with quick restart.
The duel will **never** end normally in this game mode (e.g. running out of LP, decking out)

- Notice that this mode was not made to control the opponent. Dueling vs yourself in LAN Mode would be a better option for that.

</details>

<details>
<summary>Discord Rich Presence</summary>

Works with the desktop version of Discord. In your Discord settings, turn on Game Activity first.

Your status on Discord will update to be playing a game, including elapsed time.
Activities displayed in Rich Presence:

- Dueling
- In menu
- Playing a puzzle
- Watching a replay
- Editing a deck

### Game invites

Host a room on a server (LAN does not work). In the appropriate channel or private message, the upload (+) icon should change to have an additional green play button.
Clicking on it will send out a game invite to your room with your message of choice. If the room is locked, the password will be skipped for invitees.
Users can accept the invite while EDOPro is closed if they've started it once before; the game should be launched automatically. Note that Discord is rather fickle and changes this behaviour on us very frequently, so if the game fails to automatically launch, try starting the game.

</details>

<details>
<summary>Customization</summary>

### Default textures:

See README in `textures`.

### Skins:

Editable by adding subfolders to **skin**. For each folder, provide a unique `skin.xml` file, with the changes you want.
You can switch skins in the settings (CTRL+O). For instructions on the supported fields and what they change, see README in `skin`.

### Audio:

See README in `sound`. There are many new features, including summon chants!
Music and sound volume controls are also separated.

### MSAA (antialiasing)

Makes sharp/pixelated edges softer, but requires more performance.
2D elements might look blurred at higher levels. Rendering results are hardware- and device-dependent.
The program will automatically try smaller MSAA values if the driver does not support the specified MSAA level.

</details>

<details>
<summary>Advanced configuration</summary>

### system.conf

`config/system.conf` handles most of the configurations available in the game. It is overwritten when the game is closed normally.
Only options not directly configurable in-game are listed here.
Configurations listed as "boolean" accept either 0 for 'disabled' or 1 for 'enabled'.

| Name          | Purpose                                                                                                                                                                                         | Example                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| driver_type   | graphic driver used for rendering. Valid values are: opengl, d3d9, d3d9on12, ogles1, ogles2, default. The availability of those values is listed in the table below.                            |                                       |
| useWayland    | Linux only. 1 = use experimental wayland device; 0 = use x11 device.                                                                                                                            |                                       |
| textfont      | path to the font used for texts and its size                                                                                                                                                    | fonts/NotoSansJP-Regular.otf 12       |
| numfont       | path to the font used for numbers                                                                                                                                                               | fonts/NotoSansJP-Regular.otf          |
| fallbackFonts | path to the fonts to be used as fallback for missing characters (each font and its **must** be contained in double quotes `"`, the game ships with a `bundled` font that will always be loaded) | "fonts/fallback1.otf 15" "bundled 12" |

If a character cannot be found in the supplied font, it will not be displayed. The shipped font supports all characters that appear on Yu-Gi-Oh! cards in Latin alphabets and Japanese.

### supported values for driver_type based on the system

|               |            opengl             | d3d9 |            d3d9on12            |               ogles1                |              ogles2              | default |
| ------------- | :---------------------------: | :--: | :----------------------------: | :---------------------------------: | :------------------------------: | :-----: |
| Windows       |               X               |  X   | X (If supported by the driver) |   X (If supported by the driver)    |  X (If supported by the driver)  |  d3d9   |
| Linux Wayland | X (Only if LibGLx is present) |      |                                | X (only if libGLESv1_CM is present) |                X                 | ogles2  |
| Linux X11     |               X               |      |                                | X (only if libGLESv1_CM is present) | X (only if libGLESv2 is present) | opengl  |
| MacOS         |               X               |      |                                |                                     |                                  | opengl  |
| Android       |                               |      |                                |                  X                  |                X                 | ogles2  |

### configs.json

`config/configs.json` handles the servers the client is connected to, which include repositories for updates, servers for duels and pictures.

#### repos (array)

- url: required, the complete url of the repository to check for updates.
- repo_path: optional, the subdirectory in the client's directory where the contents will be saved. If not provided, the folder will be created in the expansions folder and will have the repository's name.
- has_core: boolean, optional (defaults to false).
- core_path: optional, used if has_core is true.
- data_path: optional, the folder where the databases and the strings will be loaded from in the repository. If not provided, it will load from the main folder of the repository.
- script_path: optional, the folder where the scripts will be loaded from in the repository. If not provided, it will load from the script folder of the repository. If an `init.lua` script is present in this folder, it will automatically loaded after the main utility scripts.
- pics_path: optional, the folder where the pics will be loaded from in the repository. If not provided, it will load from the pics folder of the repository.
- lflist_path: optional, the path for lflists, if the repository contains any.
- should_update: boolean, optional (defaults to true), if the client will download the contents of the repository. If the repository is missing, it will still be downloaded only for the first time. If not provided, it will be set to true.
- should_read: boolean, optional (defaults to true), if set to false the game will ignore that repository. If not provided, it will be set to true.
- is_language: boolean, optional (defaults to false), if set to true, declares that the current repository is a languages repository, which can be used to enable translations
- language: optional, a string with the name of the language, if is_language is used.
- not_git_repo: boolean, optional (defaults to false), if set to true, the entry will be considered as a local folder, in which case the url parameter is not needed.

#### urls (array)

- url: A URL format string for direct card image download, or "default". Should contain `{}` to be replaced by the client with the card's passcode.
- type: pic/field/cover

#### servers (array)

- name: Display name
- address: URL (domain or IP works) for connecting to rooms nad hosting
- duelport: port for the above
- roomaddress: URL for retrieving the room list via the REST API
- roomlistprotocol: url protocol that will be used for roomaddress. Supported protocols are `http` (default if not provided) and `https`
- roomlistport: port for the above

#### posixPathExtension

Used on macOS and Linux as additional search paths for Mono, required to run WindBot Ignite. Generally you should not need to change this.

</details>

## Copyright notice and license

Copyright (C) 2020 Project Ignis contributors. See version history and author credit line for each file.

```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
