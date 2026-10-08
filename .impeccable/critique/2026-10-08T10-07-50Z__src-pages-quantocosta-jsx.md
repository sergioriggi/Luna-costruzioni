---
target: information pages
total_score: 23
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:/home/user/Luna-costruzioni/src/pages/QuantoCosta.jsx"
target_fingerprint: "sha256:74511a0a4c01c9225c65cebc0cc049361beda3f4617ca94f56e33367ae5a7783"
target_path: /home/user/Luna-costruzioni/src/pages/QuantoCosta.jsx
timestamp: 2026-10-08T10-07-50Z
slug: src-pages-quantocosta-jsx
---
# Critique: information pages (/quanto-costa, /come-lavoriamo, /domande-frequenti, /azienda, /piscine-rocks-design/sicilia, /hotel-e-resort, /giardini-e-opere-in-pietra, /piscina-in-cemento-o-rocks-design)

Method: dual-agent (A: design review · B: detector + browser overlay).

## Design Health Score: 23/36 (64%, Acceptable). Heuristic 10 n/a.
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Breadcrumbs, current nav, FAQ state work |
| 2 | Match real world | 3 | Legal references above the fold on /quanto-costa |
| 3 | User control | 3 | Nothing traps the user |
| 4 | Consistency | 1 | Two systems; nine labels for one action; outline vs filled primary |
| 5 | Error prevention | 2 | Hotel form defaults to private home; "telefonata" opens a form |
| 6 | Recognition | 3 | Price repeated via cross-links |
| 7 | Flexibility | 3 | Province anchors, call/WhatsApp shortcuts |
| 8 | Minimalist design | 2 | Text walls, eyebrows everywhere, empty right half on 4 heroes |
| 9 | Error recovery | 3 | Honest form errors with working channels |
| 10 | Help | n/a | Pages are the help |

## Design specificity
Copy is the most persuasive on the site (the cement comparison, the Sicily disclosure); the layout is generic and runs on a different system from the home page (1240 vs 1320, 140 vs 60px left edge at 1440, outline primary). Detector: 27 advisory off-scale sizes; eyebrow/kicker on almost every heading (breaches the Rationed Label Rule); line lengths 89-129 characters; gallery hover zoom; phone "occlusion" false positive.

## Priority issues
- [P1] Info pages on the pre-redesign system; site splits in two. extract + polish.
- [P1] Nine quote labels in three styles; form submit is outline. clarify.
- [P1] /hotel-e-resort: "Realizzazioni / Projects" over manufacturer photos; RITORNI and form untranslated; form defaults to private home; hype lines. harden + clarify.
- [P2] /quanto-costa price line white on turquoise, not the sand signature; price retyped in 4 places; turquoise on figures. colorize + layout.
- [P2] Eyebrows and text walls (QuantoCosta 7 in 7 sections, 1,060 words, 13 phone screens). distill.

## Persona red flags
Jordan: legal terms before basics; sopralluogo vs preventivo vs proposta. Riley: 7 of 8 pages Italian under lang="en"; retyped price will drift. Casey: tax paragraph fills first screen on /quanto-costa; 11-field form everywhere.
