# Adversarial first-read review 1

**Product:** Remote Web Task Recipes  
**Reviewed:** 2026-08-28  
**Live URL:** https://remote-web-task-recipes.sociobot.in  
**Verdict:** **FAIL**

Three blocking failures prevent acceptance: no sample-data demo, no claims
manifest or claim tests, and no real 404 route. This report is a read-only
review; no product code was changed.

## Cold first read

Fresh Chromium contexts were used at 390 x 844 and 1440 x 960. Before scrolling:

- **What:** I can infer that the extension records visual landmarks and task
  steps, then overlays a one-step guide on a browser app.
- **For whom:** I can infer that it is for screen-reader users, or their support
  workers, repeating work in browser-delivered remote or legacy software.
- **Click first:** The visible action is **“Download v1 for Chrome.”** It
  downloads a ZIP; it does not demonstrate the product or state an immediate
  outcome.

The three answers are inferable, so first-screen identification is not a
separate blocker. The required try-first action is absent, however: a visitor
must manually load an unsigned extension before seeing a landmark, task, or
guide. The exact first-screen wording is “**Download v1 for Chrome**” and
“**Manual install package**.”

At 390 px, the hero is 1,104 px high, so the artwork starts below the 844 px
viewport. No mobile horizontal overflow or console errors occurred at either
viewport. The warm ruled-paper and registration-pin identity is distinctive and
does not look like a generic SaaS template.

## Findings, ordered by severity

### B1 — No one-click sample-data demo exists

**Evidence / quote:** There is no “Try it with sample data” action. The only
primary action is “Download v1 for Chrome.” Fresh `/?demo=1` had the ordinary
landing title, no demo banner, no sample-data text, no “Reset demo,” no “Start
for real,” and empty `localStorage`. Fresh `/demo` returned the same landing
page and title.

**Why a visitor is lost or misled:** The visitor must download and manually load
an unsigned ZIP before seeing whether the workflow helps. There is no sample
state whose privacy or storage isolation can be checked.

**Concrete fix:** Put **“Try it with sample data”** on the first screen and make
both `/demo` and `?demo=1` enter it. Its first screen must show a realistic
named browser app, three numbered landmarks, and a task with spoken steps. Keep
the persistent banner **“Demo — sample data, nothing is saved”** plus **“Reset
demo”** and **“Start for real.”** Use only a `demo:` storage namespace and
discard it when leaving. Add `.factory/demo.md` documenting URL, data, reset,
and namespace. Also give this extension an in-page playground or self-hosted
walkthrough so the workflow is visible before installation.

### B2 — Claims manifest and observable claim tests are missing

**Evidence / quote:** `.factory/claims.json` does not exist, and a clean-clone
search found no `@claim:` tags. There were therefore zero declared claim tests
to run. The landing and README nevertheless make claims such as “**Screenshots
are temporary and never uploaded.**” and “**All recipe data remains in extension
local storage.**”

**Why a visitor is lost or misled:** Privacy, encryption, keyboard, OCR, and
non-automation promises are decisive here. Without manifest entries and
observable demo tests, they cannot be confirmed from a clean state. Network
interception cannot cover the product flow because B1 provides no demo flow.

**Concrete fix:** Add `.factory/claims.json`; give every row below a unique
`@claim:<id>` test starting from fresh demo state. Intercept all requests through
the complete demo flow for privacy claims and permit only an explicit same-origin
allowlist. Delete claims that cannot be observed. Each row below is an
independent unlisted-claim finding; duplicates are combined only when they make
the same promise.

