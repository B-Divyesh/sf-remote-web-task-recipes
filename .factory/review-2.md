# Adversarial first-read review 2

**Product:** Remote Web Task Recipes
**Reviewed:** 2026-08-28 UTC
**Candidate base:** `66b481b62441d84ded9fa833912e41891f3eb73e`
**Live URL:** <https://remote-web-task-recipes.sociobot.in/>
**Verdict:** **FAIL**

This was a read-only review. No product source was changed.

## Cold first read

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900 before
scrolling. The mobile first screen is a fully visible ruled-notebook layout;
there was no console or page error in either context.

- **What it does:** It saves named visual landmarks and then gives one task
  step at a time for repeated browser tasks.
- **For whom:** It is for people using screen readers or low vision who need
  to find the same browser controls again.
- **Click first:** **“Try it with sample data.”** The adjacent text says
  **“See a named app, three landmarks, and spoken task steps.”**

These three answers are clear from the first screen, so the first-read test is
not blocking. The design is distinct: warm ruled paper, registration pins,
technical mono headings, and notebook artwork fit the stated product rather
than a generic SaaS template.

## Findings

### B1 — Six declared claim checks cannot run from a clean clone

**Quote / evidence:** Every site-backed entry in `.factory/claims.json` uses
`npm run test:claims -- --grep @claim:<id>`. From a fresh clone at the stated
base, after `npm ci`, each of these six commands failed before Playwright
started:

- `@claim:demo-workflow`
- `@claim:demo-isolation`
- `@claim:privacy-network`
- `@claim:keyboard-placement`
- `@claim:manual-placement`
- `@claim:free-workflow`

The repeated failure is:

```
[vite:build-html] failed to resolve "extends":"./.wxt/tsconfig.json"
```

`tsconfig.json` depends on `.wxt/tsconfig.json`, but `test:claims` runs the
site build without first running `wxt prepare`. The same clean-clone condition
also prevents the advertised `npm run build` from starting its site build.

**Why this is blocking:** The visitor is asked to rely on demo isolation,
privacy, keyboard behavior, and no-account access. The declared proof commands
do not run in the required clean environment, so none of those claims is
verified as shipped.

**Concrete fix:** Make each site build/test command self-sufficient. For
example, make `test:claims`, `test:site`, and the site portion of `build` run
`npm run prepare:wxt` before Vite, or remove the WXT-generated tsconfig
dependency from the static-site build. In a new clean clone, run every exact
command recorded in `claims.json`; require all nine to pass in CI.

### B2 — Several visitor-facing claims have no matching observable claim test

**Quote / evidence:** The landing says **“Data stays in your browser,”**
**“Screenshots are temporary during placement,”** and **“No analytics, ads, or
remote control.”** README makes the corresponding promises, including
**“It does not read passwords or page text.”** The closest declared tests prove
only a local demo key, sample-app non-clicking, or same-origin requests in the
demo. They do not observe the extension storage/capture flow described by the
copy.

The following claim-like copy has no entry whose stated test proves the quoted
promise. Repeated wording is grouped, but every quoted sentence/unit is listed.

