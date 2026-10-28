# Geode production UI

Read this before changing product UI. The rollout order is in `docs/geode-app-plan.md`.

The product look is a design system. A page composes components. It does not restyle them.

## Where visual decisions live

`client/src/styles/geode-tokens.css` is the only place for font, color, space, radius, control size, cursor, logo size, card padding, and the chart inset. Change the token. Do not set a new value on a page.

Shared components own spacing:

- `Card` applies `--geode-card-padding` (`p-geode-card`). Do not pass `p-*`, `m-*`, `gap-*`, `px-*`, or `py-*` to a card, a page section, or a chart.
- `Button`, `Tabs`, `Table`, and `GeodeShell` own their own padding, type, and cursor.
- `GeodeLogo` owns the wordmark size. `GeodeBanner` owns the background pattern and its padding.
- Layout placement that the dashboard grid needs (`.geode-board`, `.geode-board-trends`, `.geode-board-rail`, `.geode-board-wide`) is a class in the token file, not a one-off utility.

Text next to text aligns to the baseline. A color swatch aligns to the middle of its label. Baseline alignment puts a rectangle on the text baseline, which is the wrong relationship for a swatch.

## What a page is not allowed to do

- No new `style={{}}`.
- No new `@mui/*` imports, and no `sx`.
- No arbitrary Tailwind (`p-[13px]`, `w-[340px]`, `tracking-[0.08em]`, `text-[#111]`).
- No hex or `rgba()` in JS or JSX. A chart fallback is `'currentColor'`.
- No page-level font size, line height, letter spacing, radius, or color.
- No `cursor-pointer` inside `.geode`. The ink cursor is set from the tokens and wins on purpose.

`npm run lint:ds` (from `client/`) is a ratchet against `client/ds-baseline.json`. If a count goes down, run `node scripts/ds-audit.mjs --update` and commit the baseline. Do not raise a count to land a screen.

## Components

Use the pieces in `client/src/components/shadcn` (Radix, CVA, `cn` from `client/src/lib/utils.js`). A menu, dialog, select, popover, toast, switch, or calendar is a Radix primitive. Do not build a new one from a `div`. Call sites keep the existing helpers (`showSuccessToast`, `showErrorToast`, the product `Button`) so a visual change does not rewrite every page.

## Skills

Before a UI change, read:

- `.cursor/skills/geode-standards/SKILL.md` for the design-system ratchet and where a change is allowed to live.
- `.cursor/skills/geode-ux/SKILL.md` for type, color, alignment, tables, toasts, and the action color.

Charts read colors with `useGeodeToken`. That helper resolves token chains to a real color. Chart height and the plot inset are `.geode-trend-chart` and `.geode-stage-chart` in the token file. ECharts `grid` is a fixed inset with `containLabel`, never a percentage gutter.

Images live in `client/src/assets/geode` and are rendered by a component. Do not size an `<img>` from the page.

## Isolation

`/preview/geode-dashboard` and `/preview/geode` are fixture surfaces. They do not call mutating APIs.

The functioning admin app wears this skin on the `rebrand` branch, which deploys to the rebrand preview site. `prod-main` stays the live application. `GeodeAdminLayout` is the real admin, hiring-manager, and design-reviewer shell. It keeps the same routes, permissions, and logout. Pages keep their data and actions. Inside that shell, the old color variables point at the Geode ramps, so existing screens inherit the palette without a per-page padding pass.

Do not wrap a page in a second `GeodeShell`. The layout already provides it. Do not target `prod-main` with this skin.

Do not put secrets in the client. Do not log tokens or session data.

## Engineering setup

Product UI still follows this file. Broader agent setup lives in `docs/engineering/AI_WORKFLOW.md`. Rules are `.cursor/rules`. Official skills are `.agents/skills`. Project skills are `.cursor/skills`. The client check is `npm run check` in `client/`.
