---
name: design-system-governance
description: Keep UI work on the Geode tokens and the existing shadcn primitives. Use when adding a component, changing styling, or checking for a duplicated button, dialog, table, or input.
---

# Design system governance

Read `AGENTS.md`, `docs/engineering/DESIGN_SYSTEM.md`, and `.cursor/skills/geode-standards/SKILL.md` before editing.

`client/components.json` points the shadcn CLI at this repo. Components are JavaScript, not TypeScript. Primitives are Radix. Do not initialize shadcn again and do not migrate to Base UI.

The official shadcn skill in `.agents/skills/shadcn/SKILL.md` is for registry lookup and composition. Run its CLI from `client/`. If it disagrees with Geode tokens, the tokens win.

## When a new control is requested

1. Search `client/src/components/shadcn` and `client/src/components`.
2. Extend that component if the behavior belongs there.
3. If nothing fits, check the shadcn registry from `client/` with `npx shadcn@4.23.0 search`. Do not add the file if an existing primitive can be composed.
4. Add a primitive only when composition cannot express the control. Match the token file for color, type, radius, and focus.
5. Icons come from `client/src/components/geode/icons.js`.
6. Run `npm run lint:ds` in `client/`. Do not raise the baseline.

## Output

Say which existing component you reused, or why a new one was required. Name the token or variant. Do not redesign neighboring screens.
