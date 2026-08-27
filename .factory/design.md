# Visual thesis — Field Notes for inaccessible software

## Direction and rationale

Remote Web Task Recipes is a **handwritten lab notebook for the browser**. Its
users are mapping software that behaves like an opaque instrument: they observe
it, mark stable coordinates, name them, and write a repeatable procedure. The
interface therefore borrows the useful qualities of a field notebook—warm paper,
blue ruled lines, red registration marks, clipped specimens, pencil annotations—
without imitating handwriting for body copy or sacrificing legibility.

This is deliberately a single, warm-light treatment. A dark theme would turn the
paper metaphor into glowing chrome and reduce the stable visual reference that
low-vision users need. The extension instead offers a high-contrast “graphite”
mode, using the same light paper with heavier ink and fewer textures.

## Palette

All color is tokenized. Contrast targets were checked against `paper` and
`sheet`; no meaning relies on color alone.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#f4eedf` | warm notebook background |
| `sheet` | `#fffdf7` | raised working sheets |
| `ink` | `#172b32` | primary text (13.2:1 on paper) |
| `ink-soft` | `#45585d` | secondary text (6.7:1 on paper) |
| `rule` | `#8bb8c1` | notebook rules and focus halo |
| `blueprint` | `#145f70` | primary actions (6.5:1 on paper) |
| `red-pencil` | `#a13d32` | pins, cautions, destructive actions |
| `moss` | `#356341` | saved/success states |
| `ochre` | `#8a5b00` | warnings |
| `danger` | `#8f2924` | errors |
| `focus` | `#006f8a` | 3px focus outline with paper offset |

The capture overlay uses opaque navy and off-white at very high contrast, plus a
red-pencil crosshair backed by a white keyline so it remains visible over unknown
page pixels.

## Type

- **Instrument labels / headings:** `ui-monospace, "Cascadia Mono", "SFMono-Regular", Consolas, monospace`.
- **Reading / controls:** `Atkinson Hyperlegible Next`, falling back to
  `"Atkinson Hyperlegible", Verdana, sans-serif`. The app ships its own OFL
  `.woff2`; there are no font CDNs.
- Scale: 16px body, 18px lead, 20px h3, 25px h2, 34–46px h1. Line height is
  1.55 for reading and 1.2 for display. Copy measures 45–70 characters.
- Handwritten character comes from short decorative SVG strokes and slightly
  rotated registration labels, never from hard-to-read script fonts.

## Spacing, shape, and hierarchy

The base rhythm is 4px/8px: `4, 8, 12, 16, 24, 32, 48, 64`. Working sheets use
8px radii and a 2px ink edge; independent recipe sheets may overlap by 2–4px and
use a restrained `4px 5px 0` graphite shadow. Controls are at least 44px high,
adjacent actions have at least 8px separation, and dense coordinates use tabular
figures. Ruled lines group procedures; boxes are reserved for distinct notebook
objects, not every paragraph.

At 390px the landing illustration moves below the value statement, navigation
collapses to the essentials, and procedure columns become a single reading
sequence. The extension dashboard switches from split navigation/editor to a
stack where the active recipe is first. Nothing depends on hover.

## Interaction grammar

- A landmark is always a numbered red registration pin.
- Capturing opens a deliberate “frozen specimen” layer. Crosshairs follow the
  pointer; arrow keys nudge them; Enter fixes the point; Escape cancels.
- Guidance is a page tab sliding over the current web app. Previous/next follows
  the written procedure. The target pin remains in the page coordinate system.
- Saving stamps a short textual status into a polite live region. Deleting names
  the object and requires confirmation; the editor offers Undo after deletion.
- Speech is opt-in per guide run and always duplicates visible text.

## Motion

UI transitions last 160–220ms and only animate opacity or transform: sheets lift
from their source, the guide tab enters from the right, and a saved stamp settles
by 2px. There are no loops. Under `prefers-reduced-motion: reduce`, transitions
and smooth scrolling are removed and state changes are immediate; hierarchy,
outlines, and live-region text carry the same information.

## Original asset plan and provenance

The hero is an original generated still-life: an overhead accessibility field
notebook containing abstract browser-window diagrams, tactile numbered tabs,
magnifier, and coordinate marks. It explains the product as a user-owned map,
not automation. The image contains no people, brands, application screenshots,
or implied OCR accuracy. The interface icons and ruled-paper patterns are
hand-authored SVG/CSS.

### Prompt sheet

- **Subject:** overhead field notebook mapping an abstract remote browser panel;
  numbered physical tabs, brass magnifier, red registration pins, pencil path.
- **World/materials:** warm recycled paper, graphite, cyan blueprint ink, faded
  red pencil, linen desk mat, small pieces of masking tape.
- **Light/lens:** diffuse north-window light, honest shadows, 50mm top-down still
  life, crisp central details, calm edges.
- **Palette words:** oat paper, deep blue-black ink, muted cyan rules, brick-red
  marks, moss-green confirmation stamp.
- **Negative list:** no readable words or letters, no logos, no watermark, no
  real people or hands, no branded UI, no glowing gradient, no glassmorphism,
  no device mockup, no illegible pseudo-text blocks.

Generation command uses `/opt/fleet/lib/gen-image.sh`, Azure OpenAI deployment
`factory-image`, 1536×1024, high quality. Generated 2026-08-27. The selected image
is original project artwork under the repository MIT license; its exact prompt
is stored beside the source image in `assets/src/hero-notebook.json`. The footer
discloses AI-assisted original artwork.

## Voice

Calm, literal, and respectful. Use “landmark,” “step,” and “notebook,” not
“magic,” “agent,” or “vision.” Errors say what remains safe and what to try next.
Compatibility copy states that coordinate landmarks work best when the remote
app layout remains stable and never promises universal remote-desktop support.
