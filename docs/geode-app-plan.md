# Plan for this version of Geode

The light product is the Done / Dashboard frame in the Figma file [Geode Product UI Mockups](https://www.figma.com/design/MbRVGw4bqJ9pWzAe6Borka/Geode-%E2%9F%A1-Product-%E2%9F%A1-UI-Mockups?node-id=11415-199). File key `MbRVGw4bqJ9pWzAe6Borka`.

Agents follow `AGENTS.md`. This file is the order of work. A screen is not migrated by adding padding classes to the page that exists today.

## Source frames

| Frame | Node | What we take from it |
| --- | --- | --- |
| Dashboard, light | `11415-199` | Shell, board, type, cursor, wordmark |
| Colors | `11206-827` | Brand, accent, neutral, data, and semantic ramps |
| Background | `11308-2838` | BG lattice used by banners |
| Buttons | `11243-10558` | 36 / 44 / 56px controls, already the button sizes |

The file is view-only from this environment. There is no Figma token, so vectors cannot be exported from the API. The wordmark in the repo is a trace of the light sidebar at 400%. Replace `client/src/assets/geode/logo.svg` with the designer SVG when an export is available. Do not ship a screenshot of the browser as an asset.

The assessment banner and the admin-login banner are illustrations on their own pages (`banner > assessment`, `Banner > Admin Login`). They are not in the repo. Export those two frames before building the auth or assessment empty states. Do not redraw the character.

## Already in place

- Tokens, one card padding, full-height sidebar, dashboard board, ink cursor.
- `/preview/geode-dashboard` for the dashboard fixtures.
- `/preview/geode` for a fixture admin shell. It does not render the team's pages.
- The real admin, hiring-manager, and design-reviewer routes use `GeodeAdminLayout` on the rebrand staging branch. `prod-main` is still the live site. Logout, permissions, and page data are unchanged. The old color variables inside the shell point at the Geode ramps. Radix provides the account menu and the dialog primitive.
- `App` sets `data-geode-skin` and wraps every route in `.geode`, so the candidate site and public pages use the same type, color, buttons, cards, and fields. Text inputs, textareas, and selects get a neutral fill, a neutral-4 border, and ink type. Decorative photos are replaced with solid panels or a dashed placeholder. The wordmark is the word “Geode” until a logo file is supplied. Uploaded profile photos and assessment question images stay, because those are product data.
- There is no MUI. Menus, dropdowns, tooltips, date and time fields, and data tables are the shadcn/Radix primitives in `client/src/components/shadcn`, skinned with Geode tokens. Icons are imported only from `client/src/components/geode/icons.js` (Lucide, plus the Google mark). Do not add `@mui`, `react-icons`, or a direct `lucide-react` import in a screen.
- Color ramps below, in `client/src/styles/geode-tokens.css`.
- Wordmark rendered by `GeodeLogo`. Banner pattern owned by `GeodeBanner` (`.geode-banner`).
- Application Trends plot inset is a fixed grid with `containLabel`, not a percentage left gutter.

## Color ramps

Sampled from the Colors frame. A screenshot compresses color by about a step, so a later variables export should replace these hexes in the token file only.

Brand: `#c6ff80` `#afff4c` `#8dff00` `#6ec700` `#4f8f00` `#305700`. Action is step 3 (`#8dff00`). Hover is step 4. Ink is `#111f00`.

Accent: `#a897f9` `#856cf5` `#6242f2` `#4d34bd` `#372589` `#221754`.

Neutral: `#f0f0f0` `#e4e4e4` `#bfbfbf` `#999999` `#747474` `#4e4e4e` `#292929`. Page background is neutral 1. Cards are white. Border is neutral 2. Muted text is neutral 5.

Data 1: `#ffb2ff` `#ff8cff` `#d273d2` `#a55ba5` `#794279` `#4c2a4c`.

Data 2: `#86f9fd` `#1bf5fd` `#0d7478` `#08494b`. The Figma chrome blue `#0d99ff` is not a product color.

Chart series, in order: data 1 step 2, data 2 step 2, brand step 3, accent step 3, data 1 step 4.

Success: `#ebfeee` `#0ef129` `#00850f` `#04430b`.

Error: `#fef0f3` `#eb0a2f` `#b2001e` `#480510`.

Alert: `#fdf3c9` `#ffd91a` `#8b4f00` `#472700`.

Info: `#ecf4fe` `#096ff6` `#03459b` `#022c64`.

## How a screen moves over

1. Add or extend a component so the spacing, type, and color for that UI live in one place.
2. Compose the screen from those components. The page file chooses data and order. It does not choose padding.
3. Render it under `/preview/geode` with fixtures. No mutating API calls.
4. When the preview matches the frame, point the real route at the same components. Do that only for the screen being migrated, on this branch.
5. If a count in `client/ds-baseline.json` falls, lock it with `node scripts/ds-audit.mjs --update`. Do not raise a count.

Do not wrap an unmigrated page in `GeodeShell`. The team's layout is still on those routes, and a second shell doubles the sidebar.

Replace `Header`, `Container`, `StyledCard`, and the old `Button` with the shadcn pieces before migrating the screens that use them. Call sites then inherit spacing instead of each page passing its own.

## Order of screens

1. Dialog, dropdown, select, field, toast, and switch live in `client/src/components/shadcn` and wear the tokens. The real calendar stays the product calendar. Do not rebuild it as a styled page.
2. Jobs: list, create, edit, view, then assessments.
3. Candidates, including future gems and parked.
4. Calendar, teams, guide.
5. Settings, profile, company.
6. Auth screens, using `GeodeBanner` once the login illustration is exported. Until then the banner uses the lattice from the Background frame (`client/src/assets/geode/grid.svg`). BG 1–5 in Figma are density variants of that lattice. One tile is in the repo. Do not invent four more patterns from the zoomed-out frame.
7. Design-reviewer reviews, then the candidate site, then public pages.

## Chart inset

Application Trends used `grid.left: 14%` plus a 56px gap for the rotated "Candidate Applications" title. The percentage and the gap stacked, so the line sat in a wide empty column. The plot now uses a 56px left inset and a 40px name gap, with `containLabel`. The title occupies that inset, beside the tick labels, and the line uses the rest of the card. The x-axis title uses a 28px bottom inset so "Months" stays visible. Height stays `.geode-trend-chart`. Do not put a percentage gutter or a pixel height back on the JSX.

## Still the team's behavior

Routes, permissions, forms, and data fetching stay as the team wrote them. `AdminLayout.jsx` is unused. Do not add a second shell around a page that `GeodeAdminLayout` already wraps. Illustrations the designer has not exported (login character, assessment banner, a replacement wordmark) stay the current assets.
