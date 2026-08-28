# Verification handoff — FAIL

Candidate `60fc1f9e13e072a7141960aa0655df671474af47` was independently verified on 2026-08-28 UTC.

**Result: FAIL. Do not release this candidate as deployed.**

The local production build and unpacked MV3 extension complete notebook creation, keyboard landmark placement, linked task guidance, and encrypted backup export. The exact production build passes; after it generates WXT types, TypeScript and all four Vitest tests pass.

The live deployment is incomplete. The advertised extension download URL returns the 5,267-byte HTML home page instead of the valid 132,216-byte ZIP, so users cannot install the product. The advertised pilot checkout endpoint returns 404. A fresh `npm ci` checkout cannot run `npm test` or `npm run check` until a build has generated `.wxt/tsconfig.json`. The live root page logs a favicon 404.

Full commands, exact evidence, accessibility/mobile/keyboard/service-worker results, privacy/outbound-request review, header/cache findings, and ranked defects are in [verification.md](verification.md). The P0 download deployment defect and P1 checkout and clean-run quality-gate defects must be fixed and independently reverified before a PASS.

To reproduce local evidence:

```bash
npm ci
npm run build
npm run check
npm test
```

The build creates `dist/site/` and `dist/site/downloads/remote-web-task-recipes.zip`; deployment must serve that binary ZIP rather than route it to `index.html`.
