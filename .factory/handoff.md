# Round 4 repair handoff

## Outcome

All findings from reviews 1, 2, and 4 are closed. The repair is in
aa8b4f5 (fix: close round four review findings). It has been deployed as
static deployment 75305e6a-840f-41fe-9587-744d9b2108a6:

https://remote-web-task-recipes.sociobot.in/

The detailed finding-to-change-to-evidence ledger is
.factory/polish-4.md. The full demo is available at
https://remote-web-task-recipes.sociobot.in/demo/; ?demo=1 enters the same
isolated sample path.

## What changed

- Corrected guide/privacy wording and proved guide behavior with a real
  isolated-world field-read sentinel and click sentinel.
- Added observable extension network/storage proof for the retained promise
  that notebook data is not sent to us.
- Made demo exit focus the real download action and made the four-link header
  consistent and visible on phones.
- Completed deployment instructions, plain-language README cleanup, artwork
  provenance proof, all claim-manifest coverage, and verified-runtime wording.
- Preserved the field-notebook visual system, designed mobile 404, local-first
  demo storage, and packaged MV3 extension artifact.

## Verification

Code was checked from clean clone /tmp/rwtr-round4-clean.OjMCJp at aa8b4f5,
after npm ci, with Node.js 22.23.2 and npm 10.9.8.

Every exact command in .factory/claims.json was run individually and passed:

- npm run test:claims -- --grep @claim:demo-workflow
- npm run test:claims -- --grep @claim:demo-isolation
- npm run test:claims -- --grep @claim:demo-positioning
- npm run test:claims -- --grep @claim:site-private
- npm run test:browser -- --grep @claim:package-ready
- npm run test:browser -- --grep @claim:capture-and-origin-scope
- npm run test:browser -- --grep @claim:local-notebooks
- npm run test:browser -- --grep @claim:temporary-capture
- npm run test:browser -- --grep @claim:manual-suggestions
- npm run test:browser -- --grep @claim:user-control
- npm run test:browser -- --grep @claim:extension-private
- npm run test:browser -- --grep @claim:free-complete
- npm test -- -t @claim:encrypted-backup
- npm test -- -t @claim:artwork-provenance

The complete clean-clone quality run also passed:

    npm run check
    npm test                         # 15/15
    npm run test:site                # 6/6; includes Axe
    npm run test:browser             # 8/8
    npm run build
    npm run test:package
    npm audit --omit=dev --audit-level=critical  # 0 vulnerabilities

After deployment, a cold production check ran:

- verify-url.sh: HTTP 200, no browser console errors, title/lang/main/one h1
  correct, zero missing image alts, zero unnamed buttons.
- SITE_BASE_URL=https://remote-web-task-recipes.sociobot.in npm run test:claims:
  6/6, including the isolated demo, mobile layout, route focus, 404, Axe, and
  offline reload.
- The public download ZIP passed unzip -t and its extracted contents exactly
  matched the fresh local production ZIP.
- Direct live checks confirmed privacy copy, demo exit target, headers, and a
  real HTTP 404.
- Mobile live Lighthouse: Performance 100, Accessibility 100, Best Practices
  100, SEO 100; FCP 1.1 s, LCP 1.5 s, CLS 0.0036, TBT 60 ms.

Evidence lives in .factory/evidence/polish-4/, including cold home/demo/404
screenshots, verification output, and the Lighthouse report.

## Run and deploy

    npm ci
    npm run check
    npm test
    npm run test:site
    npm run test:browser
    npm run build
    npm run test:package

For release, give dist/site/ to the Param Factory static deployment job.
The factory owns deployment, DNS, and infrastructure.

## Known gaps

None.