| Locations | Unlisted claim | Required observable result |
| --- | --- | --- |
| Landing lead; README R02–R03 | The extension creates landmarks/steps and replays a guide. | Demo creates a named landmark/task and shows the guide step at its pin. |
| Landing L16/L32; README R04/R48 | It neither collects DOM text/credentials nor automates clicks. | Capture/guide storage and request test; guide never clicks the target app. |
| Landing L18; README R08/R29–R31 | A deliberate action freezes the tab and supports pointer/keyboard placement and Escape. | Demo capture lifecycle test asserts trigger, keyboard commit, and cancellation. |
| Landing L19/L27; README R10 | Browser-local OCR helps where available; manual placement remains available. | Mock supported/unsupported detector paths; assert local hint/discard and manual control. |
| Landing L22; README R11/R33–R35 | The guide shows or speaks one step at a time without acting for the user. | Keyboard guide test advances named steps and asserts no target-app click. |
| Landing L25; README R07/R16 | Data is local and scoped to a website origin. | Two-origin demo test; assert only `demo:` storage changes and no cross-origin recipes. |
| Landing L26; README R17 | Screenshots are temporary and never uploaded or saved. | Capture then close; assert no persisted pixels and only allowed requests. |
| Landing L28; README R12/R36 | Backup is AES-256-GCM encrypted with the passphrase. | Export, inspect encrypted envelope, and import only with the correct passphrase. |
| Landing L29; README R49 | No analytics, ads, telemetry, CDN, or remote API calls occur. | Intercept every request through the demo and assert only allowed same-origin assets. |
| Landing L31; README R37–R38 | Pins suit stable layouts and need rechecking after changes. | Test actual warning/detection behavior, or reduce to a non-reliability caution. |
| Landing L34–L36; README R13–R15 | All listed features are free; no auth, checkout, subscription, or locked workflow. | Complete every listed demo workflow without auth/payment request. |
| Landing L38; README R20–R25 | Package installation and launcher work as described. | Fresh-profile consumer-package/manual smoke test. |
| README R09 | Arrow and Shift+Arrow provide keyboard positioning. | Demo test asserts small and large coordinate movements. |
| README R45–R47 | The permission/content-script behavior is limited as described. | Manifest/integration test verifies explicit activation and no DOM-text transfer. |

### B3 — Unknown routes silently return the landing page

**Evidence / quote:** `GET /not-a-real-route` returned HTTP **200** and the
ordinary landing `<h1>Mark the places your screen reader cannot see.</h1>`.
`staticwebapp.config.json` rewrites unmatched navigation to `index.html`; there
is no 404 page. `/demo` is caught by this same fallback.

**Why a visitor is lost or misled:** A pasted or broken link looks successful but
becomes an unrelated download page. It also hides the missing demo route.

**Concrete fix:** Ship a product-styled 404 returning HTTP 404 with “This page
does not exist” as its h1 and a Home link. Only fall back for known client routes,
or implement routing that distinguishes `/demo` and unknown paths. Add browser
tests for direct `/demo`, reload, back, focus, and unknown-route status/title.

### M1 — Required route metadata and footer structure are incomplete

**Evidence / quote:** `/`, `/privacy/`, and `/terms/` each have `lang`, one h1,
and main; axe WCAG 2 A/AA found no violations. All lack canonical, Open Graph,
Twitter, and Apple touch metadata. `robots.txt` and `sitemap.xml` return 404.
The landing title, “**Remote Web Task Recipes — your private accessibility field
notebook**,” exceeds 60 characters and is not a plain description of the job.
Legal footers omit one of Privacy/Terms and omit Param Factory/build identity.

**Why it matters:** Shared links, search, and route identity are incomplete, and
the prescribed footer is inconsistent.

**Concrete fix:** Set a per-route plain-language title, canonical, description,
OG/Twitter title/description/1200x630 original image, favicon plus 180 px Apple
icon, robots, and sitemap. Use consistent footers with Privacy, Terms, “Built by
Param Factory,” and build/version id. A suitable landing title is `Remote Web
Task Recipes — save task landmarks`.

### M2 — Copy has jargon, decontextualized headings, vague language, and two overlong README sentences

