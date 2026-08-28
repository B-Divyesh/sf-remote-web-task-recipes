# Review handoff — adversarial first-read review 4

## Outcome

Completed a read-only review of candidate
`8ede76a6dff09760c15e273b91bfcdd1a2d3a0d7` and the live deployment. The verdict
is **FAIL**. Product code was not modified.

The full report is `.factory/review-4.md`. It records one blocking half-fixed
privacy claim (`F-4-1`) and nine additional major/minor findings.

## What was verified

- Cold first screens at 390 × 844 and 1440 × 900.
- One-click demo, realistic sample, reset, exit, storage isolation, preservation
  of seeded non-demo data, no third-party requests, and offline demo reload.
- Every exact command in `.factory/claims.json` from a fresh clone after
  `npm ci`: 12/12 passed.
- Full live site suite: 6/6 passed, including Axe, metadata, route focus, mobile
  reflow, 404, network interception, and offline reload.
- `npm run check`, `npm test` (14/14), `npm run build`, and
  `npm run test:package` passed in the fresh clone.
- Every internal live link returned 200; unknown routes returned the designed
  404; security headers, robots, sitemap, metadata, and social assets passed.
- The public 132,145-byte ZIP passed `unzip -t`; all 26 entries matched the
  fresh local package by name and content.
- All findings in reviews 1 and 2, `polish-2.md`, and the prior handoff were
  rechecked against live behavior and source.

## Reproduce

```sh
npm ci
npm run check
npm test
npm run test:browser
npm run build
npm run test:package
SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims
```

Run each exact command in `.factory/claims.json` separately for the acceptance
record.

## Work left

Resolve F-4-1 through F-4-10 in `.factory/review-4.md`. The blocking item is the
overbroad “does not read page text” wording and its insufficient read-detection
test. The remaining work covers an unlisted privacy claim, the broken phone
continuation from **Start for real**, header consistency,
deployment documentation, two jargon phrases, one ambiguous button label,
artwork-claim scope, and claims-manifest completeness.
Node 20 compatibility also needs a recorded run or narrower documentation.
