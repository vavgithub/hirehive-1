---
name: geode-ux
description: Apply Geode visual rules so screens match the dashboard shell. Use when adjusting layout, tables, toasts, switches, type, color, alignment, empty states, or when a screen looks unlike the shell.
---

# Geode UX

Match the dashboard shell. A new screen should look like it belongs next to that table, not like a separate theme.

## Type and alignment

- Body and table text use the small token. Headings use the heading weight. Do not invent a one-off size.
- Text next to text aligns to the baseline. A swatch or status dot aligns to the middle of its label.
- Line height comes from the tokens. Do not tighten a single page.

## Color

- Action is brand step 3, the lime. Use it for the primary button, a selected control, and a switch that is on. The knob or label on lime is ink.
- Do not use lime as text or as a small icon on white. Muted text is neutral 5. Body text is ink.
- Success, error, and alert use the semantic ramps. A toast is a white card with that border and a tinted icon, not a gradient.
- Cards are white. Page background is neutral 1. Borders are neutral 2. One card padding, from the token.

## Tables

Use `client/src/components/shadcn/table.jsx`. Muted header, hairline row borders, no zebra, no outer box, no fixed layout. Hover and selection are the muted fill. Footer is the count on the left and pill page controls on the right. Cells stay on one line and the table scrolls. Do not clip a header to fit.

## Controls

- Buttons are pills at 36, 44, or 56px.
- A switch that is on is lime with an ink thumb. Off is neutral.
- Toasts use `showSuccessToast` and `showErrorToast`. Do not mount another toaster.
- Empty decorative art is a solid ink panel or a dashed placeholder until a real asset exists. Uploaded photos and question images stay.

## Motion and focus

Focus is a 2px ink ring. The cursor comes from the tokens. Do not add `cursor-pointer` inside `.geode`.