**Evidence / quote:** “**A field notebook for opaque software**,” “**Observe
once. Follow it next time.**,” and “**Your map belongs to you.**” do not name the
task in isolation. “**site origin**,” “**browser-local OCR**,” “**TextDetector**,”
and “**AES-256-GCM**” are unexplained. README R03 is 23 words; R42 is 27 words.

**Why it matters:** A quick accessibility/privacy decision should not require
interpreting metaphors or implementation terms.

**Concrete fix:** Use the rewrites below, and use **notebook** (container),
**landmark** (saved location), and **task step** (instruction) consistently.

| Existing text | Check | Proposed rewrite |
| --- | --- | --- |
| A field notebook for opaque software | “Opaque” and the metaphor are unexplained. | For repeated tasks in hard-to-use browser software |
| Observe once. Follow it next time. | Headings name neither object nor result. | Save landmarks once. Follow task steps later. |
| Make a notebook tied only to the app’s site origin. | Developer jargon. | Make one notebook for each website. |
| Browser-local OCR helps only when available. | Unexplained acronym. | Your browser may suggest visible text; you can always place a landmark yourself. |
| Your map belongs to you. | “Map” introduces a new metaphor. | Your landmarks stay in your browser. |
| Built for the whole workflow | Vague heading. | Everything in the notebook is free |
| See the three-step method | Link does not name its destination/result. | See how to save landmarks |
| README R03 | 23 words; two actions. | A user or support worker can save visual landmarks and spoken instructions. The guide replays one step at a time. |
| README R42 | 27 words; implementation paths. | `npm run build` writes the site, extension, and download ZIP. See the build output for paths. |

### M3 — Terms are not consistently literal

**Evidence / quote:** User-facing copy alternates between **recipe**,
**notebook**, **map**, **landmark**, **pin**, **coordinate**, **spoken cue**,
**task step**, and **guide**. Some can be different objects, but the landing does
not define the relation. The privacy heading calls the data a “map”; README calls
the container a notebook; feature copy calls the visual object a pin.

**Why it matters:** A screen-reader user cannot know whether these are separate
objects, aliases, or required steps.

**Concrete fix:** Add: “A notebook holds landmarks and task steps for one
website.” Use **landmark** for the location, **task step** for the instruction,
and **notebook** for the container; remove map/recipe/pin/cue as data synonyms.

## Demo, privacy, and sandbox result

Demo verification **failed**: no entry point, sample, banner, reset, start-real
action, or storage namespace exists. Therefore real-storage isolation and
privacy/offline behavior cannot be exercised in the required demo flow. The
landing itself requested only same-origin resources, but that is not evidence for
extension capture, OCR, guide, export, or storage behavior.

## Structure and accessibility checks

| Check | Result |
| --- | --- |
| Fresh 390 px and desktop load | PASS: no console errors; no 390 px horizontal overflow. |
| One h1 / `lang` / `main` | PASS on landing, Privacy, and Terms. |
| Axe WCAG 2 A/AA static-page scan | PASS: no violations on landing, Privacy, or Terms. |
| `/?demo=1` and `/demo` | FAIL: ordinary landing rather than demo. |
| Unknown route | FAIL: HTTP 200 landing rather than designed 404. |
| Internal links | PASS for `/privacy/`, `/terms/`, and ZIP; ZIP was HTTP 200 and downloaded as `remote-web-task-recipes.zip`. |
| Footer / metadata / robots / sitemap | FAIL as described in M1. |
| Visual identity | PASS: follows the stated notebook direction and is distinct. |

## Clean-clone verification and claims evidence

Clean clone: `/tmp/rwtr-clean`, from commit
`91bdeb0cc49c16a4cc646744b089536399799f36` before this review commit.

| Command | Result |
| --- | --- |
| `npm ci` | PASS; npm reported 10 dependency advisories (1 low, 2 moderate, 4 high, 3 critical). |
| `npm test` | PASS: 11 tests in 3 files. |
| `npm run build` | PASS: site, MV3 extension, and ZIP built. |
| `npm run test:package` | PASS: consumer ZIP verified at 131,630 bytes. |
| `npm run test:browser` | PASS: 2 extension-browser tests. |
| Every claims.json test | NOT RUN: required file and tagged tests do not exist (B2). |

