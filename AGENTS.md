# Project Context

This project is a fork-style customization of ProjectIgnis, started from the
distributable / portable release rather than a git fork of the upstream repo.

The current goal is to build a pre-XYZ era Yu-Gi-Oh! experience through data
customization only:

- edit the forbidden / limited list
- limit the playable card pool
- apply custom card erratas

In ProjectIgnis / EDOPro, `.lflist.conf` files hold the combined forbidden /
limited list data and the allowed card-pool data for a format.

# Development Workflow

The custom format is built from project-owned inputs under `Redux/`:

- Use [Node.js LTS 22](https://nodejs.org/) for the Redux build scripts.
- `Redux/vanilla/` contains baseline source snapshots. Treat these as immutable
  after they are intentionally added.
- `Redux/scripts/` contains the readable build / transformation scripts. Future
  card errata, stat edits, text edits, and card-pool changes should be expressed
  here so Git history explains the project changes.
- `Redux/modded/` is generated output. EDOPro reads this folder through
  `config/configs.json`. Do not hand-edit generated files here; update the
  scripts and rebuild instead.

Run the build from the repository root:

```powershell
node .\Redux\scripts\build.js
```

The build deletes and recreates `Redux/modded/`, copies baseline databases and
the LF list from `Redux/vanilla/`, and then applies transformations declared in
`Redux/scripts/`. The EDOPro local repo entry in `config/configs.json` reads
`./Redux/modded` for `.cdb` data, scripts, and the `.lflist.conf`; it must stay
local-only with updates disabled.

For new Redux changes:

1. Do not edit files in `Redux/modded/` by hand.
2. Do not edit the baseline in `Redux/vanilla/` when making a format change.
3. Express LF list, database, and future effect-script changes in
   `Redux/scripts/`, then rebuild.
4. Update `README.md` whenever a card's stats or other card properties change,
   or its effect / English card text is errataed. Limit-only changes do not
   require a README entry.
5. Verify generated output after the build, and verify behavior in EDOPro when
   runtime load order or effect behavior matters.

In the `README.md` errata table, describe changes in short and simplistic summary phrases (easy language)
consistent with the existing entries rather than full card-text wording.

Legacy / pre-errata cards may come from supplemental baseline databases such as
`cards-unofficial.cdb`, not only `cards.cdb`.

`Redux/vanilla/2011-Redux.lflist.conf` intentionally accounts for cards that
have distinct pre-errata and post-errata passcodes. Treat the card IDs selected
in that list as authoritative for the Redux format; do not replace them with
modern-version IDs merely because the modern record appears in `cards.cdb`.
For example, the list intentionally uses the pre-errata Makyura the Destructor
passcode (`21593987`) instead of its post-errata passcode (`21593977`).

Do not change the ProjectIgnis client, engine, or software behavior unless the
user explicitly asks for that. Treat this as a card-pool and card-data project,
not a client development project.

# User Context

The user knows the basics of JS, TS, Node.js, HTML, SQL, Git, and related tools,
but may not have domain-specific context for Android apps, game clients, mods,
or C/C++ code. Handle domain-specific implementation details proactively and
explain them when they matter.
