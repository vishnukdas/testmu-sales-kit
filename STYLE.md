# Sales Kits style guide

Read this before you add or update a product kit. It covers the home page (`index.html`), the sales plays (`plays/<slug>/index.html`) and the product logos. The SE demo stories (`stories/<slug>/index.html`) are self-contained and keep their own styles. Do not restyle them.

## 1. Design rules (all pages)

- **Light theme only.** No dark mode and no theme toggle. The pages set `color-scheme: light only`.
- **Fonts:** Geist for all text, Geist Mono for small labels (kickers, stage labels, timings, table headers). Load them from Google Fonts: `family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500`.
- **Colours:** use the tokens below. Do not add new colours, except a logo's `--c1`/`--c2` pair (section 4).

  | Token | Value | Use |
  |---|---|---|
  | `--bg` | `#F6F7F9` | Page background |
  | `--card` | `#FFFFFF` | Cards |
  | `--text` / ink | `#0B1220` | Headings, selected tabs and buttons, dark panels |
  | `--text-sec` | `#4A5568` | Body text |
  | `--text-dim` | `#7A8599` | Labels |
  | `--accent` | `#3E6BF0` (gradient partner `#6F8CFF`) | Links, kickers, focus ring |
  | Live | `#16A34A` | Live status |
  | In progress | `#D97706` | In progress status |
  | Planned | `#64748B` | Planned status |
  | Lines | `rgba(15,23,42,.08)` and `.14` | Borders |

- **Shape:** cards use 14 to 16px radius, inner boxes 10px, and pills and buttons are fully rounded (999px). Borders are 1px hairlines with a soft shadow, not heavy borders.
- **Header (cover):** white with soft blue, teal and violet radial tints and a faint 56px grid that fades out. The title is large (Geist 600, tight letter spacing) with a dark-to-slate gradient.
- **Labels:** kickers and small labels are Geist Mono, uppercase, 11 to 12.5px, in the accent colour or dim grey.
- **Status pills:** rounded, with a coloured dot before the text: Live (green), In progress (amber), Planned (grey).
- **Motion:**
  - Use `cubic-bezier(.23,1,.32,1)` (strong ease-out). Keep interface motion between 160 and 350ms, and keep content fades under about 0.7s.
  - Pressed buttons scale to 0.97. Only apply hover effects on devices with a real pointer (`@media (hover:hover) and (pointer:fine)`).
  - Animate only transform, opacity and colours.
  - Under `prefers-reduced-motion: reduce`, remove all movement.
- **Layout:** must work at 390px phone width with no sideways scrolling. Use a 16px side gutter on phones and 32px from 720px up.
- **Writing:** no em dashes (use a colon, a comma or a new sentence). Every sales play must show "Internal and confidential".

## 2. Adding or updating a product on the home page

The home page has its own styles inside `index.html` (it does not use `kit.css`). For a product with slug `<slug>`, change all of the following together:

1. **Kit card** in `#grid`. Copy an existing card with the same status. Cards are ordered Live, then In progress, then Planned.
   - `id="k-<slug>"`, `data-status="live|prog|plan"`, and `style="--d:<0,1,2>;view-transition-name:k-<slug>"`.
     - `--d` is the reveal stagger. It cycles 0, 1, 2 by column.
   - `.kit-top` holds the logo tile (section 4) and `<span class="status"><i></i>Live|In progress|Planned</span>`.
   - Then `<h3>` with the name. Put an optional subtitle in `<small>`, such as "on HyperExecute".
   - Then the timing: `<span class="when">` + clock SVG + `<span class="sr">Timing: </span>` + the timing text.
   - Then `<p class="desc">` with the one-line description.
   - In progress cards add `<p class="note">Being built now. Content may still change.</p>`.
   - Live and In progress cards use two row links:
     - `<a class="lnk play" href="plays/<slug>/"><span class="l">Internal · BDR, AE, SE</span><span class="t">Sales play<arrow svg></span></a>`
     - `<a class="lnk" href="stories/<slug>/"><span class="l">Customer-facing · Stage 3</span><span class="t">SE demo story<arrow svg></span></a>`
   - Planned cards use plain text links: `<a class="lnk" href="plays/<slug>/">Sales play<arrow svg></a>`, and the same for the story.
2. **Roadmap chip** in `.track`. Put it in the lane that matches the status: `live`, `prog`, Later or Longer term.
   - Markup: `<button class="chip" type="button" data-go="k-<slug>"><span class="nm"><logo tile>Name</span><span>Short timing</span></button>`.
3. **Counts:** update them in two places. They must match the cards.
   - Hero stats: the `data-count` attribute and the visible number on each `.stat` (products, live, in progress, planned).
   - Filter bar: the `<span class="c">` numbers on All, Live, In progress and Planned.
