# Remote Web Task Recipes

Save landmarks for repeated browser tasks.

Remote Web Task Recipes is for people using screen readers or low vision in
hard-to-use browser software. A user or support worker can save visual
landmarks and spoken task steps. The guide replays one step at a time.

Try the isolated sample first: <https://remote-web-task-recipes.sociobot.in/demo/>.

## What the words mean

- A **notebook** holds landmarks and task steps for one website.
- A **landmark** is a saved visible location.
- A **task step** is one instruction in a guide.

## Install the extension

1. Download and extract `remote-web-task-recipes.zip`.
2. Open `chrome://extensions` in Chrome or Chromium.
3. Turn on Developer mode.
4. Choose **Load unpacked** and select the extracted folder.
5. Pin the extension. `Alt+Shift+R` opens its quick launcher.

The package is unsigned until it is published in a browser store.

## Use it

1. Create a notebook for the website you need to revisit.
2. Name a landmark and choose **Place on app**.
3. Point and click, or use Arrow keys and Enter.
4. Press Escape to cancel placement.
5. Add task steps and connect a step to a landmark if useful.
6. Start the guide from the editor or quick launcher.
7. Use Previous, Next step, or Speak step. Escape closes the guide.
8. Export an encrypted backup from **Backup & appearance**.

Landmarks use screen coordinates. Recheck them after layout, scale, or app
changes.

## Privacy and limits

The extension does not automate the website. It does not read passwords or
page text. A screenshot appears only during landmark placement. It is not kept
in a notebook. Your browser may offer a local text suggestion. Manual placement
is always available.

Notebook data stays in extension local storage. Notebooks match an exact
website origin. Encrypted backups need the passphrase used to create them.
There are no accounts, payment flows, analytics, advertising, or remote APIs.

Every testable statement is listed in [.factory/claims.json](.factory/claims.json).
Read the [privacy policy](site/privacy/index.html) and [terms](site/terms/index.html).

## Develop, test, and build

Requires Node.js 20+ and npm.

```bash
npm ci
npm run check
npm test
npm run test:site
npm run test:browser
npm run build
npm run test:package
```

`npm run build:site` writes the static site and extension ZIP to `dist/site/`.
`npm run build:extension` writes the loadable MV3 extension to `.output/chrome-mv3/`.
`npm run test:claims -- --grep @claim:<id>` runs one declared claim test.

## Project records

- [Opportunity brief](.factory/brief.json)
- [Visual system and artwork provenance](.factory/design.md)
- [Demo sandbox](.factory/demo.md)
- [Repair handoff](.factory/handoff.md)

## License

MIT. See [LICENSE](LICENSE).
