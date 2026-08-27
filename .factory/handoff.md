# Handoff — Remote Web Task Recipes v1

## Built

- WXT + TypeScript MV3 extension with a quick-launch popup, responsive notebook
  editor, local recipe storage, origin-scoped notebooks, user-triggered visible
  tab capture, pointer and keyboard landmark placement, optional browser-local
  `TextDetector` OCR, and non-automating task guidance overlays.
- Task playback supports previous/next buttons, Left/Right shortcuts, Escape,
  visible pins, and opt-in browser speech. Destructive notebook/task/step actions
  are confirmed; landmark removal is undoable.
- Encrypted `.rwtr` import/export using PBKDF2-SHA256 (250,000 iterations) and
  AES-256-GCM. Imports confirm before replacing current notebooks.
- One-time $19 Supporter Pack contract through the Sociobot pilot billing API:
  hosted checkout, returned-license capture, daily verification cache, offline
  optimistic unlock, revocation reconciliation, and paste-to-restore. It unlocks
  cosmetic notebook covers only; every accessibility, export, and safety feature
  is free.
- Static landing, `/privacy/`, and `/terms/` pages in `dist/site`, plus the built
  extension ZIP at `dist/site/downloads/remote-web-task-recipes.zip`.
- Product-specific handwritten lab-notebook visual system and original generated
  hero artwork. Prompt, revision prompt, review, and provenance are in
  `.factory/design.md` and `assets/src/`.

## Run and verify

```bash
npm install
npm run check
npm test
npm run build
```

`npm run build:site` is the work-order deploy command and puts `index.html` at
`dist/site/index.html`. Load `.output/chrome-mv3` as an unpacked extension for
development.

Verification completed 2026-08-27:

- `npm run check`: pass.
- `npm test`: 4/4 tests pass (model normalization, exact-origin matching,
  encrypted round trip, wrong/short passphrase failures).
- `npm run build`: pass; extension 157.75 KB uncompressed, downloadable ZIP about
  132 KB, initial site JS 3.41 KB, CSS 9.65 KB, mobile hero WebP 72 KB.
- Chromium end-to-end: created a notebook, keyboard-saved a captured landmark,
  created a task and linked step, and launched its guide overlay; no console or
  page errors.
- Factory `verify-url.sh`: pass at 1366×900 and 390×844; title, `lang`, one H1,
  main landmark, image alternatives, named buttons, and console checks pass.
- axe WCAG 2 A/AA/2.1 AA: zero violations on `/`, `/privacy/`, `/terms/`, the
  extension editor, and the popup.
- Lighthouse mobile (simulated throttling): Performance 99, Accessibility 100,
  Best Practices 96, SEO 100; FCP 1.2 s, LCP 1.8 s, TBT 0 ms, CLS 0.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 96,
  SEO 100; LCP 0.4 s and CLS 0.00015.
- Production dependency audit: zero vulnerabilities (`npm audit --omit=dev`).

## Known gaps and release notes

- Chromium's `TextDetector` is not available in every release/platform. In those
  browsers the extension clearly reports that local OCR is unavailable and keeps
  keyboard/pointer screenshot placement working; no cloud fallback is used.
- Coordinate landmarks can drift when a remote application changes layout,
  display scaling, or viewport size. v1 states this boundary in onboarding, the
  editor, landing page, README, and terms.
- The downloadable extension is unsigned. Browser-store review/distribution is a
  factory release task, not a repository task.
- Billing intentionally uses `https://pilot-api.sociobot.in` for staging. The
  factory must register the test product/return URL, then switch the configured
  base to `https://api.sociobot.in` for release. No product ID is hardcoded.
- Best Practices scores 96 because the local HTTP verification origin is not
  HTTPS; production deployment is HTTPS.
