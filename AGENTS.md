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

Use the pieces in `client/src/components/shadcn` (Radix, CVA, `cn` from `client/src/lib/utils.js`). A menu, dialog, select, popover, or calendar is a Radix primitive. Do not build a new one from a `div`.

Charts read colors with `useGeodeToken`. That helper resolves token chains to a real color. Chart height and the plot inset are `.geode-trend-chart` and `.geode-stage-chart` in the token file. ECharts `grid` is a fixed inset with `containLabel`, never a percentage gutter.

Images live in `client/src/assets/geode` and are rendered by a component. Do not size an `<img>` from the page.

## Isolation

`/preview/geode-dashboard` and `/preview/geode` are the test surfaces. They use fixtures and do not call mutating APIs.

Do not restyle a screen the team owns by editing that file. Build the replacement from these components, show it on the preview route, and switch the live route only when that screen is intentionally migrated on this branch. Do not wrap an unmigrated page in `GeodeShell`. That stacks two sidebars.

`Router.jsx` and `AdminLayout.jsx` stay as the team wrote them except the preview route registration that is already there.

Do not put secrets in the client. Do not log tokens or session data.
