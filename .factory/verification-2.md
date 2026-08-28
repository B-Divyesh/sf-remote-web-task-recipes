# Independent verification 2 — FAIL

**Candidate:** `f298f199e4960642a9bb1e2631736070ed9cfdb6`  
**Repository / branch:** `B-Divyesh/sf-remote-web-task-recipes`, `main`  
**Live URL:** <https://remote-web-task-recipes.sociobot.in>  
**Verified:** 2026-08-28 UTC from a clean checkout. No product source changed.

## Verdict

**FAIL.** The earlier deployment-only failure is resolved: the live site serves
the installable extension and its contents match this candidate. But the core
extension can select and capture a different origin from its recipe. That
violates the origin-scoped and local-privacy contract for this product.

## Defects

| Severity | Evidence | Impact / required fix |
| --- | --- | --- |
| P1 | `entrypoints/background.ts:12-15` filters with `url.startsWith(targetOrigin)` and chooses the first match. In a clean Chromium test, a recipe for `http://app.test` with tabs `http://app.test.evil/` (created first) and `http://app.test/` produced `{ wrongOverlay: 1, rightOverlay: 0 }` after **Place on app**. | It freezes page pixels and places/guides a landmark on an unrelated look-alike domain. Compare `new URL(tab.url).origin` exactly, reject mismatch, and regression-test capture and guide dispatch. |
| P2 | New notebook and passphrase overlays focus an input, but `#modal` has no `role="dialog"` or `aria-modal`; background content remains exposed and focus is not restored to the triggering control. Confirm-delete alone is semantic. | Screen-reader modal context is unreliable in core setup/data actions. |
| P2 | The researched brief names one-time monetization. v1 is honestly all-free and has no broken checkout, but no registered license product or one-time purchase path. | Business-scope deviation; retain free access until billing is registered, then implement and test the Sociobot flow. |

## Fresh local checks

Executed on Node `v22.23.2` / npm `10.9.8`:

```bash
npm ci
npm run check
npm test
npm run build
npm run test:package
npm audit --omit=dev
```

- Install, type check, exact production build, and consumer ZIP check passed.
- Vitest passed **7/7**. Full-tree audit has 10 development-only advisories;
  production-only audit has **0 vulnerabilities**.
- Built MV3 payload: 155,029 bytes. Consumer ZIP: 131,370 bytes, contains
  `manifest.json`, and passes `unzip -t`.

## End-to-end MV3 exercise

Loaded `.output/chrome-mv3` in clean Chromium 145 / Playwright 1.58.2.

1. Invalid app URL was rejected (`Please enter a URL.`); a corrected
   `https://example.com/path` notebook was created.
2. Deliberate capture opened only from **Place on app**. Arrow/Shift+Arrow and
   Escape left zero landmarks; repeat placement saved one pin at `x=0.49`,
   `y=0.55` with no page/console errors.
3. Created `Submit weekly hours`, added a linked step, opened its guide, and
   closed it with Escape.
4. Five-character export passphrase was rejected. A valid export downloaded
   `remote-task-recipes-2026-08-28.rwtr` (538 bytes,
   `rwtr-encrypted-v1`) and did not contain plaintext `Private payroll`.
5. The isolated two-origin test above reproduced the P1 fault.

## Live, privacy, accessibility, and performance evidence

- `/downloads/remote-web-task-recipes.zip`: **200**, `application/zip`,
  131,370 bytes, immutable caching; downloaded archive passes `unzip -t`.
- Live root SHA-256
  `8b183ae92b5c99e321c0272e63664810b0b123910ba561d1da8f23a4881d0a75`
  equals the fresh candidate build. ZIP container SHA differs only from ZIP
  timestamps; every uncompressed entry hash equals the candidate build.
- Root/assets/archive/SW responses carry HSTS, CSP, nosniff, Referrer-Policy,
  Permissions-Policy, and `X-Frame-Options: DENY`; hashed CSS and archive are
  immutable and `sw.js` is no-cache.
- Live home, privacy, terms at desktop and home at 390x844: title, `lang=en`,
  one H1/main, no missing alt or overflow, no console/page errors, and first
  Tab hits a visible 3px skip-link focus ring. Requests used only the product
  origin. Reduced motion has `scroll-behavior: auto` and no hover transform.
- Axe Core 4.11.4 WCAG 2 A/AA/2.1 AA: **0 violations** (including serious and
  critical) on live home/privacy/terms and empty 390px extension editor.
- Service worker controlled a reload and the live home reloaded offline.
- Lighthouse mobile: Performance **91**, Accessibility **100**, Best
  Practices **100**, SEO **100**; FCP 1.1 s, LCP 1.5 s, CLS 0, TBT 370 ms.
  Initial JS is 917 B, CSS 9,247 B combined, and mobile hero WebP is 73,420 B.
- Source and request review found no analytics, telemetry, CDNs, remote OCR,
  screenshot/recipe uploads, or remote APIs. The P1 issue is local wrong-tab
  capture, not an upload.

## Required re-verification

After exact-origin selection and modal repair, repeat the clean commands,
look-alike-origin test, MV3 workflow, live archive comparison, Axe, offline
reload, and Lighthouse.
