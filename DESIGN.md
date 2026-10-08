---
name: Luna Costruzioni
description: Piscine Rocks Design in Sicilia, dal concessionario autorizzato che le costruisce chiavi in mano.
colors:
  night-sea: "#12202b"
  night-sea-deep: "#1a2a33"
  surface: "#1b2f3c"
  surface-raised: "#24404f"
  text: "#eef6f7"
  text-soft: "#cbdfe3"
  text-muted: "#a9c5cb"
  text-quiet: "#8aa8b0"
  pool-turquoise: "#38c6c0"
  pool-turquoise-light: "#6fdcd5"
  pool-turquoise-pale: "#a9ece7"
  pool-turquoise-deep: "#1a8380"
  pale-sand: "#e4d2aa"
  band-deep: "#123f4a"
  band-glow: "#17605f"
  divider: "color-mix(in srgb, #eef6f7 16%, transparent)"
typography:
  display:
    fontFamily: "Geist, 'Geist riserva', system-ui, sans-serif"
    fontSize: "clamp(40px, 4.4vw, 66px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.034em"
  headline:
    fontFamily: "Geist, 'Geist riserva', system-ui, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 46px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Geist, 'Geist riserva', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Geist, 'Geist riserva', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body-small:
    fontFamily: "Geist, 'Geist riserva', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist, 'Geist riserva', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  md: "8px"
  lg: "14px"
  pill: "999px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "40px"
  section-mobile: "72px"
  section-desktop: "120px"
  container: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.pool-turquoise}"
    textColor: "{colors.night-sea}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.pool-turquoise-light}"
    textColor: "{colors.night-sea}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.pool-turquoise}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "34px 36px"
  sand-tag:
    textColor: "{colors.pale-sand}"
    rounded: "{rounded.md}"
    padding: "3px 10px"
  province-chip:
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
---

# Design System: Luna Costruzioni

<!-- Fonte: il ramo `redesign` all'8 ottobre 2026. I token in codice stanno in
     src/nocturne.css (fonte di verità) e tailwind.config.js; questo file li
     descrive, non li sostituisce. Se cambiano là, va aggiornato qui. -->

## Overview

**Creative North Star: "The Builder's Calm"**

A contractor who does not need to raise its voice. The site speaks the way a good site manager does: plain words, one clear next step, and nothing promised that will not end up in the contract. Premium comes from restraint and precision, not from effects. The pools are the only thing on the page allowed to be spectacular, and they are photographs of real Piscine Rocks Design pools, so the interface steps back and lets them carry the light.

The ground is a deep night-sea blue. It is dark on purpose: turquoise water and pale stone read brightest against it, and the photos are what sells. Colour is spent sparingly: one turquoise for everything you can act on, and pale sand only for prices and numbers. Density is low; sections breathe, and each one does a single job. Motion is short, quiet and functional: it confirms an action or brings a section into view, never decorates.

The site belongs to the dealer, not the manufacturer. Luna Costruzioni leads every view; the Piscine Rocks Design mark appears as the product's credential, never as the masthead.

**Key Characteristics:**
- Dark, photo-led, one accent colour.
- Plain, factual copy; no slogans, superlatives or invented proof.
- One obvious way to ask for a quote from every view.
- Flat surfaces separated by tone, not by shadows or lines.
- Same rules on phone and desktop; the phone is not an afterthought.

## Colors

A night-sea ground, one pool-turquoise accent, and a pale sand kept for figures.

