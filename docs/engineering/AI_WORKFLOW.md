# AI workflow

Use the smallest context that still sees the real pattern.

## Where instructions live

| Kind | Path | When it loads |
| --- | --- | --- |
| Always | `.cursor/rules/00-core-engineering.mdc` | Every task. Keep it short. |
| Scoped rules | `.cursor/rules/*.mdc` | When the matching files are in the edit, or the description fits. |
| Product UI | `AGENTS.md`, `.cursor/skills/geode-standards`, `.cursor/skills/geode-ux` | Any visual change. |
| Official skills | `.agents/skills/` | When the task matches the skill description. Not every turn. |
| Custom skills | `.cursor/skills/` | When the task matches the description, or the user names the skill. |
| Facts | `docs/engineering/` | Read the one doc the task needs. Do not read all of them. |

`skills-lock.json` records the official skill hashes. `npx skills@1.7.4 list` shows those installs. Custom skills stay in `.cursor/skills` next to the Geode skills the project already had.

## Which skill

| Task | Skill |
| --- | --- |
| Add or change a feature | `feature-delivery` |
| New or restyled UI | `design-system-governance`, then Geode standards |
| Accessibility or UX review | `ux-accessibility-review` |
| React render or bundle work | `vercel-react-best-practices` (skip Next.js) |
| Component API shape | `vercel-composition-patterns` (skip React 19) |
| Release or risk review | `production-readiness-audit` |
| Registry component lookup | `shadcn`, cwd `client/`, CLI `shadcn@4.23.0` |

Do not open every skill for a one-line edit.

## How big the task is

- A small edit: read the file, change it, run `npm test` or `npm run lint:ds`.
- A screen or endpoint: read the route, the permission, and the controller. Then implement.
- A cross-cutting change: write the acceptance check first and land it in steps. Run `npm run check` at the end.

Use a fast model for a local edit. Use a stronger model for auth, data scoping, or a bug you cannot reproduce from the code alone.

## MCP

`.cursor/mcp.json` starts the shadcn MCP server with `shadcn@4.23.0` and `cd client`, because `components.json` is not at the repo root. Enable it in Cursor Settings. A restart may be required before the tools appear. This setup started the process locally and did not install components.

Figma is not connected. No token is stored. To add it later, use the official server at https://developers.figma.com/docs/figma-mcp-server/ and authenticate in Cursor. Do not paste a Figma token into the repo. Until a file URL is linked, `client/src/styles/geode-tokens.css` is the visual source.

No database, email, or payment MCP server is configured.

## Checks

From `client/`:

- `npm run check` runs the design-system ratchet and the Node tests.
- `npm run lint` is the legacy ESLint run. It fails today. See `BASELINE.md`.
- `npm run test:smoke` needs a local preview build and does not belong on every keystroke.
- `npm run build:prod` needs a larger Node heap. CI sets `--max-old-space-size=6144`.

There is no Prettier script. Formatting the existing client would be a separate change. Do not reformat unrelated files to satisfy a formatter that is not installed.

## Conflicts

Geode tokens and `AGENTS.md` beat `frontend-design` and the generic shadcn color advice. React 18 and Vite beat Next.js examples inside the Vercel skills.
