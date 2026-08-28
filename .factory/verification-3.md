# Independent verification 3 — PASS

**Candidate:** `547da0a2ce5b10622379a7a7bc8da2f108a005d4`
**Repository / branch:** `B-Divyesh/sf-remote-web-task-recipes`, `main`
**Live URL:** <https://remote-web-task-recipes.sociobot.in>
**Verified:** 2026-08-28 UTC from a clean checkout. Product source was not changed by this verification.

## Verdict

**PASS.** The live site delivers a valid installable MV3 package whose uncompressed contents match the fresh candidate build. The earlier deployment failure does not reproduce. The previous P1 exact-origin dispatch and P2 modal accessibility failures are fixed and regression-tested in a real Chromium MV3 session.

## Local clean-checkout evidence

Environment: Node `v22.23.2`, npm `10.9.8`, Chromium 145, Playwright `1.58.2`.

```bash
npm ci
npm run check
npm test
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npm run test:browser
npm run build
npm run test:package
npm audit --omit=dev --audit-level=critical
```

All commands passed. `npm run check` runs `wxt prepare` then TypeScript; `npm test` passed **11/11** Vitest tests; and the production-MV3 Playwright suite passed **2/2** tests. There is no lint script in `package.json`. `npm run build` produced `dist/site/`, an uncompressed MV3 payload of **155,728 bytes**, and a **131,630-byte** consumer ZIP. `npm run test:package` validated archive integrity, `manifest.json`, and the static-host fallback exclusion. Production-only audit found **0 vulnerabilities**.

## End-to-end extension evidence

In a fresh persistent Chromium profile loaded from the production `.output/chrome-mv3` directory, I completed this keyboard-capable workflow:

1. Created an origin-scoped `Weekly payroll` notebook for the live product origin.
2. Entered a named landmark and cue, chose **Place on app**, verified the deliberate capture overlay on the selected web tab, nudged with Arrow and Shift+Arrow, and saved with Enter.
3. Created `Submit weekly hours`, linked `Review total then submit.` to the landmark, started the guide, and closed it with Escape.
4. Confirmed native recovery for a five-character backup passphrase: `Please lengthen this text to 10 characters or more ...`; Escape returned focus to the export trigger.
5. Exported a valid backup. It downloaded as `remote-task-recipes-2026-08-28.rwtr`, was 542 bytes, `rwtr-encrypted-v1`, and did not contain the plaintext recipe name.

No page or console errors occurred. At 390x844 the editor had one H1 and main landmark with no horizontal overflow. The MV3 regression suite also created `http://app.test.evil/` before `http://app.test/`: both capture and guide appeared only at the exact intended origin. It verified dialog names, `aria-modal`, focus return after Escape, mobile layout, and zero serious or critical Axe 4.11.4 findings.

## Live deployment, privacy, and browser-policy evidence

- Live `/`, `/privacy/`, `/terms/` were byte-identical to the fresh build for all sampled HTML/assets: root SHA-256 `8b183ae92b5c99e321c0272e63664810b0b123910ba561d1da8f23a4881d0a75`, service worker `c1d4712846738332879521ac813f5058f55ad05caa0c5d712b5a40f8db76d537`, plus the built JS, CSS, mobile hero, and privacy page.
- The live download returned **200**, `application/zip`, immutable cache control, and **131,630 bytes**. `unzip -t` passed; every uncompressed ZIP entry hash equals the fresh candidate package. The outer ZIP SHA differs (`a9e01f...` live versus `6ae6a6...` fresh) only because ZIP metadata/timestamps are regenerated, not package content.
- Root, ZIP, CSS, and `sw.js` responses have HSTS, CSP, nosniff, Referrer-Policy, Permissions-Policy, and `X-Frame-Options: DENY`. Hashed CSS and ZIP use one-year immutable cache; `sw.js` is `no-cache`.
- Fresh desktop and 390x844 Playwright checks on live home/privacy/terms found a title, `lang=en`, exactly one H1 and main, complete image alt text, no overflow, and zero console/page errors. Requests went only to the product origin. First Tab reached the skip link with a visible 3px `rgb(0,111,138)` focus ring. Reduced motion yields `scroll-behavior:auto` and no hover transform.
- Axe Core 4.11.4 WCAG 2 A/AA/2.1 AA reported **zero serious/critical** findings on each live page. CSP correctly blocks unauthorised inline script injection; Axe was injected as an init script before navigation.
- The PWA service worker controlled a subsequent reload; with network offline, the 390px home page reloaded with its expected title.
- Source, manifest, and request review found local `browser.storage.local`, local data-URL/TextDetector OCR handling, AES-256-GCM/PBKDF2-250000 export, no analytics/telemetry/CDNs/checkout/remote API, and no click automation. The broad `<all_urls>` content-script permission is used to support user-selected browser apps; dispatch accepts only an exact `http`/`https` origin and the content script does nothing until an explicit extension message. No pixels, DOM text, recipes, or credentials are uploaded.

## Performance

Fresh mobile Lighthouse: Performance **91**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP **1.1 s**, LCP **1.5 s**, CLS **0**, TBT **370 ms**. Static initial JS is **917 bytes**, CSS **9,247 bytes**, all font artifacts total **96,516 bytes**, and the mobile hero is **73,420 bytes**: each is within the stated budgets.

## Defects / follow-up

| Severity | Status | Evidence / disposition |
| --- | --- | --- |
| P0–P2 | None found | Acceptance workflow, live artifact, accessibility, privacy, headers, offline reload, and performance gates passed. |
| P3 | Toolchain advisory debt | A full `npm ci` reports 10 development-only advisories (including transitive tooling advisories); production-only audit is 0. No shipped dependency is affected. Update toolchain dependencies separately. |

The researched one-time monetization is intentionally not implemented because the required billing product remains unregistered; the product honestly ships all accessibility features free with no dead checkout or accessibility gate.
