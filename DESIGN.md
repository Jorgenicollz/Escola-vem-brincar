# Design system — Vem Brincar

## Direction

Colour chapters. The five colours of the wordmark's letters (purple V, teal E,
blue M, yellow B, pink R) are the school's own material: each section of the
page is a full-width field in one of them, so scrolling the page reads like
spelling the logo. One typeface family for headings, one for text, one grid,
the same left edge in every chapter.

Lead with the school's own photograph of the story with the puppet. Write
specific Portuguese copy about what really happens there; never repeat a fact
in two sections.

## The sticker device

The wordmark's letters are flat colour with a dark outline and a hard dark
shadow below-right. That is the page's one device: photos, buttons, fact pills,
the seal, the form and the footer tiles carry a 3px ink outline and a hard
offset shadow (8px on pictures, 4–5px on small things; pink on the ink field).
Pictures sit slightly tilted, like something stuck on. Buttons press down when
clicked. These shadows are the brand, not decoration; nothing else gets one.

## Palette

| Role | Token | Value | Text on it |
| --- | --- | --- | --- |
| Page ground | `--paper` | `#F6F7F8` | ink |
| Tone step | `--stone` | `#E9EBEE` | ink |
| Ink (the logo's subtitle navy) | `--ink` | `#1F1D3A` | paper |
| Soft ink, secondary notes only | `--ink-soft` | `#4A4766` | — |
| Yellow chapter (B) | `--yellow` | `#FFC83D` | ink |
| Pink chapter and accent (R) | `--pink` | `#EC4F8C` | ink |
| Teal chapter (E) | `--teal` | `#22B39A` | ink |
| Blue chapter (M) | `--blue` | `#149FD6` | ink |
| Blue steps for the ages accordion | `--blue-1…4` | `#0E4E6E` `#0F79A6` `#3FAADB` `#9FD8EF` | paper, paper, ink, ink |

Flat fields only: no gradients, no shadows on things at rest, no hairline
rules. Neighbouring chapters must differ in lightness as well as hue. The
primary button is ink on light fields and yellow on the ink field.

## Type

- Headings: `Baloo 2` 800 (rounded, echoes the wordmark), Arial Rounded / system fallback.
- Text and controls: `Nunito` 400/700.
- Five steps: display `clamp(52px, 7vw, 112px)`, heading `clamp(36px, 4.4vw, 64px)`,
  lead 21px, body 18px, small 14px. Nothing readable under 14px.
- Headlines never wrap past two lines. No eyebrow labels, no tracked
  uppercase captions, no 01/02/03 numbering, no emoji.

## Layout and imagery

- One pair of page margins (`--gutter`), a 12-column grid, sections 120px
  apart inside on desktop, 72px on phones.
- One radius for pictures and panels (28px); buttons are fully round.
- The school's photograph is the hero, shown whole as a portrait.
- Supporting photographs are openly licensed pictures of the same activities
  (credited in the footer). Captions describe the activity and never present
  them as the school's own rooms or children.
- Do not invent testimonials, staff, prices, menus, days of the week or
  policies. Verified facts: ages 3 months to 4 years, open 7h to 19h, address
  Av. Pres. João Goulart, 1413 — Jardim Malia II, São Paulo — SP, 04821-010,
  WhatsApp (11) 98776-4594.

## Interaction and accessibility

- WhatsApp and Google Maps are always one tap away: header button, hero,
  ages accordion (message pre-filled with the chosen age), contact section,
  and a floating button on scroll.
- Visible focus, skip link, real buttons and links, alt text, semantic
  heading order, anchor offset for the sticky header.
- Motion is transform and opacity only, and everything is visible without
  JavaScript and with `prefers-reduced-motion`.