## Copy audit method

The tables below list every visible prose unit on the landing page and every
README prose sentence, heading, and instruction. Code blocks, URL destinations,
and command lines are excluded because they are not sentences. Hyphenated and
apostrophe words count as one word. B2 records all claim-like copy; M2 records
the word/jargon/heading/button flags and proposed rewrites.

### Landing page copy

| ID | Words | Copy |
| --- | ---: | --- |
| L01 | 6 | A field notebook for opaque software |
| L02 | 8 | Mark the places your screen reader cannot see. |
| L03 | 11 | Create private visual landmarks for a browser-delivered remote or legacy app. |
| L04 | 12 | Attach concise steps, then bring the guide back whenever the task repeats. |
| L05 | 4 | Download v1 for Chrome |
| L06 | 4 | See the three-step method |
| L07 | 2 | Free extension |
| L08 | 3 | Chrome/Chromium MV3 |
| L09 | 3 | Manual install package |
| L10 | 2 | No account |
| L11 | 3 | The repeatable method |
| L12 | 2 | Observe once. |
| L13 | 4 | Follow it next time. |
| L14 | 3 | Name the app |
| L15 | 10 | Make a notebook tied only to the app’s site origin. |
| L16 | 7 | No page text or credentials are collected. |
| L17 | 2 | Place landmarks |
| L18 | 16 | After a deliberate click, freeze the visible tab and place pins by pointer or arrow keys. |
| L19 | 6 | Browser-local OCR helps only when available. |
| L20 | 3 | Write and follow |
| L21 | 7 | Attach each concise instruction to a pin. |
| L22 | 15 | The overlay can show or speak one step at a time without clicking for you. |
| L23 | 3 | Private by construction |
| L24 | 5 | Your map belongs to you. |
| L25 | 6 | Recipes live in local extension storage. |
| L26 | 6 | Screenshots are temporary and never uploaded. |
| L27 | 8 | OCR uses the browser’s on-device detector when available. |
| L28 | 6 | Exports use AES-256-GCM with your passphrase. |
| L29 | 7 | No analytics, ads, telemetry, or remote control. |
| L30 | 3 | An honest boundary |
| L31 | 11 | Coordinate landmarks work best when the remote app’s layout stays stable. |
| L32 | 17 | They do not create accessibility metadata, automate clicks, read credentials, or promise compatibility with every remote desktop. |
| L33 | 5 | Built for the whole workflow |
| L34 | 5 | Every accessibility feature is included. |
| L35 | 14 | Landmarks, task guidance, optional speech, and encrypted backups are all available in the download. |
| L36 | 9 | There is no account, checkout, subscription, or locked workflow. |
| L37 | 2 | Free download |
| L38 | 12 | Install the local extension package, then keep your notebook in your browser. |
| L39 | 2 | Download extension |
| L40 | 1 | Privacy |
| L41 | 1 | Terms |
| L42 | 8 | Original AI-assisted project artwork, reviewed by the maker. |

### README copy

