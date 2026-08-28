# Copy audit — perfection loop round 2

Audited 2026-08-28 after the round-2 rewrite. Hyphenated terms count as one
word. The first screen has a 6-word job headline, a 16-word audience sentence,
one primary sample action, its immediate outcome, and three plain facts.

No landing sentence exceeds 22 words. No landing or README copy uses a banned
marketing word. The longest landing sentence is 14 words. The longest README
sentence is 13 words.

## Landing copy

| ID | Words | Visible copy |
| --- | ---: | --- |
| L01 | 4 | Skip to main content |
| L02 | 4 | Remote Web Task Recipes |
| L03 | 1 | Demo |
| L04 | 3 | How it works |
| L05 | 1 | Privacy |
| L06 | 2 | Download extension |
| L07 | 7 | For repeated tasks in hard-to-use browser software |
| L08 | 6 | Save landmarks for repeated browser tasks. |
| L09 | 16 | For people using screen readers or low vision who need to find the same controls again. |
| L10 | 5 | Try it with sample data |
| L11 | 10 | See a named app, three landmarks, and spoken task steps. |
| L12 | 2 | Free extension |
| L13 | 2 | No account |
| L14 | 6 | Notebook data stays in your browser |
| L15 | 4 | How to save landmarks |
| L16 | 3 | Save landmarks once. |
| L17 | 4 | Follow task steps later. |
| L18 | 3 | Name the website |
| L19 | 10 | A notebook holds landmarks and task steps for one website. |
| L20 | 2 | Place landmarks |
| L21 | 14 | Choose placement, then use a pointer or arrow keys to mark a visible control. |
| L22 | 3 | Follow task steps |
| L23 | 12 | Open the guide to read or hear one step at a time. |
| L24 | 5 | It never clicks for you. |
| L25 | 5 | What stays on your device |
| L26 | 6 | Your landmarks stay in your browser. |
| L27 | 7 | Notebooks use storage inside your browser extension. |
| L28 | 6 | Screenshots are removed when placement closes. |
| L29 | 9 | Text suggestions stay in placement; manual placement remains available. |
| L30 | 6 | Backups are encrypted with your passphrase. |
| L31 | 6 | No analytics, ads, or remote control. |
| L32 | 4 | When to recheck landmarks |
| L33 | 6 | Landmarks stay at saved screen positions. |
| L34 | 11 | Recheck them after the app, display scale, or window layout changes. |
| L35 | 6 | Everything in the notebook is free |
| L36 | 6 | Use every feature without an account. |
| L37 | 13 | Landmarks, task guidance, speech, and encrypted backups are included in the extension download. |
| L38 | 2 | Free download |
| L39 | 14 | Install the package in Chrome or Chromium, then create a notebook for your website. |
| L40 | 2 | Download extension |
| L41 | 8 | Save landmarks and task steps for one website. |
| L42 | 1 | Privacy |
| L43 | 1 | Terms |
| L44 | 4 | Built by Param Factory |
| L45 | 8 | Original AI-assisted project artwork, reviewed by the maker. |

## Terminology

| Concept | One user-facing term |
| --- | --- |
| Container for one website | notebook |
| Saved visual location | landmark |
| One guide instruction | task step |
| Guided sequence | guide |
| Isolated sample state | demo |
| Landmark locator details | landmark description |

Internal code keeps the historic `recipe` and `cue` property names for data
compatibility. They are not presented as competing user-facing terms.

## Plain-word checks

- Headings name the job or section without relying on the notebook metaphor.
- “Website” replaces “site origin” in visitor copy.
- “Storage inside your browser extension” replaces “extension local storage.”
- “Text suggestions” replaces “OCR” and `TextDetector` in visitor copy.
- Backup copy names the user outcome; algorithm details remain implementation evidence.
- README sentences were re-counted after removing “quick launcher,” the unsigned-package assertion, and vague “Use it” wording.
- Catalog copy starts with “Save,” has 13 words, and is 87 characters long.