4. **`products.json`:** update the product's `line`, `status` (`live`, `prog` or `plan`) and `when`. Keep it valid JSON.
5. **`README.md`:** update the product's row in the Kits table.

Copy the existing card and chip markup exactly; only the product details change. Do not change other products' entries.

## 3. Sales play pages

Every play keeps its own content, scripts and tab logic. The modern look comes from `assets/play.css`, which loads after the play's base styles (either the inline `<style>` block or `../../assets/kit.css`). It restyles the existing class names, so do not invent new component classes.

**Required in every play's `<head>`, after the base styles:**

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="../../assets/play.css">
```

**Required in the cover (`<header class="hero">`):**

- The back link is `<a class="back" href="../../">&larr; All sales kits</a>`, with **no inline style**.
- The brand line is `<span class="brand">TestMu AI · Sales Play · Internal and confidential</span>`. On full plays it sits inside `.brandrow`, next to the `.aud` New logo / Existing customer switch.
- The product logo tile goes directly before the `<h1>`, using `../../assets/logos/` paths (section 4).

**Class names `play.css` already styles:**

| Area | Classes |
|---|---|
| Structure | `.stagebar .tabs .tab (.who .nm)`, `section.view`, `.vhead`, `.block`, `.card`, `.grid2`, `.grid3`, `.roles`, `.reasons`, `.stats` |
| Overview | `.flow .stage (.num .exit)`, `.gate`, `.audnote`, `.coach`, `.guard`, `.warnline`, `.formula` |
| Stage 1 | `.sig .row`, `.script` (with `header`, `pre`, `.ph` placeholders), `.btn`, `code.bool` |
| Stage 2 | `.disc .phase .q (.qt .qn .meta .k)`, `.prob`, `.cost`, `.cmp`, `.tw table`, the builder (`.builder .form .field .chips .chip .out .rec .flags .flag`), ROI (`.roi .kpi .kpi.main .kpi2`) |
| Stage 3 | `.steps .st`, `.links`, `.close` (dark closing panel with `q` and `.pathchips`) |
| Objections | `.search`, `.objs details.o` (with `summary .s`, `.pill`, `.body .k`) |
| Pills | `.pill` with `.p-strong .p-med .p-no .p-info .p-live .p-prog .p-plan` |

If a new play needs a component that is not in this list, add its styles to `assets/play.css` using the tokens in section 1, so every play stays consistent.

**Placeholder plays** (planned products) link `../../assets/kit.css` and then `play.css`, and contain only the cover, a `.gate` with status and timing, and a "What this will contain" list.

## 4. Product logos

Logos live in `assets/logos/<slug>.svg` or `.png` and appear in three places: the home page card, the roadmap chip, and the play's cover.

- **Source:** use the logo from the product's SE demo story if it has one. Otherwise use the product icon from the TestMu AI website (`assets.testmuai.com/resources/images/testmu-ai/sectionFold/<name>-logo.svg`). Never invent a logo silently; if neither exists, say so.
- **Three tile styles** (the same markup on the home page and in the plays):

  | Logo type | Markup |
  |---|---|
  | Single-colour line icon (SVG) | `<span class="plogo" style="--c1:#…;--c2:#…" aria-hidden="true"><i style="--m:url(assets/logos/<slug>.svg)"></i></span>`. The icon is tinted with a `--c1` → `--c2` gradient on a soft tinted tile. |
  | Full-colour image with transparency (PNG) | `<span class="plogo pimg" aria-hidden="true"><img src="assets/logos/<slug>.png" alt=""></span>` |
  | Square logo on a solid background (PNG) | `<span class="plogo ptile" aria-hidden="true"><img src="assets/logos/<slug>.png" alt=""></span>`. The image fills a black tile. |

  In play pages, prefix the paths with `../../`.
- **Colour pairs in use:**

  | Product | `--c1` / `--c2` or style |
  |---|---|
  | Performance Testing | `#3E6BF0` / `#22C3B5` |
  | Test Manager | `#3E6BF0` / `#6F8CFF` |
  | KaneAI | `pimg` |
  | Kane CLI | `ptile` |
  | Agent Testing | `ptile` |
  | Accessibility | `#059669` / `#14B8A6` |
  | SmartUI | `#E11D48` / `#F59E0B` |
  | HyperExecute | `#EA580C` / `#E11D48` |

  A new product gets its own pair that doesn't clash with these.

## 5. Checks before you finish

- The page works at 1440px and 390px, with no sideways scrolling and no wrapped buttons.
- The plays show "Internal and confidential".
- No page contains an em dash (`—`).
- Every demo link in a play (`../../stories/<slug>/#<chapter>`) matches an `id="ch-<chapter>"` in the story.
- The home page counts, the filter counts, `products.json` and `README.md` all agree.
- There are no console errors.
- Show the result locally before committing. Commit on a branch and open a PR to `main`.
