---
target: pool pages
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:/home/user/Luna-costruzioni/src/pages/Modello.jsx"
target_fingerprint: "sha256:593defc9c1f9fa8eac85d2f579e08be8866ed30ba8417324661ec52cd856565b"
target_path: /home/user/Luna-costruzioni/src/pages/Modello.jsx
timestamp: 2026-10-08T10-07-50Z
slug: src-pages-modello-jsx
---
# Critique: pool pages (/piscine-rocks-design, /modelli, /modelli/*, /sabbie, /galleria)

Method: dual-agent (A: design review · B: detector + browser overlay).

## Design Health Score: 19/32 (59%, Acceptable). Heuristics 7 and 10 n/a.
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Gallery filter state grey, not in URL |
| 2 | Match real world | 2 | "Realizzazioni" reads as Luna's jobs; EN header over Italian bodies |
| 3 | User control | 3 | Lightbox keys work; focus not managed |
| 4 | Consistency | 1 | Two visual systems; six primary labels; one page, three names |
| 5 | Error prevention | 3 | Honest sand and permit disclaimers |
| 6 | Recognition | 2 | No price on any pool page |
| 7 | Flexibility | n/a | Brochure pages |
| 8 | Minimalist design | 2 | Label on every section; event photos |
| 9 | Error recovery | 3 | Inline form errors |
| 10 | Help | n/a | Pages are the help |

## Design specificity
Copy candid and specific (permits, three questions before the visit, sand samples brought to the garden); layout is the stock label + headline + card grid + zigzag + grey closing box. Inner pages still on the pre-redesign layer. Detector: advisory off-scale font sizes (0.95rem x11), sand swatch colours (false positive), image hover zoom x32, hero chips/kickers; "text-occlusion" on phone is a false positive (closed menu).

## Priority issues
- [P0] "Realizzazioni / come si presenta ultimata" over manufacturer photos (Modello.jsx:103); "Ogni immagine mostra una vasca diversa" is false (same pool shown 4 times); "la maggior parte dei clienti" invents proof; "dal concessionario per la Sicilia" implies exclusivity. clarify.
- [P1] Inner pages on the old system: outline primary, 1240 column, black shadows at rest, 12px radius, turquoise on non-interactive text, eyebrow on every section. extract + polish.
- [P1] EN mode: header English, every body Italian, html lang="en". harden.
- [P2] Naming tangled ("Le piscine" to two pages), six primary labels, no price line on model pages. clarify + layout.
- [P2] Gallery: 32 photos, 13.7k px on phone, filter tags contradict model pages, wedding/party photos. distill.

## Persona red flags
Jordan: "Le piscine" goes two places; unexplained EPDM, granulometria. Riley: false "vasca diversa"; filters contradict model pages; lightbox focus not trapped. Casey: 13.7k px gallery; filters push first photo below the fold.
