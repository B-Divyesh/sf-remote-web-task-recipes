# Review 1 handoff

## What was done

Completed the requested read-only adversarial first-read review of the live site
and a clean clone at base commit `91bdeb0cc49c16a4cc646744b089536399799f36`.
The complete report, including every requested landing-page and README copy word
count, is in `.factory/review-1.md`.

Only this handoff and `.factory/review-1.md` were changed. Product code and
configuration were not modified.

## How verified

- Fresh Playwright Chromium contexts at 390 x 844 and 1440 x 960; no console
  errors and no mobile horizontal overflow.
- Direct checks of `/`, `/?demo=1`, `/demo`, `/privacy/`, `/terms/`, and an
  unknown route; link and ZIP-download checks.
- Axe WCAG 2 A/AA scans of landing, Privacy, and Terms: no violations.
- Fresh clone in `/tmp/rwtr-clean`: `npm ci`, `npm test`, `npm run build`,
  `npm run test:package`, and `npm run test:browser` all passed.
- Required claim-test execution could not occur because `.factory/claims.json`
  and `@claim:` tests are absent.

## Known gaps / next steps

The review verdict is **FAIL**. Priority repairs are a one-click isolated
`/demo` with realistic sample data and reset controls, a claims manifest plus
tagged demo-based tests, and a real HTTP 404 route. Then repair metadata,
robots/sitemap, footer consistency, and the plain-language copy identified in
the report.