| Locations | Quote | Why it is unlisted or unproven | Concrete fix |
| --- | --- | --- | --- |
| Landing L13, L24–L25, L38; README R38 | “Data stays in your browser.” / “Your landmarks stay in your browser.” / “Notebooks are stored in extension local storage.” / “Remote Web Task Recipes stores landmarks and task steps in your browser.” / “Notebook data stays in extension local storage.” | `privacy-network` only observes demo network requests. | Add a fresh-profile extension test that completes capture/guide/export and asserts only the intended extension-storage keys change; or reduce the copy to the demo-only fact. |
| Landing L26; README R34–R35 | “Screenshots are temporary during placement.” / “A screenshot appears only during landmark placement.” / “It is not kept in a notebook.” | No claim entry asserts that image data is absent after closing/cancelling. | Add `@claim:temporary-capture`: inspect storage and extension state before, during, and after cancel/commit; intercept requests throughout. |
| Landing L29; README R41 | “No analytics, ads, or remote control.” / “There are no accounts, payment flows, analytics, advertising, or remote APIs.” | A request test limited to the sample page does not prove the extension’s runtime behavior or the account/payment statement. | Test the packaged extension plus demo with request interception and assert a same-origin/local allowlist; assert no auth/checkout UI or request. |
| README R32–R33 | “The extension does not automate the website.” / “It does not read passwords or page text.” | `demo-workflow` observes only the fake sample button; no test observes a real content-script capture/guide session or DOM reads. | Add a two-origin extension test with password/text sentinels and target click listeners; assert neither is read, sent, nor clicked. |
| README R36; landing L27 | “Your browser may offer a local text suggestion.” / “Your browser may suggest visible text; manual placement always works.” | The `manual-placement` test only clicks a demo button and checks a status string. It neither disables a suggestion nor adds a manually placed landmark. | Add supported and unsupported suggestion fixtures; place a landmark manually in both and assert the saved landmark. |
| Landing L31; README R29–R30 | “Landmarks use screen coordinates. Recheck them after a browser app, display scale, or window layout changes.” / “Landmarks use screen coordinates.” / “Recheck them after layout, scale, or app changes.” | No claim declares the coordinate behavior or the recheck limitation. | Either add an observable coordinate/resize test, or make this a clearly labelled caution without implying detection. |
| Landing L33–L34; README R41 | “Use every feature without an account.” / “Landmarks, task guidance, speech, and encrypted backups are included in the extension download.” | `free-workflow` advances one sample step and only looks for email/password/checkout selectors. It does not exercise all listed features. | Exercise each listed extension feature in a fresh profile and assert no account/payment path; otherwise say only “The sample needs no account.” |
| README R17–R18 | “Alt+Shift+R opens its quick launcher.” / “The package is unsigned until it is published in a browser store.” | No claim entry tests either installation/runtime statement. | Add a fresh-MV3 shortcut test and a packaging/manifest test, or remove these release assertions from visitor copy. |
| README R42 | “Every testable statement is listed in .factory/claims.json.” | The rows above contradict this statement. | List and test the missing claims, then retain this sentence; otherwise delete it. |

**Why this is blocking:** These are privacy and control boundaries for an
accessibility tool used over real browser work. They must be demonstrable, not
inferred from a mock screen.

## Demo and sandbox verification

**PASS, as observed live:** `/demo/` immediately showed the named fictional
**Northstar Payroll** app, three numbered landmarks, and **“Step 1 of 3.”** The
persistent banner read **“Demo — sample data, nothing is saved”** and included
**Reset demo** and **Start for real**.

In a fresh browser context, `/?demo=1` redirected to `/demo/`. After advancing
the guide, local storage contained only `demo:remote-web-task-recipes`; Reset
showed **“Sample notebook reset.”**; Start for real returned to `/` and removed
that key. Network interception across entry, advance, reset, and exit recorded
no third-party requests. The live demo behavior is therefore isolated from the
site’s normal local storage namespace as far as a browser page can observe.

This does not clear B1/B2: the declared clean-clone proof is still broken, and
the page sandbox cannot by itself prove the extension’s storage/capture claims.

## Structure, metadata, and routing

| Check | Result |
| --- | --- |
| Landing title, language, one h1, main, description, canonical, OG/Twitter, favicon | PASS on `/`. Title is `Remote Web Task Recipes — save task landmarks`. |
| Demo title and direct route | PASS: `Demo — Remote Web Task Recipes`; `/demo/` returns 200 and the sample UI. |
| Privacy and Terms titles/canonical/description/OG/favicon | PASS, except each supplies only `twitter:card`, not a Twitter title or description. |
| Designed unknown route | PASS: `/not-a-real-route` returns HTTP 404 with **“This page does not exist.”** and a home link. |
| robots and sitemap | PASS: both return 200; sitemap lists `/`, `/demo/`, `/privacy/`, and `/terms/`. |
| Landing internal links | PASS: Demo, Privacy, Terms, and the extension ZIP returned 200; the on-page anchor is valid. |
| Header/footer links | PASS for usable links; the navigation labels vary by route but each route exposes the required legal links in its footer. |
| Back/route focus | FINDING: ordinary navigation leaves browser focus on `body`; landing, privacy, and terms h1 elements are not focus targets and have no route-change focus handling. |

### M1 — Legal and 404 metadata are incomplete; navigation does not move focus to the new h1

**Quote / evidence:** Privacy and Terms contain only
`<meta name="twitter:card" content="summary_large_image">`; `404.html` has no
description, canonical, OG/Twitter metadata, or apple-touch icon. Normal-page
h1 elements have no `tabindex`, and the static navigation has no focus/announce
handling.

**Why a first-time visitor is lost or misled:** Shared legal/404 links have
incomplete previews. A keyboard or screen-reader user following a header link
is left at the document body instead of the new page headline.

**Concrete fix:** Add title, description, canonical, OG title/description/image,
Twitter title/description/image, and apple-touch icon to every route including
404. On navigation, focus the destination h1 (and announce it); for the current
MPA design this can be a small load script plus `tabindex="-1"` on each h1.

## Copy audit

