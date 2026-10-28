---
name: geode-standards
description: Keep Geode UI changes inside the design system. Use when editing client UI, tokens, shadcn primitives, tables, toasts, buttons, or when a screen needs new spacing, color, or type.
---

# Geode standards

Read `AGENTS.md` and `docs/geode-app-plan.md` before editing product UI.

## Where a change lives

- Color, type, space, radius, control height, cursor, card padding: `client/src/styles/geode-tokens.css` only.
- A repeated control: `client/src/components/shadcn`, skinned with those tokens. Menus, dialogs, selects, popovers, tooltips, tables, toasts, and switches are Radix primitives there.
- The product `Button`, `StyledCard`, `Header`, and `Container` stay the shared controls. Their skin is the token layer. Do not restyle a page by importing a second button.
- Icons come only from `client/src/components/geode/icons.js`.

A page chooses data and order. It does not choose padding, type, or color.

## Do not add

- `style={{}}`
- `@mui` or `sx`
- `react-toastify`, `react-icons`, or a direct `lucide-react` import
- Arbitrary Tailwind (`w-[340px]`, `text-[#111]`, `data-[state=checked]:`)
- Hex or `rgba()` in JS or JSX. Chart fallback is `'currentColor'`. CSS tokens may use hex.

`npm run lint:ds` from `client/` must not raise `client/ds-baseline.json`. If a count falls, lock it with `node scripts/ds-audit.mjs --update`.

## Behavior

Routes, permissions, forms, and data fetching stay. Do not change modal action types. Do not wrap a page in a second `GeodeShell`. Preview routes do not call mutating APIs. `prod-main` is the live site. This skin ships on `rebrand`.