### Primary
- **Pool Turquoise** (#38c6c0): every interactive element: links, buttons, focus rings, the current-page marker. It is the colour of the water in the photos, and the only accent the visitor should learn to click. Lighter steps (#6fdcd5 for hover, #a9ece7 for small labels) and the deep step (#1a8380 for thin structural rules) come from the same ramp.

### Secondary
- **Pale Sand** (#e4d2aa): prices, durations, the "birthplace" dot on the Sicily map, the sand-name tags on model cards. Taken from the Bianco and Giallo sands. Never used for links or buttons.

### Neutral
- **Night Sea** (#12202b): page background.
- **Night Sea Deep** (#1a2a33): alternate section tint and footer; separates sections without a rule.
- **Surface** (#1b2f3c): cards, form fields, the cookie card.
- **Text** (#eef6f7) through **Text Quiet** (#8aa8b0): one cool-grey ramp for body, secondary and fine print. Every pair used on the site passes WCAG AA; the lowest in use is 4.9:1.
- **Band Deep → Band Glow** (#123f4a → #17605f): the single turquoise band behind the five construction steps.

### Named Rules
**The One Voice Rule.** Turquoise means "you can act on this". If it is not a link, a button or a focus state, it is not turquoise. One documented exception: the pale step (#a9ece7) on the single small label that opens a page or a home-page section. Numbers, bullets, table headings and tinted boxes are never turquoise.

**The Sand Means Numbers Rule.** Pale sand marks a figure (a price, a duration, a place of origin). If a sentence turns sand, something is wrong.

## Typography

**Display Font:** Geist, variable 300–700 (with metric-matched fallbacks "Geist riserva" and system-ui)
**Body Font:** Geist
**Label Font:** Geist, uppercase with wide tracking

**Character:** One family, self-hosted, so there are no third-party font requests and no consent needed for them. Hierarchy comes from size, weight (300 to 600) and tracking, never from a second family. Geist replaced Inter on 8 October 2026 (trial on the redesign branch): one variable file per subset, 29 KB for Latin against Inter's 48 KB. If the family changes again, re-measure the fallbacks with scripts/misura-riserva.py to avoid layout shift.

### Hierarchy
- **Display** (500, clamp 40 to 66px, 1.02, -0.034em): the opening headline only. Balanced wrapping; no more than three lines on desktop.
- **Headline** (500, clamp 30 to 46px, 1.06, -0.028em): one per section.
- **Title** (500, 17 to 22px, 1.2): card and step titles, FAQ questions.
- **Body** (400, 16px, 1.65): paragraphs, capped around 38em (about 65 characters).
- **Body Small** (400, 14 to 15px, 1.55): card text, captions, form help.
- **Label** (500, 11 to 12px, 0.12 to 0.16em, uppercase): small labels above headings. Rationed: at most one in every three sections.

### Named Rules
**The Rationed Label Rule.** The small uppercase label above a heading is a signpost, not a habit: at most one per three sections, and never two sections in a row. On inner pages it appears only in the page opening; section headings (`IntestazioneSezione`) never print one.

## Layout

Sections run full width so their backgrounds reach the edges; content sits in a 1320px column whose side margin grows with the screen (minimum 40px desktop, 20px phone). Vertical rhythm is 120px top and 128px bottom on desktop, 88/96 below 1100px, and 72/80 below 900px. Sections alternate between the night-sea ground and the deeper tint instead of being divided by lines.

Breakpoints are 1400 (dealer badge text hides), 1100 (header links give way to the menu panel; layouts tighten), 900 (every multi-column section becomes one column, and the opening photo's preload switches) and 700 (phone details). The opening is a text-and-photo split; other sections vary between grid, timeline, cards, full-bleed photo and map so no two neighbours share a layout.

**The One Job Rule.** Each section has one headline, at most one short paragraph and one way onward. If it needs a second explainer, it is two sections.

## Elevation & Depth

Flat by default. Depth comes from tone: night-sea, deeper tint and surface sit one step apart and do the work that shadows and borders do elsewhere. Shadows appear only as a response to state, and they are tinted toward the background, never neutral black.

### Shadow Vocabulary
- **Lift on hover** (`box-shadow: 0 24px 50px -28px rgba(3, 12, 18, 0.9)`): model cards when hovered, together with a 4px rise.
- **Panel drop** (`box-shadow: 0 24px 48px -24px rgba(4, 12, 18, 0.9)`): the open mobile menu panel.

### Named Rules
**The Flat-At-Rest Rule.** Nothing casts a shadow until the visitor touches it.

## Shapes

Gently rounded and consistent. Controls, inputs, tags and the header logo plate use 8px; cards, panels and photographs use 14px; the opening photo rounds only its lower-left corner (14px) where it meets the text. Pill shapes are reserved for the province links, and circles for the five step numbers and the FAQ plus sign. Rules between rows are single hairlines in the divider colour, drawn only between items, never above the first or below the last.

## Components

### Buttons
Quiet until they matter.
- **Shape:** gently rounded (8px).
- **Primary (filled):** pool turquoise with night-sea text, 600 weight, 12px 22px. One per view: "Chiedi un preventivo" (shortened to "Preventivo" in the header).
- **Outline:** turquoise text and border on transparent, for the second action with a different purpose (for example the hotel proposal).
- **Secondary:** text colour on transparent with a divider-colour border, for "see more" actions such as "Guarda le piscine".
- **Hover / Active:** background shifts one step lighter; a 1px press-down on active; 200ms on the shared curve `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Focus:** 2px turquoise outline, offset 2px.

### Inputs / Fields
- **Style:** surface fill, divider-colour 1px border, 8px radius, 14px text; placeholders in Text Quiet (5.5:1).
- **Focus:** border turns turquoise.
- **Error:** inline message in soft red under the field.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** surface, with an optional 6% text-colour hairline.
- **Shadow Strategy:** flat at rest; see Elevation.
- **Internal Padding:** 34px 36px on desktop, 26px 22px on phone.

### Navigation
- **Header:** sticky, 72px (64px on phone), night-sea at 88% with a light blur, one bottom hairline. The Luna name leads on the left; five page links, the dealer badge (logo on a light plate, linked to the manufacturer), the phone number and the filled "Preventivo" button follow on the right. The current page gets a 1px turquoise underline.
- **Below 1100px:** links move into a menu panel that opens even without JavaScript; the three-line icon turns into a cross.
- **Phone:** a fixed bar at the bottom of every page from first paint: WhatsApp, Chiama, and a filled Preventivo. It steps aside while the cookie banner is open and respects the iPhone safe area; the footer reserves space so nothing sits under it.
- **Language:** a compact IT · EN switch in the header from 900px up, and in the menu panel below that.

### Price Line (signature)
The starting price ("a partire da 1.250 € al m² + IVA") in pale sand, on a faint sand-tinted plate with a link to what moves the price. It comes from one setting in code and is never retyped.

### Construction Timeline (signature)
Five numbered circles on one hairline inside the turquoise band, each with a sand duration label, title and two lines of text. On phone the line turns vertical.

### Photo Credit (signature)
Every pool photo or group of photos carries one fixed line underneath, never on top: "Piscine espositive Piscine Rocks Design, in Lombardia." / "Piscine Rocks Design display pools, in Lombardy." (`CreditoFoto.jsx`, 12px, Text Quiet). The photos are the manufacturer's display pools; the line says so every time, in the same words.

## Do's and Don'ts

### Do:
- **Do** let photographs carry the colour; keep the interface night-sea, turquoise and sand.
- **Do** keep every interactive element pool turquoise (#38c6c0) and nothing else turquoise.
- **Do** use the 8px / 14px / pill radius rule exactly as written in Shapes.
- **Do** separate sections by background tone, not by lines.
- **Do** keep one filled "Chiedi un preventivo" per view, with the same label everywhere (the only variant is "Richiedi una proposta" on the hotel page; form submits say "Invia la richiesta").
- **Do** put the photo credit line under every pool photo or gallery.
- **Do** run every transition on `cubic-bezier(0.22, 1, 0.36, 1)` and honour reduced motion.

### Don't:
- **Don't** add a second accent colour, gradients on text, glows or glass effects.
- **Don't** place badges, labels or captions on top of photographs.
- **Don't** add shadows to elements at rest.
- **Don't** load fonts, icons or scripts from third-party servers for the visual layer.
- **Don't** put a small uppercase label above every heading.
- **Don't** present the photos as Luna's own or Sicilian builds; they are Piscine Rocks Design display pools in Lombardy, and captions, titles and alt text say only what is visible. No "Realizzazioni", no "ultimata", no watermark carrying Luna's name.
