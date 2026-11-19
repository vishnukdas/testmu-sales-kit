# TestMu AI Sales Kits

One place for every TestMu AI product's internal sales play and customer-facing SE demo story.

## Layout

```
index.html                     portal home: one card per product (has its own styles)
assets/kit.css                 base styles for the plays and placeholder pages
assets/play.css                modern layer loaded after the base styles on every sales play
assets/logos/<product>.*       product logos used on the home page and in the plays
plays/<product>/index.html     internal sales play for BDRs, AEs and SEs
stories/<product>/index.html   customer-facing SE demo story (self-contained styles)
products.json                  product list, status and timing
STYLE.md                       style guide for the home page, plays and logos
```

## Kits

| Product | Status | Timing | Sales play | Demo story |
|---|---|---|---|---|
| Performance Testing | Live | Live | `plays/performance-testing/` | `stories/performance-testing/` |
| Test Manager | In progress | This week | `plays/test-manager/` | `stories/test-manager/` |
| KaneAI | In progress | First draft, in review | `plays/kaneai/` | `stories/kaneai/` |
| Kane CLI | In progress | First draft, in review | `plays/kane-cli/` | `stories/kane-cli/` |
| Agent Testing | In progress | First draft, in review | `plays/agent-testing/` | `stories/agent-testing/` |
| Accessibility Testing | Planned | Later | `plays/accessibility/` | `stories/accessibility/` |
| SmartUI | Planned | Later | `plays/smartui/` | `stories/smartui/` |
| HyperExecute | Planned | Longer term | `plays/hyperexecute/` | `stories/hyperexecute/` |

## Adding or finishing a kit

Read [`STYLE.md`](STYLE.md) first. It has the design rules, the exact markup and the checks.

1. Replace the placeholder in `plays/<product>/index.html` with the sales play. Follow the Performance Testing play's sections. After the base styles, link the Geist font and `../../assets/play.css`, and put the product logo before the `<h1>`.
2. Replace `stories/<product>/index.html` with the demo story.
3. Add the product logo to `assets/logos/`. Use the story's logo if it has one.
4. Update the card, roadmap chip and counts in `index.html`, then the product in `products.json` and the table above.

## Access

Sales plays are internal and confidential. Host `plays/` only behind company SSO. The demo stories in `stories/` are written for customers.
