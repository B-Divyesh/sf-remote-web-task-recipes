# Remote Web Task Recipes

Remote Web Task Recipes is a private accessibility field notebook for recurring
work in browser-delivered remote or legacy software. A user or support worker can
mark visual coordinates, attach concise spoken instructions, and replay one step
at a time over the app. It does not automate clicks, inspect credentials, or
claim to add accessibility semantics to the underlying software.

Live site: <https://remote-web-task-recipes.sociobot.in>

## What v1 includes

- Local notebooks scoped to a web app's origin.
- Deliberate, user-triggered visible-tab capture for coordinate placement.
- Pointer placement plus Arrow/Shift+Arrow keyboard positioning.
- Browser-local OCR hints through `TextDetector` where the browser provides it;
  manual visual placement remains available everywhere else.
- Task steps linked to landmarks, with visible and spoken guide playback.
- AES-256-GCM encrypted export/import with a passphrase-derived key.
- A quick-launch popup and a responsive, keyboard-operable notebook editor.
- The complete local accessibility workflow, three notebook covers, and
  encrypted data export are free. There is no account, checkout, or subscription.

All recipe data remains in extension local storage. Screenshot pixels and OCR
results are never uploaded or saved. See [privacy](site/privacy/index.html) and
[terms](site/terms/index.html).

## Install the packaged extension

1. Download `remote-web-task-recipes.zip` from the site and extract it.
2. Open `chrome://extensions` in Chrome or Chromium.
3. Turn on **Developer mode**, choose **Load unpacked**, and select the extracted
   folder.
4. Pin the extension. `Alt+Shift+R` opens its quick launcher.

The ZIP is an unsigned developer package until the factory publishes it through
a browser store.

## Use it

1. Open the extension's notebook editor and create a notebook for the target web
   app origin.
2. Name a landmark and its spoken cue, then choose **Place on app**. The target
   tab is focused and frozen locally. Point and click, or use Arrow keys and
   Enter. Escape cancels.
3. Create a task, add concise steps, and optionally attach each step to a
   landmark.
4. Start the guide from the editor or extension popup. Use Previous/Next, the
   Arrow keys, or **Speak step**. Escape closes the guide.
5. Use **Backup & appearance** to export an encrypted `.rwtr` backup.

Coordinate pins are best for layouts that stay stable. Recheck landmarks after a
remote app, display scaling, or window layout changes.

## Develop, test, and build

Requires Node.js 20+ and npm.

```bash
npm ci
npm run dev            # WXT extension development
npm run dev:site       # landing site development
npm run check          # strict TypeScript; prepares WXT types itself
npm test               # Vitest; prepares WXT types itself
npm run test:browser   # MV3 Chromium regression, keyboard, dialog, Axe checks
npm run build          # extension + site + downloadable ZIP
npm run test:package   # inspect the staged ZIP as a consumer would
```

The factory's exact static-site command is:

```bash
npm run build:site     # writes the site and extension ZIP to dist/site/
```

The full build writes the deployable landing site to `dist/site/`, the loadable
extension to `.output/chrome-mv3/`, and the packaged extension to
`dist/site/downloads/remote-web-task-recipes.zip`.

## Architecture and permissions

- WXT + TypeScript, Manifest V3.
- `storage`: stores notebooks locally.
- `activeTab`: supports the explicit visible-tab screenshot gesture.
- `scripting` and `<all_urls>` host access: inject the capture/guide overlay into
  the browser app selected by the user. The content script does not read or send
  DOM text.
- Vite static landing site with no runtime CDN, telemetry, analytics, or remote
  API calls.

## Project records

- [Opportunity brief](.factory/brief.json)
- [Visual system and artwork provenance](.factory/design.md)
- [Build handoff](.factory/handoff.md)

## License

MIT. See [LICENSE](LICENSE).
