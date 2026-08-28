# Perfection loop round 2

**Reviewed candidate:** `91bdeb0cc49c16a4cc646744b089536399799f36`

**Adversarial report:** `7e44b5c0cbe3b85a75c2c87c12e5b924753cd175`

**Repair commit:** `2ba34bc`
**Live URL:** <https://remote-web-task-recipes.sociobot.in/>

Every finding in `review-1.md` and `review-2.md` is mapped below. No earlier
`polish-*.md` file existed.

## Review 1

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R1-B1 | Added first-screen **Try it with sample data**, direct `/demo/` and `?demo=1`, realistic Northstar Payroll data, persistent demo banner, reset/exit, a `demo:` namespace, and real pointer/keyboard landmark placement. | `@claim:demo-workflow`, `@claim:demo-isolation`, `@claim:demo-positioning`; `.factory/evidence/polish-2-demo-mobile.png`; live `/demo/` and `/?demo=1`. |
| R1-B2.1 workflow | The sample and packaged MV3 tests now create/show landmarks and advance one task step at a time. | `@claim:demo-workflow`, `@claim:free-complete`. |
| R1-B2.2 no collection/automation | Added password, page-text, request, and click sentinels to a real content-script guide session. | `@claim:user-control`, `@claim:temporary-capture`. |
| R1-B2.3 deliberate capture | Placement opens only after the action; pointer, Arrow, Shift+Arrow, Enter, and Escape are exercised. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.4 text suggestions/manual path | Added supported and unsupported `TextDetector` fixtures. Both paths save a real landmark; a third path cancels. | `@claim:manual-suggestions`. |
| R1-B2.5 one-step guide/no action | The guide exposes its current step and the tests prove target click state never changes. | `@claim:demo-workflow`, `@claim:user-control`. |
| R1-B2.6 local/exact website | Extension storage is inspected in a fresh profile; exact-origin dispatch rejects `app.test.evil`. | `@claim:local-notebooks`, `@claim:capture-and-origin-scope`. |
| R1-B2.7 temporary screenshot | Capture state is inspected while open and after Escape; no pixel data enters storage or a request. | `@claim:temporary-capture`. |
| R1-B2.8 encrypted backup | The envelope hides notebook text, decrypts with the correct passphrase, and rejects a different one. | `@claim:encrypted-backup`, `@claim:free-complete`. |
| R1-B2.9 no analytics/CDN/API | The complete site sample and packaged extension flows intercept every HTTP request. | `@claim:site-private`, `@claim:temporary-capture`, `@claim:free-complete`. |
| R1-B2.10 stable-position boundary | Copy now states the limitation literally. Placement tests measure normalized saved positions. | `@claim:demo-positioning`, `@claim:manual-suggestions`; landing “When to recheck landmarks.” |
| R1-B2.11 free workflow | A fresh MV3 profile completes landmark, guide, speech, appearance, and backup flows without auth or payment. | `@claim:free-complete`. |
| R1-B2.12 install/package | The production MV3 output loads alone in a clean Chromium profile; the ZIP is checked for integrity and manifest. | `@claim:package-ready`; `npm run test:package`. |
| R1-B2.13 Arrow/Shift+Arrow | Tests assert 1% and 5% coordinate changes, then save with Enter. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R1-B2.14 limited content-script behavior | Before an explicit message the script has no overlay; exact-origin tests prove targeted dispatch and sentinel data remains unread. | `@claim:capture-and-origin-scope`, `@claim:user-control`. |
| R1-B3 | Removed navigation fallback, added a notebook-styled `404.html`, and configured a real 404 status. Added metadata and focus to the 404 too. | `all public routes have complete metadata...`; `npm run test:package`; live `/not-a-real-route` returns 404. |
| R1-M1 | Added per-route titles, descriptions, canonical, Open Graph, Twitter, 1200×630 image, favicons, robots, sitemap, legal links, Param Factory, and build ID. | `all public routes have complete metadata...`; live `/robots.txt`, `/sitemap.xml`, `/privacy/`, `/terms/`. |
| R1-M2 | Rewrote metaphor-first and technical copy in plain words. Headings now name tasks; OCR, origin, and algorithm jargon is absent from visitor copy. | `.factory/copy-audit.md`; release contract metadata/copy checks. |
| R1-M3 | Standardized **notebook**, **landmark**, **task step**, **guide**, and **landmark description**. Internal historic property names remain only for data compatibility. | `.factory/copy-audit.md`; landing and README inspection. |

## Review 2

