# Design system

Verified from `client/src/styles/geode-tokens.css`, `client/src/components/shadcn`, and `client/tailwind.config.js`. This file does not change the UI.

## Color

Geode ramps are defined on `.geode` and `html[data-geode-skin]`.

- Brand lime: `#c6ff80` through `#305700`. Action is brand step 3 (`#8dff00`). Action text and ink are `#111f00`.
- Neutrals: `#f0f0f0` down to `#292929`. Page background is neutral 1. Cards are `#ffffff`. Borders are neutral 2. Muted text is neutral 5.
- Semantic: success, error (`#eb0a2f`), alert, and info ramps are in the same file.
- Charts use the data pink and cyan ramps, plus brand and accent purple.

Inside the staff shell, older names such as `--color-primary-100` and `--color-background-100` point at these ramps. `tailwind.config.js` still has its own red, teal, and grey literals for older screens. That split is real. New work uses the Geode variables.

## Type

Gilroy is `--geode-font-sans`. Heading weight 500, body weight 400. Sizes: display 2rem, h4 1.5rem, body and h6 1rem, small 0.875rem. Line height 1.15 for tight headings and 1.35 for body.

## Space, radius, controls

Space steps are 0.25, 0.5, 0.75, 1, 1.5, and 2rem. Card padding is 1.5rem. The sidebar token is 15rem.

Radius: cards 0.75rem, controls 0.5rem. A pill token exists. The shadcn button in `client/src/components/shadcn/button.jsx` uses `rounded-md` and a 36px default height (`h-9`), with `sm` at 32px and `lg` at 40px.

Focus color is `#111f00`.

## Icons and chrome

Icons are exported from `client/src/components/geode/icons.js` (Lucide, plus the small set that file already wraps). The staff shell is `GeodeAdminLayout`. Do not mount a second shell inside a page.

## Primitives

`client/src/components/shadcn` contains button, card, badge, dialog, dropdown menu, popover, tooltip, tabs, switch, toast, avatar, table, data table, and data grid. The product button in `client/src/components/Buttons/Button.jsx` delegates to that button.

Tabs used by jobs and profiles are `client/src/components/ui/Tabs.jsx`, which renders the shadcn tabs. Toggles used by settings, teams, and questions go through `client/src/components/ui/ToggleSwitch.jsx` or the shadcn switch.

## Forms, tables, feedback

Forms use React Hook Form and the shared inputs. Tables use the shadcn table and data grid. Toasts are the Radix toaster. Loading uses the existing loader components. Empty job lists use the empty card already on the jobs page.

## Known inconsistency

Many pages still carry older Tailwind class names. The design-system lint counts them and refuses to let the count grow. Do not "fix" that by reformatting the app in an unrelated change.

Dark mode is configured in Tailwind as `data-theme="dark"` and is not the product skin.

A Figma frame is mentioned in the token file comment (Done / Colors). No Figma URL or MCP auth is stored in the repo. Treat the token file as the source until a Figma file is linked.
