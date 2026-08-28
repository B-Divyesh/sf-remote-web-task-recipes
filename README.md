# Remote Web Task Recipes

Save landmarks for repeated browser tasks.

Remote Web Task Recipes is for screen-reader and low-vision users in hard-to-use browser software.
A user or support worker saves visual landmarks and spoken task steps.
The guide presents one step at a time.

[Try the isolated sample](https://remote-web-task-recipes.sociobot.in/demo/) before installing anything.

## What the words mean

- A **notebook** holds landmarks and task steps for one website.
- A **landmark** is a saved visible location.
- A **task step** is one instruction in a guide.

## Install the extension

1. [Download the extension](https://remote-web-task-recipes.sociobot.in/downloads/remote-web-task-recipes.zip) and extract the ZIP.
2. Open `chrome://extensions` in Chrome or Chromium.
3. Turn on **Developer mode**.
4. Choose **Load unpacked** and select the extracted folder.
5. Pin the extension and open it from the browser toolbar.

The download is a Chrome extension (Manifest V3) for manual installation.

## Use Remote Web Task Recipes

1. Create a notebook for the website you need to revisit.
2. Name a landmark and choose **Place on app**.
3. Point and click, or use Arrow keys and Enter.
4. Press Escape to cancel placement.
5. Add task steps and connect a step to a landmark when useful.
6. Start the guide from the editor or extension menu.
7. Use Previous, Next step, or Speak step. Escape closes the guide.
8. Export an encrypted backup from **Backup & appearance**.

Landmarks stay at saved screen positions.
Recheck them after the app, display scale, or window layout changes.

## Privacy and limits

The extension does not operate the website.
It does not read passwords or page text.
A screenshot exists only while landmark placement is open.
The screenshot is not kept in extension storage.

Your browser may offer local text suggestions during placement.
Manual placement remains available with or without suggestions.
Notebook data uses storage inside the browser extension.
Each notebook works only on the exact website where you created it.

Backups hide notebook text and require the passphrase used to create them.
There are no accounts, payment flows, analytics, advertising, or remote APIs.
Every testable statement is listed in [.factory/claims.json](.factory/claims.json).

Read the [privacy policy](site/privacy/index.html) and [terms](site/terms/index.html).

## Develop, test, and build

Use Node.js 20 or newer with npm.

```bash
npm ci
npm run check
npm test
npm run test:site
npm run test:browser
npm run build
npm run test:package
```

`npm run build:site` writes the site and extension ZIP to `dist/site/`.
`npm run build:extension` writes the Chrome extension to `.output/chrome-mv3/`.
`npm run test:claims -- --grep @claim:<id>` runs one declared site claim.
Each extension claim records its own browser-test command in the claims file.

## Project records

- [Opportunity brief](.factory/brief.json)
- [Visual system and artwork provenance](.factory/design.md)
- [Demo sandbox](.factory/demo.md)
- [Repair handoff](.factory/handoff.md)

## License

MIT. See [LICENSE](LICENSE).
