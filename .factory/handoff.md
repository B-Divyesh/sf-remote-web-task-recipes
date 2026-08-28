# Review handoff — adversarial first-read review 2

## Done

- Performed a read-only cold review of the live site at 390 × 844 and desktop.
- Exercised the live demo from `?demo=1`, including guide advance, Reset demo,
  Start for real, local-storage inspection, and third-party request
  interception.
- Inspected site routes, metadata, 404, robots, sitemap, internal links, and
  repository claims/copy.
- Created `.factory/review-2.md` with the full copy audit and verdict.

## Verification

From a fresh local clone at `66b481b62441d84ded9fa833912e41891f3eb73e` after
`npm ci`, ran every command declared by `.factory/claims.json`.

- Passed: `@claim:origin-scoped`, `@claim:encrypted-backup`, and
  `@claim:capture-and-origin-scope`.
- Failed before execution: the six `test:claims` entries. Vite cannot resolve
  `./.wxt/tsconfig.json` because the command does not run `wxt prepare`.

The live demo uses only `demo:remote-web-task-recipes` in page local storage;
Reset restores sample state, Start for real removes it, and the observed flow
made no third-party requests.

## Left

The review verdict is **FAIL**. Repair the clean-clone claim command and add
observable tests for the unlisted privacy/storage/capture/free-workflow claims
identified in `.factory/review-2.md`. No product code was modified by this
review.
