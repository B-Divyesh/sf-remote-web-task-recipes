# Review 5 handoff

## Outcome

This was a read-only adversarial review of deployed
`remote-web-task-recipes.sociobot.in` and commit
`066b409d527a267a9bfd39a3ccafc3b297c1f7eb`. Product code was not changed.

The review is **FAIL** with one blocking finding: on a 390 × 844 phone,
`/demo/` does not show a landmark row, the sample app, or the guide step before
scrolling. See `.factory/review-5.md` F-5-1. This reopens the mobile
first-viewport portion of review 1 B1.

## Verification performed

- Opened the live home page cold at 390 × 844 and 1440 × 960.
- Exercised live demo entry, `?demo=1`, demo storage, Reset, Start for real,
  network requests, route focus/back navigation, links, metadata, 404, and
  mobile layout.
- Created clean clone `/tmp/rwtr-review-5-clean`, ran `npm ci`, then passed:

  ```text
  npm run check
  npm test                 # 15/15
  npm run test:site        # 6/6
  npm run test:browser     # 8/8
  npm run build
  npm run test:package
  ```

- Ran all fourteen claims declared in `.factory/claims.json`; all passed.

## Next step

Revise the mobile demo layout so its initial 390 px viewport shows a named
landmark, the Northstar control/pin, and current task step together. Extend
`@claim:demo-workflow` with a true viewport-intersection assertion. Re-run the
full review after deployment.