Method: visible landing and README prose, headings, labels, actions, and command
descriptions were counted. Markdown destinations and fenced command lines are
represented by their visible command text. Hyphenated words count as one. No
unit exceeds the 22-word hard cap.

### Copy flags

| ID | Check | Quote | Proposed rewrite |
| --- | --- | --- | --- |
| L23 | Heading is vague out of context. | “Private by design” | “What stays on your device” |
| L25, R38 | Technical storage term without an immediate plain equivalent. | “extension local storage” | “storage inside your browser extension” |
| R17 | “quick launcher” is not defined for a new installer. | “Alt+Shift+R opens its quick launcher.” | “Press Alt+Shift+R to open the extension’s shortcut menu.” |
| R19 | Heading makes no sense when read alone. | “Use it” | “Use Remote Web Task Recipes” |
| R39 | Technical web term; terminology changes between “website” and “origin.” | “Notebooks match an exact website origin.” | “Each notebook works only on the website where you created it.” |
| R54 | Unexplained implementation acronym. | “loadable MV3 extension” | “loadable Chrome extension (Manifest V3)” |

All landing buttons name a result or action: **“Try it with sample data”** and
**“Download extension.”** Terminology is otherwise mostly consistent:
**notebook** = container, **landmark** = saved location, **task step** = guide
instruction. The README’s use of both “website” and “origin” is the exception.

### Landing copy

| ID | Words | Copy |
| --- | ---: | --- |
| L01 | 4 | Remote Web Task Recipes |
| L02 | 1 | Demo |
| L03 | 3 | How it works |
| L04 | 1 | Privacy |
| L05 | 2 | Download extension |
| L06 | 7 | For repeated tasks in hard-to-use browser software |
| L07 | 6 | Save landmarks for repeated browser tasks. |
| L08 | 16 | For people using screen readers or low vision who need to find the same controls again. |
| L09 | 5 | Try it with sample data |
| L10 | 10 | See a named app, three landmarks, and spoken task steps. |
| L11 | 2 | Free extension |
| L12 | 2 | No account |
| L13 | 5 | Data stays in your browser |
| L14 | 4 | How to save landmarks |
| L15 | 7 | Save landmarks once. Follow task steps later. |
| L16 | 3 | Name the website |
| L17 | 10 | A notebook holds landmarks and task steps for one website. |
| L18 | 2 | Place landmarks |
| L19 | 14 | Choose placement, then use a pointer or arrow keys to mark a visible control. |
| L20 | 3 | Follow task steps |
| L21 | 12 | Open the guide to read or hear one step at a time. |
| L22 | 5 | It never clicks for you. |
| L23 | 3 | Private by design |
| L24 | 6 | Your landmarks stay in your browser. |
| L25 | 7 | Notebooks are stored in extension local storage. |
| L26 | 5 | Screenshots are temporary during placement. |
| L27 | 10 | Your browser may suggest visible text; manual placement always works. |
| L28 | 6 | Backups are encrypted with your passphrase. |
| L29 | 6 | No analytics, ads, or remote control. |
| L30 | 4 | When to recheck landmarks |
| L31 | 16 | Landmarks use screen coordinates. Recheck them after a browser app, display scale, or window layout changes. |
| L32 | 6 | Everything in the notebook is free |
| L33 | 6 | Use every feature without an account. |
| L34 | 13 | Landmarks, task guidance, speech, and encrypted backups are included in the extension download. |
| L35 | 2 | Free download |
| L36 | 14 | Install the package in Chrome or Chromium, then create a notebook for your website. |
| L37 | 2 | Download extension |
| L38 | 12 | Remote Web Task Recipes stores landmarks and task steps in your browser. |
| L39 | 1 | Terms |
| L40 | 4 | Built by Param Factory |
| L41 | 8 | Original AI-assisted project artwork, reviewed by the maker. |

### README copy

