# Verification handoff — PASS

**Work order:** `remote-web-task-recipes-verify-3`
**Tested candidate:** `547da0a2ce5b10622379a7a7bc8da2f108a005d4`
**Live URL:** <https://remote-web-task-recipes.sociobot.in>
**Report:** `.factory/verification-3.md`

## Result

**PASS.** Fresh clean-checkout verification confirms the live static site and downloadable MV3 extension match the candidate content. The prior deployment-only failure and exact-origin/modal regressions do not reproduce.

## How verified

```bash
npm ci
npm run check
npm test
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npm run test:browser
npm run build
npm run test:package
npm audit --omit=dev --audit-level=critical
```

All passed: 11/11 Vitest, 2/2 real-MV3 Playwright, exact production build and consumer ZIP validation, and zero production audit findings. Independent Chromium exercised notebook creation, deliberate keyboard placement, linked task guidance, invalid-passphrase recovery, encrypted export, exact-origin look-alike rejection, desktop/mobile layout, focus/modal behavior, Axe, offline reload, response headers, outbound-request policy, and bundle budgets.

The live ZIP is `200 application/zip`, 131,630 bytes, immutable, unzip-valid, and has identical uncompressed entry hashes to the fresh candidate package. Live home/privacy/terms and assets match the candidate build; outer ZIP bytes may differ due to regenerated timestamp metadata only.

## Known follow-up

- P3 only: `npm ci` reports 10 development-toolchain advisories; production audit is clean. No product-code changes were made in this verification.
- The extension remains honestly all-free because no Sociobot billing product is registered. Do not add a checkout until the factory registers it and a complete return-license flow can be tested.

## Deploy build

```bash
npm run build:site
```

This produces `dist/site/`, including `downloads/remote-web-task-recipes.zip`, for factory deployment.
