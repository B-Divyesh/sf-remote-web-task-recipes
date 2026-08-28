# Repair handoff — perfection loop round 2

## Outcome

Released the repaired Remote Web Task Recipes extension and site at
<https://remote-web-task-recipes.sociobot.in/>. Every finding from
`.factory/review-1.md` and `.factory/review-2.md` is closed and mapped in
`.factory/polish-2.md`. Product code is in repair commit `2ba34bc`.

## What changed

- Rewrote the first screen so it names the job, audience, first action, and
  three concrete facts without metaphor or jargon.
- Added a one-click `/demo/` and `?demo=1` sample with realistic payroll data,
  a persistent safety banner, reset, exit, and an isolated `demo:` key.
- Made sample landmark placement work by pointer and keyboard. The packaged
  extension now has matching browser tests for capture, suggestions, guides,
  speech, appearance, storage, exact-website scope, and encrypted backup.
- Declared 12 observable claims in `.factory/claims.json`. A contract test
  requires exactly one `@claim:<id>` test for each entry.
- Added route-specific titles and metadata, canonical and social metadata,
  a product image, legal routes, focus and announcement behavior, linkable
  URLs, a real styled 404, robots, sitemap, and security headers.
- Fixed mobile and 200% text reflow, tab keyboard behavior, modal and capture
  focus management, reduced motion, and offline shell behavior.
- Preserved the ruled field-notebook identity and its existing original art.
- Updated README, demo documentation, copy audit, catalog description,
  package version, privacy, terms, and build evidence.

## Verification

From a clean clone at `/tmp/rwtr-polish2-clean.fmRVFx` of `2ba34bc`, after
only `npm ci`, every exact command in `.factory/claims.json` passed: 12/12.

Final local verification:

- `npm run check` — passed.
- `npm test` — 14/14 passed across three files.
- `npm run test:browser` — 7/7 packaged MV3 flows passed in fresh Chromium
  profiles.
- `npm run test:site` — 6/6 passed, including all-route Axe with zero
  violations, mobile reflow, focus, 404, and offline reload.
- `npm run build` — passed and produced `dist/site` plus the extension ZIP.
- `npm run test:package` — passed; ZIP 132,145 bytes with a valid MV3 manifest.
- `npm audit --omit=dev --audit-level=critical` — zero vulnerabilities.

Budgets measured from the production build:

- Largest initial site entry: 4.58 KB JavaScript.
- Site CSS: 12.28 KB; mobile hero: 73,420 bytes.
- Extension: 157.34 KB unpacked; 132,145-byte ZIP.
- Local Lighthouse mobile: Performance 99, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.2 s, LCP 1.8 s, CLS 0.008, TBT 0 ms.

## Deployment and cold production check

The work-order deploy command published deployment
`5966651b-658d-4d45-a12c-280547b954ff` through Azure Static Web Apps. The
custom domain reported ready with managed TLS.

After deployment:

- `SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims`
  passed 6/6 against the public origin.
- The factory URL verifier returned 200 with zero console errors and passed
  its title, language, h1, main, alt, and control-name checks.
- Public `/`, `/demo/`, `/?demo=1`, `/privacy/`, `/terms/`, robots, sitemap,
  and ZIP checks passed. The unknown route returned a real 404.
- Production Lighthouse mobile scored 100 in Performance, Accessibility,
  Best Practices, and SEO. FCP and LCP were 1.5 s, CLS 0.008, and TBT 0 ms.
- The public extension ZIP matched every local entry path, size, and CRC.
- Cold screenshots and machine reports are under `.factory/evidence/live/`.

## Run it

```sh
npm ci
npm run check
npm test
npm run test:browser
npm run test:site
npm run build
npm run test:package
```

To repeat the production browser suite:

```sh
SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims
```

## Known gaps and next steps

None. No review finding, failed claim, deferred minor item, stub, or TODO is
left in this work order.
