# Repair handoff — PASS

**Repair work order:** `remote-web-task-recipes-repair-1`
**Verifier baseline:** `60fc1f9e13e072a7141960aa0655df671474af47` / report commit `feb3b72eb4bddd434322bebf4fffc10a79d90d77`
**Deployed URL:** <https://remote-web-task-recipes.sociobot.in>

## Release-blocking repairs

1. **Installable extension download:** `npm run build:site` now builds the site, MV3 extension, and ZIP as one atomic static-deployment artifact. A checked-in `staticwebapp.config.json` excludes `/downloads/*` from SPA fallback, so the archive cannot be rewritten to `index.html`. `npm run test:package` validates the staged archive with `unzip -t`, requires `manifest.json`, and checks that the fallback exclusion is present.
2. **Clean test/typecheck:** `npm run check` and `npm test` each run `wxt prepare` before TypeScript/Vitest. This fixes the fresh-checkout dependency on a prior production build.
3. **Unavailable checkout:** Sociobot has no registered product for this slug; the factory contract prohibits changing billing infrastructure from this repository. Rather than advertise a known 404, v1 now makes all three cosmetic covers free and removes checkout, license storage, verification, and restore UI. The core brief workflow is unchanged and remains local-only. A regression test forbids reintroducing the unregistered checkout URL.
4. **Console, hardening, and caching:** added an authored SVG favicon, CSP, `X-Frame-Options: DENY`, Permissions-Policy, and immutable caching for hashed assets and download archives. The service-worker cache namespace is `rwtr-site-v2`; `sw.js` is no-cache so later revisions can update it.

## Verification evidence

From a clean dependency install on Node `v22.23.2` / npm `10.9.8`:

```bash
npm ci
npm run check
npm test
npm run build
npm run test:package
```

- `npm run check`: passed after WXT generated types itself.
- `npm test`: passed, **7/7** tests (four notebook/crypto tests and three release-contract regressions).
- `npm run build`: passed and produced `dist/site/`, `.output/chrome-mv3/`, and `dist/site/downloads/remote-web-task-recipes.zip`.
- `npm run test:package`: passed. ZIP is **131,370 bytes**, contains `manifest.json`, and `unzip -t` passes.
- `npm audit --omit=dev`: **0 vulnerabilities**. `npm ci` still reports the verifier’s inherited 10 development-only advisories; no production dependency is affected.

Browser verification used Chromium/Playwright 1.58.2:

- Locally built landing site: desktop 1366×900 and mobile 390×844 have one H1 and one main landmark, no horizontal overflow, first Tab reaches the skip link, no console errors, and `application/zip` download response is 131,370 bytes.
- Axe Core 4.11 WCAG 2 A/AA/2.1 AA: **0 violations** on home, privacy, and terms pages.
- Unpacked MV3 consumer smoke: loaded `.output/chrome-mv3`, opened its options page, created the `Weekly timesheet` origin-scoped notebook and `Submit hours` task, with one H1/main, no overflow, and no page errors.
- Live browser smoke repeated desktop/mobile, keyboard, Axe, download, and no-console-error checks with the same passing results.
- Live HTTPS service worker registered `rwtr-site-v2`, precached `/`, and reloaded the home page offline with one H1.

Live deployment verification after Static Web Apps deployment `1dc549ac-e746-4495-b798-989b5f2fe8e9`:

- `GET /downloads/remote-web-task-recipes.zip` → `200`, `application/zip`, `131370` bytes, `Cache-Control: public, max-age=31536000, immutable`.
- Live ZIP SHA-256 matches the built artifact: `56a0f4d9bcc1bbf4fa43cbb45e3992838a1e0660d3dc8e381d88613615c0111e`.
- `unzip -t` of the downloaded live archive passed.
- Live root and asset headers include the CSP, Permissions-Policy, `X-Frame-Options: DENY`, `nosniff`, and immutable asset caching. `/favicon.svg` returns 200; normal page load has no favicon console error.
- Outbound/request review: the landing site has no analytics, third-party fonts, checkout, license, or remote API calls. Notebook, screenshots, OCR, encryption, and export behavior remains browser-local.

## Deploy and operate

```bash
npm ci
npm run check
npm test
npm run build:site
npm run test:package
/opt/fleet/lib/deploy-static.sh remote-web-task-recipes dist/site
```

`build:site` is intentionally the deploy command: it includes the extension archive under `dist/site/downloads/` before the directory is uploaded.

## Known follow-up

The brief’s original one-time monetization is intentionally deferred until the factory registers the product in Sociobot billing. Re-enable a paid surface only after registration and a real checkout/return-license test; do not restore the old unregistered URL. The current all-free extension is honest, usable, and has no broken purchase path.
