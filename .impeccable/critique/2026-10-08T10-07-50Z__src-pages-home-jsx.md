---
target: home page
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 1
target_identity: "file:/home/user/Luna-costruzioni/src/pages/Home.jsx"
target_fingerprint: "sha256:ad1cb13e609860863482c01d4e1c0694d75567e89ed29fc36cd9ae71e9883578"
target_path: /home/user/Luna-costruzioni/src/pages/Home.jsx
timestamp: 2026-10-08T10-07-50Z
slug: src-pages-home-jsx
---
# Critique: home page (redesign branch)

Method: dual-agent (A: design review · B: detector + browser overlay), run as isolated sub-agents.

## Design Health Score: 19/32 (59%, Acceptable). Heuristics 7 and 10 n/a (Persuade surface).
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 2 | Form errors appear out of view on phone; focus not moved |
| 2 | Match real world | 3 | Plain Italian; EN brand phrasing awkward |
| 3 | User control | 3 | Menu works without JS |
| 4 | Consistency | 2 | Four quote-button treatments; h6 eyebrows |
| 5 | Error prevention | 2 | Placeholders read as values; copy promises fewer required fields |
| 6 | Recognition | 3 | Price and contact repeated where needed |
| 7 | Flexibility | n/a | Marketing page |
| 8 | Minimalist design | 2 | "One company" said 7 times; doubts and FAQ overlap |
| 9 | Error recovery | 2 | Errors not linked; no focus to first error |
| 10 | Help | n/a | FAQ covers it |

## Design specificity
Copy is specific to Luna; the composition is a category-interchangeable dark landing template. Only the sand price line, sand tags and Sicily map are Luna's own. Nothing shows Luna itself (earthworks contractor) and nothing is Sicilian. Detector: 0 CLI findings; overlay 10 (desktop) / 9 (phone): 9px dealer label, h6 eyebrows after h2, 158-char footer legal line, Inter 100%, hero teal glow; false positives on the patent note and the segmented controls.

## Priority issues
- [P0] Photos presented as Luna's: watermark on every photo reads "LUNA COSTRUZIONI · CONCESSIONARIO SICILIA"; home never says the photos are the manufacturer's Lombardy display pools; "il prodotto che costruiamo per te". Fix: watermark Rocks Design only; one honest caption line; clarify.
- [P0] EN says "the authorised dealer" (Home.jsx:317, 559, 640): implies the only one. Fix: "an authorised dealer". clarify.
- [P1] Conversion end weakest: outline submit, placeholder values, copy vs required fields mismatch, no focus to errors. harden + clarify.
- [P2] Template skeleton plus repetition (10 sections, "one company" x7). distill + layout.
- [P2] Phone: first view text only, no persistent quote action, WhatsApp green as second accent, number wraps. adapt.

## Persona red flags
Jordan: brand jargon; assumes photos are Sicilian Luna builds; form errors on a field showing "Palermo". Riley: "the authorised dealer"; "Circa un'ora" for design; header Preventivo to /contatti vs hero #contatti. Casey: no image in first view; bar has no quote; 23px link targets.

## Questions
- What if Luna's own truth (crews, machines, Sicilian ground, a signed itemised quote) stood beside the manufacturer's photos?
- Would half the length feel more confident?
- Could an honest caption system become a signature?