| ID | Words | Copy |
| --- | ---: | --- |
| R01 | 4 | Remote Web Task Recipes |
| R02 | 19 | Remote Web Task Recipes is a private accessibility field notebook for recurring work in browser-delivered remote or legacy software. |
| R03 | 23 | A user or support worker can mark visual coordinates, attach concise spoken instructions, and replay one step at a time over the app. |
| R04 | 17 | It does not automate clicks, inspect credentials, or claim to add accessibility semantics to the underlying software. |
| R05 | 2 | Live site |
| R06 | 3 | What v1 includes |
| R07 | 8 | Local notebooks scoped to a web app’s origin. |
| R08 | 7 | Deliberate, user-triggered visible-tab capture for coordinate placement. |
| R09 | 8 | Pointer placement plus Arrow/Shift+Arrow keyboard positioning. |
| R10 | 17 | Browser-local OCR hints through TextDetector where the browser provides it; manual visual placement remains available everywhere else. |
| R11 | 11 | Task steps linked to landmarks, with visible and spoken guide playback. |
| R12 | 8 | AES-256-GCM encrypted export/import with a passphrase-derived key. |
| R13 | 9 | A quick-launch popup and a responsive, keyboard-operable notebook editor. |
| R14 | 14 | The complete local accessibility workflow, three notebook covers, and encrypted data export are free. |
| R15 | 7 | There is no account, checkout, or subscription. |
| R16 | 8 | All recipe data remains in extension local storage. |
| R17 | 10 | Screenshot pixels and OCR results are never uploaded or saved. |
| R18 | 4 | See privacy and terms. |
| R19 | 4 | Install the packaged extension |
| R20 | 9 | Download `remote-web-task-recipes.zip` from the site and extract it. |
| R21 | 7 | Open `chrome://extensions` in Chrome or Chromium. |
| R22 | 12 | Turn on Developer mode, choose Load unpacked, and select the extracted folder. |
| R23 | 3 | Pin the extension. |
| R24 | 7 | `Alt+Shift+R` opens its quick launcher. |
| R25 | 16 | The ZIP is an unsigned developer package until the factory publishes it through a browser store. |
| R26 | 2 | Use it |
| R27 | 15 | Open the extension’s notebook editor and create a notebook for the target web app origin. |
| R28 | 12 | Name a landmark and its spoken cue, then choose Place on app. |
| R29 | 8 | The target tab is focused and frozen locally. |
| R30 | 9 | Point and click, or use Arrow keys and Enter. |
| R31 | 2 | Escape cancels. |
| R32 | 14 | Create a task, add concise steps, and optionally attach each step to a landmark. |
| R33 | 9 | Start the guide from the editor or extension popup. |
| R34 | 9 | Use Previous/Next, the Arrow keys, or Speak step. |
| R35 | 4 | Escape closes the guide. |
| R36 | 9 | Use Backup & appearance to export an encrypted `.rwtr` backup. |
| R37 | 9 | Coordinate pins are best for layouts that stay stable. |
| R38 | 12 | Recheck landmarks after a remote app, display scaling, or window layout changes. |
| R39 | 4 | Develop, test, and build |
| R40 | 6 | Requires Node.js 20+ and npm. |
| R41 | 6 | The factory’s exact static-site command is: |
| R42 | 27 | The full build writes the deployable landing site to `dist/site/`, the loadable extension to `.output/chrome-mv3/`, and the packaged extension to `dist/site/downloads/remote-web-task-recipes.zip`. |
| R43 | 3 | Architecture and permissions |
| R44 | 4 | WXT + TypeScript, Manifest V3. |
| R45 | 4 | `storage`: stores notebooks locally. |
| R46 | 7 | `activeTab`: supports the explicit visible-tab screenshot gesture. |
| R47 | 19 | `scripting` and `<all_urls>` host access: inject the capture/guide overlay into the browser app selected by the user. |
| R48 | 10 | The content script does not read or send DOM text. |
| R49 | 14 | Vite static landing site with no runtime CDN, telemetry, analytics, or remote API calls. |
| R50 | 2 | Project records |
| R51 | 2 | Opportunity brief |
| R52 | 5 | Visual system and artwork provenance |
| R53 | 2 | Build handoff |
| R54 | 1 | License |
| R55 | 1 | MIT. |
| R56 | 2 | See LICENSE. |

## Final verdict

**FAIL.** B1–B3 are blocking. M1–M3 remain after those repairs. A follow-up can
pass only when `/demo` immediately shows realistic sample use, claim tests run
from fresh demo state, and direct unknown URLs render a real 404.
