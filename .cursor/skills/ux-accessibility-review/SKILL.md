---
name: ux-accessibility-review
description: Review a Geode screen for usability and accessibility. Use when asked to review UX, accessibility, keyboard behavior, forms, empty states, or a screen against WCAG. Separates accessibility failures from visual opinions.
---

# UX and accessibility review

Read `AGENTS.md`, `docs/engineering/DESIGN_SYSTEM.md`, and `.cursor/skills/geode-ux/SKILL.md`. For the broader checklist, use `.agents/skills/web-design-guidelines/SKILL.md`. That skill fetches an external guideline page. Do not apply a suggestion that conflicts with Geode tokens or the existing brand.

Standards to judge against:

- Nielsen Norman ten heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
- WCAG 2.2 quick reference: https://www.w3.org/WAI/WCAG22/quickref/
- APG patterns: https://www.w3.org/WAI/ARIA/apg/

## Look at

Hierarchy, labels, navigation, form errors, empty and loading states, focus order, keyboard operation, names for icon-only buttons, contrast of text on the lime action color, and responsive overflow.

Open the screen when a local server is already available. Do not log in with production credentials copied into the chat. Do not submit forms that change hiring data.

## Output

Two lists.

1. Accessibility failures. Cite the WCAG criterion, the element, and a concrete fix.
2. Usability notes. Mark these as judgment. Do not present them as defects unless they block the task.

Do not restyle the screen while reviewing.