| ID | Words | Copy |
| --- | ---: | --- |
| R01 | 4 | Remote Web Task Recipes |
| R02 | 6 | Save landmarks for repeated browser tasks. |
| R03 | 17 | Remote Web Task Recipes is for people using screen readers or low vision in hard-to-use browser software. |
| R04 | 13 | A user or support worker can save visual landmarks and spoken task steps. |
| R05 | 8 | The guide replays one step at a time. |
| R06 | 6 | Try the isolated sample first: `https://remote-web-task-recipes.sociobot.in/demo/`. |
| R07 | 4 | What the words mean |
| R08 | 10 | A notebook holds landmarks and task steps for one website. |
| R09 | 7 | A landmark is a saved visible location. |
| R10 | 9 | A task step is one instruction in a guide. |
| R11 | 3 | Install the extension |
| R12 | 4 | Download and extract remote-web-task-recipes.zip. |
| R13 | 6 | Open chrome://extensions in Chrome or Chromium. |
| R14 | 4 | Turn on Developer mode. |
| R15 | 8 | Choose Load unpacked and select the extracted folder. |
| R16 | 3 | Pin the extension. |
| R17 | 5 | Alt+Shift+R opens its quick launcher. |
| R18 | 12 | The package is unsigned until it is published in a browser store. |
| R19 | 2 | Use it |
| R20 | 10 | Create a notebook for the website you need to revisit. |
| R21 | 8 | Name a landmark and choose Place on app. |
| R22 | 9 | Point and click, or use Arrow keys and Enter. |
| R23 | 5 | Press Escape to cancel placement. |
| R24 | 12 | Add task steps and connect a step to a landmark if useful. |
| R25 | 9 | Start the guide from the editor or quick launcher. |
| R26 | 7 | Use Previous, Next step, or Speak step. |
| R27 | 4 | Escape closes the guide. |
| R28 | 7 | Export an encrypted backup from Backup & appearance. |
| R29 | 4 | Landmarks use screen coordinates. |
| R30 | 8 | Recheck them after layout, scale, or app changes. |
| R31 | 3 | Privacy and limits |
| R32 | 7 | The extension does not automate the website. |
| R33 | 8 | It does not read passwords or page text. |
| R34 | 7 | A screenshot appears only during landmark placement. |
| R35 | 7 | It is not kept in a notebook. |
| R36 | 8 | Your browser may offer a local text suggestion. |
| R37 | 5 | Manual placement is always available. |
| R38 | 7 | Notebook data stays in extension local storage. |
| R39 | 6 | Notebooks match an exact website origin. |
| R40 | 9 | Encrypted backups need the passphrase used to create them. |
| R41 | 11 | There are no accounts, payment flows, analytics, advertising, or remote APIs. |
| R42 | 7 | Every testable statement is listed in .factory/claims.json. |
| R43 | 6 | Read the privacy policy and terms. |
| R44 | 4 | Develop, test, and build |
| R45 | 5 | Requires Node.js 20+ and npm. |
| R46 | 2 | npm ci |
| R47 | 3 | npm run check |
| R48 | 2 | npm test |
| R49 | 3 | npm run test:site |
| R50 | 3 | npm run test:browser |
| R51 | 3 | npm run build |
| R52 | 3 | npm run test:package |
| R53 | 12 | npm run build:site writes the static site and extension ZIP to dist/site/. |
| R54 | 10 | npm run build:extension writes the loadable MV3 extension to .output/chrome-mv3/. |
| R55 | 10 | `npm run test:claims -- --grep @claim:<id>` runs one declared claim test. |
| R56 | 2 | Project records |
| R57 | 2 | Opportunity brief |
| R58 | 5 | Visual system and artwork provenance |
| R59 | 2 | Demo sandbox |
| R60 | 2 | Repair handoff |
| R61 | 1 | License |
| R62 | 1 | MIT. |
| R63 | 2 | See LICENSE. |

## Claim-test evidence from the clean clone

| Claims entry | Exact recorded command | Result |
| --- | --- | --- |
| demo-workflow | `npm run test:claims -- --grep @claim:demo-workflow` | FAIL before test (B1) |
| demo-isolation | `npm run test:claims -- --grep @claim:demo-isolation` | FAIL before test (B1) |
| privacy-network | `npm run test:claims -- --grep @claim:privacy-network` | FAIL before test (B1) |
| keyboard-placement | `npm run test:claims -- --grep @claim:keyboard-placement` | FAIL before test (B1) |
| manual-placement | `npm run test:claims -- --grep @claim:manual-placement` | FAIL before test (B1) |
| free-workflow | `npm run test:claims -- --grep @claim:free-workflow` | FAIL before test (B1) |
| origin-scoped | `npm test -- -t @claim:origin-scoped` | PASS: 1 targeted test |
| encrypted-backup | `npm test -- -t @claim:encrypted-backup` | PASS: 1 targeted test |
| capture-and-origin-scope | `npm run test:browser -- --grep @claim:capture-and-origin-scope` | PASS: 1 targeted Playwright MV3 test |

## Final verdict

**FAIL.** The first screen, one-click demo, demo isolation observed in the
browser, distinct visual identity, route availability, and most copy clarity
pass review. Acceptance is blocked by B1: six declared claim checks fail from a
clean clone. B2 remains blocking until the product’s privacy, storage, capture,
and “all features free” promises each have a matching observable test. M1 and
the copy flags should then be corrected and rechecked.
