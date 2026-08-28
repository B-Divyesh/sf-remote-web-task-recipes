# Review 6 handoff

## Outcome

Adversarial review 6 is complete at candidate
`6ee5b3721dad3961073ae16e9a755a638267eb34`. The verdict is **FAIL** with one
blocking and two minor findings. No product code was changed.

The blocking issue is that local text detection returns recognized labels and
bounding boxes but the capture overlay uses only the number of regions. The
visitor-facing “text suggestions” promise and its test therefore do not prove
an actionable placement aid. Review 1 `R1-B2.4` and review 2 `R2-B2.5` are
reopened as F-6-1.

See `.factory/review-6.md` for the complete copy audit, claim results, prior
finding ledger, and concrete fixes.

## How to verify

From a clean clone:

```bash
npm ci
npm run check
npm test
npm run test:site
npm run test:browser
npm run build
npm run test:package
```

Run every exact command in `.factory/claims.json` separately. To repeat the
production site checks:

```bash
SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims
```

Review F-6-1 directly in `entrypoints/content.ts`: `regions.length` changes a
status string, but `rawValue` and `boundingBox` are not exposed or used. The
current `@claim:manual-suggestions` test then performs manual placement.

## Verification completed

- All 14 registered claim commands passed separately in
  `/tmp/rwtr-review6-clean`.
- Full clean-clone results: check passed; Vitest 15/15; site 6/6; browser 8/8;
  build and package verification passed.
- Production site suite passed 6/6, including live Axe, route focus, 404,
  mobile layout, privacy interception, and offline reload.
- `verify-url.sh` reported HTTP 200, a 772 ms cold load, no console errors,
  `lang=en`, one h1, main, complete image alt text, and labelled buttons.
- The live demo preserved seeded non-demo storage, used only its `demo:` key,
  reset correctly, removed that key on exit, and made no third-party request.
- Public HTML and route files match the clean build. The 132,148-byte ZIP has
  26 valid files whose contents match the clean build.

## Work left

1. Implement actionable, ephemeral, keyboard-operable detected-text choices
   and strengthen the claim test as specified in F-6-1.
2. Demote the header Download treatment so the landing screen has one primary
   action.
3. Regenerate `.factory/copy-audit.md` from current copy and keep it checked.

Development dependencies still report ten known advisories; the production
critical audit reports zero vulnerabilities.
