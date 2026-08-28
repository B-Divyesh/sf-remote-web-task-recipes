# Repair handoff — perfection loop round 1

## What changed

- Repaired every blocking review finding from `.factory/review-1.md`.
- Rewrote the first screen around the job and added **Try it with sample data**.
- Added `/demo/` and `/?demo=1`, a Northstar Payroll sample notebook, three
  numbered landmarks, guide playback, persistent demo banner, reset, and
  start-real controls. Demo storage is only `demo:remote-web-task-recipes`.
- Added `.factory/claims.json`, nine tagged claim tests, and `.factory/demo.md`.
- Replaced the SPA fallback with real multi-page routes and a styled 404 with
  HTTP 404 configuration. Added robots, sitemap, per-route metadata, social
  art, Apple touch icon, consistent legal links, and build identity.
- Kept the warm ruled-paper and red registration-pin field-notebook identity.
- Tightened mobile behavior by hiding header navigation at phone width and
  stacking the sample workspace.

## Verification evidence

Run in this workspace after `npm ci` on 2026-08-28:

| Command | Result |
| --- | --- |
| `npm run check` | PASS — TypeScript with WXT preparation |
| `npm test` | PASS — 11 tests |
| `npm run test:site` | PASS — 7 Playwright tests; 390px layout, axe serious/critical 0, demo, metadata, and 404 |
| `npm run build` | PASS — `dist/site/`, MV3 output, and downloadable ZIP |
| `npm run test:package` | PASS — ZIP 131,630 bytes, manifest, direct download, real 404 config |
| `npm run test:browser` | PASS — 2 real MV3 Chromium tests |

Each `test` command in `.factory/claims.json` was run independently. The six
demo claim commands passed in fresh Playwright contexts. The origin, encrypted
backup, and exact-origin MV3 claim commands also passed.

A separate clean clone at `/tmp/rwtr-clean-round1` installed from scratch with
`npm ci` and passed the same check, unit, site, build, package, and MV3 browser
suite. That verification used `ef152a4e50dfeca9a5f1d85e115d7ae80addbac4`
before this handoff-evidence amend.

The static initial JavaScript is 0.24 KB gzip on the landing page and 1.18 KB
gzip for demo behavior. The generated social image is 1200×630 and 188 KB.
Mobile Lighthouse against the live landing page recorded Performance 100 and
Accessibility 100 (`/tmp/rwtr-lighthouse.json`).
The site has no public offline promise; its service worker precaches the demo
shell for best-effort revisit support.

## Run and deploy

```bash
npm ci
npm run check
npm test
npm run test:site
npm run build
npm run test:package
npm run test:browser
```

Deploy the static `dist/site/` directory through the factory static work order.
The extension package is `dist/site/downloads/remote-web-task-recipes.zip`.

Deployment completed through the static work-order configuration on 2026-08-28
(Azure Static Web Apps deployment `b8e10084-c747-406e-8813-805e5ce9541e`).
Live verification returned `/` 200 with the sample action, `/demo/` 200 with
the demo banner, and `/not-a-real-route` 404 with the styled error page.

## Known gaps

No blocking findings remain. `npm audit` still reports 10 development-tree
advisories from the inherited toolchain; `npm audit --omit=dev` previously
reported none, and no remediation was applied in this repair.
