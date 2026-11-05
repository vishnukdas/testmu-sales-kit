# TestMu AI Sales Kits

One place for every TestMu AI product's internal sales play and customer-facing SE demo story.

## Layout

```
index.html                     portal home: one card per product
assets/kit.css                 shared styles for every page
plays/<product>/index.html     internal sales play for BDRs, AEs and SEs
stories/<product>/index.html   customer-facing SE demo story
products.json                  product list, status and timing
```

## Kits

| Product | Status | Timing | Sales play | Demo story |
|---|---|---|---|---|
| Performance Testing | Live | Live | `plays/performance-testing/` | `stories/performance-testing/` |
| Test Manager | In progress | This week | `plays/test-manager/` | `stories/test-manager/` |
| KaneAI | Planned | After Test Manager feedback | `plays/kaneai/` | `stories/kaneai/` |
| Kane CLI | Planned | After Test Manager feedback | `plays/kane-cli/` | `stories/kane-cli/` |
| Agent Testing | Planned | After KaneAI and Kane CLI | `plays/agent-testing/` | `stories/agent-testing/` |
| Accessibility Testing | Planned | Later | `plays/accessibility/` | `stories/accessibility/` |
| SmartUI | Planned | Later | `plays/smartui/` | `stories/smartui/` |
| HyperExecute | Planned | Longer term | `plays/hyperexecute/` | `stories/hyperexecute/` |

## Adding or finishing a kit

1. Replace the placeholder in `plays/<product>/index.html` with the sales play. Follow the Performance Testing play's sections and link `../../assets/kit.css`.
2. Replace `stories/<product>/index.html` with the demo story.
3. Update the product's status in `products.json`, the card in `index.html` and the table above.

## Access

Sales plays are internal and confidential. Host `plays/` only behind company SSO. The demo stories in `stories/` are written for customers.