| Finding ID | Change made | Evidence |
| --- | --- | --- |
| R2-B1 | `prebuild:site:assets` now generates WXT types. `build`, `test:site`, and every site claim command work after only `npm ci`. | Clean clone `/tmp/rwtr-polish2-clean.fmRVFx` at `2ba34bc`: all 12 exact claim commands passed. `makes site builds self-sufficient in a clean clone`. |
| R2-B2.1 extension storage | Added a fresh-profile create/inspect/delete test and reduced stored URLs to exact website addresses. | `@claim:local-notebooks`. |
| R2-B2.2 screenshot lifetime | Added live capture-state, post-cancel, extension-storage, and request assertions. | `@claim:temporary-capture`. |
| R2-B2.3 analytics/accounts/payment | Added full site and extension request interception plus complete no-account workflow. | `@claim:site-private`, `@claim:free-complete`. |
| R2-B2.4 no website automation/read | Added real password, page-text, and target-click sentinels to the packaged content script. | `@claim:user-control`. |
| R2-B2.5 suggestions/manual placement | Added supported/unsupported detector fixtures and saved landmarks through both. | `@claim:manual-suggestions`. |
| R2-B2.6 screen positions | Copy is a caution, not a detection promise; coordinate deltas and stored values are asserted. | `@claim:demo-positioning`, `@claim:manual-suggestions`. |
| R2-B2.7 every feature/free | The real extension flow exercises all listed features without account, checkout UI, or payment request. | `@claim:free-complete`. |
| R2-B2.8 install/shortcut assertions | Removed the unproved shortcut and unsigned-package wording. Retained only manual-install copy proven by the fresh-profile package test. | `@claim:package-ready`; README. |
| R2-B2.9 claims completeness | Replaced the manifest with 12 claims. A release-contract test requires one and only one matching tag for every ID. | `lists every claim tag exactly once...`; all 12 exact clean-clone commands passed. |
| R2-M1 metadata/focus | Added missing Twitter fields and full 404 metadata. Every navigation load focuses and politely announces the destination h1. | `all public routes have complete metadata...`; direct, reload, and back focus assertions. |
| R2-COPY-L23 | “Private by design” became “What stays on your device.” | `.factory/copy-audit.md` L25. |
| R2-COPY-L25/R38 | “Extension local storage” became “storage inside your browser extension.” | `.factory/copy-audit.md` L27; README privacy section. |
| R2-COPY-R17 | Removed undefined “quick launcher” wording and its unproved shortcut claim. | README installation section. |
| R2-COPY-R19 | “Use it” became “Use Remote Web Task Recipes.” | README heading. |
| R2-COPY-R39 | “Origin” became “exact website” in visitor copy. | README privacy section; extension origin hint. |
| R2-COPY-R54 | “MV3” became “Chrome extension (Manifest V3).” | README installation section. |

## Additional defects closed during repair

- Landmark saving now has a secure random fallback for ordinary HTTP intranet
  apps, where `crypto.randomUUID()` is unavailable. The supported/unsupported
  detector claim test saves on `http://app.test`.
- Appearance changes no longer replace the open data-tools view during its own
  storage event. `@claim:free-complete` changes the theme and continues to backup.
- Editor tabs now support Arrow/Home/End keys with roving focus. Modal
  backgrounds become inert, focus is trapped and restored, and the capture
  dialog restores page focus.
- The landing and extension reflow at 200% text size without horizontal loss.
  Reduced-motion and offline reload paths are browser-tested.

## Local quality evidence

- Unit/release: 14/14 passed.
- Site/claims: 6/6 passed; Axe reported zero violations on all public routes.
- MV3 integration: 7/7 passed in fresh persistent Chromium profiles.
- Production extension: 157.34 KB uncompressed; ZIP 132,145 bytes.
- Initial site JS: 4.58 KB largest entry; CSS 12.28 KB; mobile hero 73,420 bytes.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100,
  SEO 100; FCP 1.2 s, LCP 1.8 s, CLS 0.008, TBT 0 ms.
- Screenshots: `.factory/evidence/polish-2-home-mobile.png`,
  `.factory/evidence/polish-2-demo-mobile.png`, and
  `.factory/evidence/polish-2-demo-desktop.png`.

## Live cold check

Deployed through `/opt/fleet/lib/deploy-static.sh` with deployment ID
`5966651b-658d-4d45-a12c-280547b954ff`. A new browser context then checked
the custom domain, not the Azure preview address.

- `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims`:
  6/6 passed against production. This repeated demo workflow, isolation,
  placement, privacy interception, route metadata/focus/mobile/Axe, true 404,
  and offline reload checks.
- `/opt/fleet/lib/verify-url.sh`: 200; zero console errors; title, `lang`, one
  h1, main landmark, image alternatives, and button names passed. Evidence:
  `.factory/evidence/live/verify.json`.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.5 s, LCP 1.5 s, CLS 0.008, TBT 0 ms. Evidence:
  `.factory/evidence/live/lighthouse.json`.
- `/`, `/demo/`, `/?demo=1`, `/privacy/`, `/terms/`, `robots.txt`,
  `sitemap.xml`, and the ZIP returned 200. `/not-a-real-route` returned 404.
- The public ZIP was 132,145 bytes and every entry's path, size, and CRC
  matched the local production package.
- The public response includes CSP, HSTS, `nosniff`, frame denial, referrer,
  and permissions headers.
- Cold screenshots:
  `.factory/evidence/live/screenshot-mobile.png`,
  `.factory/evidence/live/screenshot-desktop.png`,
  `.factory/evidence/live/demo-mobile.png`,
  `.factory/evidence/live/demo-desktop.png`, and
  `.factory/evidence/live/404-mobile.png`.

Every mapped finding passed its named local test and its applicable live check.
No finding remains open.
