---
target: enquiry path and shell
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/Luna-costruzioni/src/pages/Contatti.jsx"
target_fingerprint: "sha256:d1bb7709b35ebc8a27ef55117d917dd8d592430925f8c3d1d8126fedc626a311"
target_path: /home/user/Luna-costruzioni/src/pages/Contatti.jsx
timestamp: 2026-10-08T10-07-50Z
slug: src-pages-contatti-jsx
---
# Critique: enquiry path and site shell (/contatti, forms, /grazie, header, footer, phone bar, cookie banner)

Method: dual-agent (A: design review · B: detector + browser overlay + axe-core).

## Design Health Score: 27/40 (68%, Acceptable).
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Errors not announced; focus on body after /grazie |
| 2 | Match real world | 3 | Plain Italian |
| 3 | User control | 2 | Esc does not close menu; mail fallback discards typed data |
| 4 | Consistency | 2 | Two forms, different required sets; eight quote labels; EN half done |
| 5 | Error prevention | 3 | Autocomplete, inputMode, asterisks |
| 6 | Recognition | 3 | Labels above fields; WhatsApp prefilled with page |
| 7 | Flexibility | 3 | Three channels; bar appears late on phone |
| 8 | Minimalist design | 3 | Four reference blocks before the form on phone |
| 9 | Error recovery | 2 | Focus to wrong field; EN errors Italian |
| 10 | Help | 3 | Budget helper and "Oppure chiama" |

## Design specificity
Copy carries the brand (Luciano by name, "non un centralino"); structure is the stock tradesman pattern. Detector: 3 advisory sizes; 9px dealer label; footer legal line ~158 characters; axe: footer legal link 1.38:1 against its text and not underlined (serious). Occlusion on phone is a false positive (closed menu).

## Priority issues
- [P1] On phones nothing to tap on 5 of 11 pages at first load (header hides phone and Preventivo, bar appears after scroll, bar has no quote, menu has no WhatsApp). adapt + layout.
- [P1] Focus after a failed submit goes nowhere or to the wrong field (stale aria-invalid query); no live region; home form moves no focus. harden.
- [P1] English mode: enquiry path, form, fallback and /grazie all Italian under lang="en". harden + clarify.
- [P2] Language toggle only in the footer. layout.
- [P2] Outline submit 39.5px; quote action has many labels. polish + clarify.

## Persona red flags
Jordan: only an unlabelled menu icon on several pages; overlapping "need" options. Sam: focus lost, errors silent, Esc ignored, Italian read as English. Casey: bar arrives late and wraps the number; 39.5px submit; mail fallback loses data without a mail app.
