# Repair handoff — ready for deployment

**Work order:** `remote-web-task-recipes-repair-2`
**Verifier report repaired:** `.factory/verification-2.md` at report commit
`938f74f17e71e658873e4e946294c6f1e2d0a2b9` (candidate
`60fc1f9e13e072a7141960aa0655df671474af47`)

## Repairs

1. **Exact-origin capture and guide dispatch (P1):** The background worker no
   longer uses a URL prefix comparison. `src/tab-dispatch.ts` parses URLs,
   admits only `http:`/`https:` origins, and selects only a tab whose parsed
   origin exactly equals the notebook origin. It cannot select
   `http://app.test.evil/` for `http://app.test`. Invalid/non-web origins are
   rejected with an actionable error. The notebook creation form uses the same
   parser, preventing non-web origins from being saved.
2. **Modal semantics and keyboard restoration (P2):** The new-notebook and
   passphrase overlays now receive `role="dialog"`, `aria-modal="true"`, and a
   heading label; focus moves into the dialog, is trapped while it is open, and
   returns to the connected triggering control on Escape/cancel/success.
   Existing confirm-delete `alertdialog` behavior remains intact.
3. **Regression coverage:** Unit tests cover exact-origin selection plus both
   screenshot capture and guide message dispatch. A pinned Playwright 1.58.2
   MV3 suite loads the unpacked production extension in Chromium and verifies
   the real `app.test` / `app.test.evil` case, modal semantics, keyboard focus
   restoration, 390px editor layout, no editor console errors, and zero
   serious/critical Axe findings. Vitest ignores those Playwright specs.

## Verification

Performed on 2026-08-28 UTC with Node 22.23.2 / npm 10.9.8:

```bash
npm ci
npm run check
npm test
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npm run test:browser
npm run build
npm run test:package
npm audit --omit=dev
```

- Type check passed. Vitest passed **11/11** tests: notebook/crypto,
  release-contract, and exact-origin routing tests.
- Playwright passed **2/2** production-MV3 tests. The deliberate look-alike
  test created `http://app.test.evil/` first, then `http://app.test/`; capture
  and guide overlays appeared only on the intended origin. Dialogs returned
  focus to **New** and **Export encrypted backup** after Escape. The editor
  passed the 390×844 no-overflow/single-main/single-h1 check and Axe 4.11.4
  reported zero serious/critical violations before and during a dialog.
- Production build passed and produced `.output/chrome-mv3/` (155,730 bytes)
  plus `dist/site/downloads/remote-web-task-recipes.zip` (131,630 bytes).
  Consumer ZIP validation passed: archive integrity, `manifest.json`, and the
  static-host download fallback exclusion all succeeded.
- Production-only audit reported **0 vulnerabilities**. `npm ci` retains the
  inherited 10 development-only advisories in the toolchain.
- Local static-site Chromium smoke at desktop and 390×844 checked home,
  privacy, and terms: every page has title/lang/one h1/main/complete image alt
  text, zero serious/critical Axe 4.11.4 violations, no console/page errors,
  no mobile overflow, and requests only to the local product origin. The
  factory `verify-url.sh` also passed the home-page desktop/mobile load check
  (592 ms) with zero errors.

## Privacy, billing, and release notes

- The repair preserves local-only notebook storage, local screenshot/OCR
  handling, encrypted backup, no telemetry, no remote font/script, and no
  change to the extension/site artifact class or static deployment layout.
- The verified one-time billing product is still not registered: on 2026-08-28
  `GET https://api.sociobot.in/api/v1/products/remote-web-task-recipes/checkout`
  returned **404**. Product registration is factory billing infrastructure and
  is explicitly outside this repository’s authority. The extension therefore
  remains honestly all-free, with no dead checkout, account, license storage,
  or paid accessibility gate. Do not add a checkout until the factory registers
  the product and can exercise a real checkout/return-license flow.

## Deploy

```bash
npm run build:site
/opt/fleet/lib/deploy-static.sh remote-web-task-recipes dist/site
```

`build:site` is intentionally the deploy build: it creates the extension ZIP
inside `dist/site/downloads/` before static deployment.
