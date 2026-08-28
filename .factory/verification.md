# Independent verification — FAIL

**Candidate:** `60fc1f9e13e072a7141960aa0655df671474af47`
**Repository / branch:** `B-Divyesh/sf-remote-web-task-recipes`, `main`
**Live URL:** <https://remote-web-task-recipes.sociobot.in>
**Verified:** 2026-08-27 UTC, from a clean checkout at the candidate SHA.
**Scope:** extension package, static site, live deployment, privacy/outbound
requests, accessibility, responsive and keyboard smoke tests. No product source
was changed.

## Verdict

**FAIL.** The locally built extension works for the core brief workflow, but the
live product cannot deliver its required extension: the advertised ZIP URL
returns the landing-page HTML, not an installable archive. The optional
Supporter Pack checkout URL also returns 404. In addition, the documented test
and type-check commands fail in a fresh checkout until a production build has
first generated `.wxt/tsconfig.json`.

## Release-blocking defects

| Severity | Evidence | Impact |
| --- | --- | --- |
| P0 | `GET https://remote-web-task-recipes.sociobot.in/downloads/remote-web-task-recipes.zip` returned `200 text/html`, 5,267 bytes, SHA-256 `933835…d936`, identical to `index.html`. Candidate `dist/site/downloads/remote-web-task-recipes.zip` is a valid 132,216-byte ZIP (SHA-256 `579008…434c`). | The browser-extension product cannot be downloaded or installed from the live site. Deployment does not fully match the candidate artifact. |
| P1 | Live Supporter Pack checkout at `https://pilot-api.sociobot.in/api/v1/products/remote-web-task-recipes/checkout` returned `404` with `{"error":"enabled factory product","status":404}`. The production API endpoint returned the same response. | The advertised optional one-time purchase cannot start. |
| P1 | Immediately after `npm ci`, `npm test` failed with `TSConfckParseError: failed to resolve "extends":"./.wxt/tsconfig.json"`; `npm run check` likewise failed (`TS5083`). `npm run build` creates that generated file; only then did `npm run check` and `npm test` pass. | Required tests/type checking are not independently runnable from the clean checkout or in the documented README order. |

## Other defects / release concerns

| Severity | Evidence | Impact |
| --- | --- | --- |
| P2 | Chromium desktop normal load logs `Failed to load resource: the server responded with a status of 404`; resource timing identifies `https://remote-web-task-recipes.sociobot.in/favicon.ico`, whose response is 404. | Fails the stated no-console-errors quality gate. |
| P2 | Live responses have HSTS, `nosniff`, and a referrer policy, but no CSP, `frame-ancestors`/X-Frame-Options, or Permissions-Policy. Hashed JS, CSS, image, and SW assets use only `cache-control: public, must-revalidate, max-age=30`, rather than immutable long-lived asset caching. | Weaker browser hardening and avoids the specified static-asset caching strategy. |
| P3 | `npm audit` after clean install reported 10 full-tree advisories (1 low, 2 moderate, 4 high, 3 critical); `npm audit --omit=dev` reported 0 vulnerabilities. | Development/build dependency supply-chain debt; it does not affect the shipped static bundle according to the production-only audit. |

## Local build and package evidence

- `npm ci`: completed. It reported the audit advisories above.
- Clean-state `npm test`: **failed** before any build, as described above.
- Clean-state `npm run check`: **failed** before any build, as described above.
- Exact `npm run build`: **passed**. It ran WXT production build, Vite site
  build, WXT ZIP, and copied the ZIP to `dist/site/downloads/`.
- After that build: `npm run check` **passed** and `npm test` **passed**, with
  4/4 Vitest tests (normalisation, origin matching, encrypted round trip and
  wrong/short passphrase failures).
- Built extension: 157.75 KB uncompressed; ZIP: 132,216 bytes and `unzip -t`
  passed. Initial landing-site JS: 3.41 KB; CSS: 9.65 KB; mobile hero WebP:
  73,420 bytes. These are within the stated static budget.

## End-to-end product exercise

Using Chromium 145 with the freshly built MV3 directory loaded as an unpacked
extension, I completed this path against a regular local browser tab:

1. Opened the editor; invalid `type=url` input was rejected by native validation
   (`Please enter a URL.`), then corrected it.
2. Created an origin-scoped `Weekly timesheet` notebook.
3. Added a landmark, requested the deliberate capture, moved it using Arrow
   keys, and saved with Enter.
4. Created a task and a step linked to that landmark; started the guide, used a
   keyboard step shortcut, and closed it with Escape.
5. Exported an encrypted `.rwtr` backup with a valid passphrase; the download
   had the expected `.rwtr` filename.

No extension page errors occurred. The only observed normal-load console error
was the site favicon 404 above. The 390×844 extension editor had one H1 and one
main landmark, the skip link, and no horizontal overflow (`scrollWidth = 390`).

## Accessibility, responsiveness, and PWA checks

- Live desktop (1366×900), mobile (390×844), privacy, and terms pages each had
  a title, `lang=en`, exactly one H1, one main landmark, and no image lacking
  `alt`. Neither desktop nor mobile had horizontal overflow.
- Axe Core 4.11.1 WCAG 2 A/AA/2.1 AA: **zero violations**, including zero
  serious or critical findings, on all four live pages.
- Keyboard smoke test reached the skip link first and exposed a visible 3px
  solid focus outline (`rgb(0,111,138)`). The core extension flow above was
  completed using keyboard placement and guide commands. Reduced-motion CSS was
  inspected and disables animations/transitions under the user preference.
- The live site registered its service worker after initial load and successfully
  reloaded offline from its cached shell. Its update/cache strategy is not
  versioned with build hashes, hence the caching concern noted above.

## Privacy and deployment identity

- Static inspection found no analytics, ad, telemetry, or third-party font
  requests. A normal live load requested only
  `remote-web-task-recipes.sociobot.in`; fonts are self-hosted.
- The extension stores notebook state using `browser.storage.local`. Screenshot
  capture is initiated only from the landmark action (`captureVisibleTab`), OCR
  consumes the data URL locally through `TextDetector`, and source inspection
  found no upload of screenshot pixels, OCR text, recipe content, credentials,
  or DOM content. The only configured remote request is the explicit license
  verification to Sociobot's pilot API.
- The live `index.html`, JS, CSS, hero image, service worker, privacy page, and
  terms page matched the candidate build byte-for-byte. The ZIP mismatch is the
  material deployment exception.

## Required next steps

1. Publish `dist/site/downloads/remote-web-task-recipes.zip` as a real static
   binary and recheck its status, content type, size, checksum, and browser
   installation flow at the live URL.
2. Register/enable the product and configure the live checkout/verification
   base, then verify a non-purchase checkout redirect and a test/license return.
3. Make test/typecheck generate WXT types themselves so `npm ci && npm run
   check && npm test` passes from a clean tree.
4. Add the favicon and deployment security/cache headers, then repeat live
   console/header verification.
