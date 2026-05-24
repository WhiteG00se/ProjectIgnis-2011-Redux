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

# Redux Workflow

Custom project files live under `Redux/`:

- `Redux/vanilla/` contains baseline source snapshots. Treat these as immutable
  after they are intentionally added.
- `Redux/scripts/` contains the readable build / transformation scripts. Future
  card errata, stat edits, text edits, and card-pool changes should be expressed
  here so Git history explains the project changes.
- `Redux/modded/` is generated output. EDOPro reads this folder through
  `config/configs.json`. Do not hand-edit generated files here; update the
  scripts and rebuild instead.

The build copies baseline databases and the LF list from `Redux/vanilla/` into
`Redux/modded/`, then applies transformations declared in `Redux/scripts/`.
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
