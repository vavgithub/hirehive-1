# Baseline

Recorded 29 Oct 2026 on Node v22.23.4. The working tree was clean on `cursor/geode-rebrand-app-7844` before this setup.

## Stack

- Client: Vite 5.2, React 18.2, React Router 6.23, JavaScript (`client/jsconfig.json` path alias only). No `tsconfig`.
- Styling: Tailwind CSS 3.4, `tailwindcss-animate`, class-variance-authority, `clsx`, `tailwind-merge`.
- UI: Radix primitives in `client/src/components/shadcn`. `client/components.json` has `rsc: false`, `tsx: false`, style `default`.
- Server state: TanStack Query 5. Client state: Redux Toolkit. Forms: React Hook Form. No Zod.
- API client: Axios. Errors: Sentry.
- Server: Express 4.18, Mongoose 8, JWT in an httpOnly cookie, Passport Google, Helmet, Multer, AWS S3 and SES, Cloudinary.
- Package manager: npm. Lockfiles: `client/package-lock.json`, `server/package-lock.json`. No root package.
- Deploy workflows use Node 18. Local checks and the new CI workflow use Node 22. There is no `engines` field.

## Architecture

The client is a single-page app. `client/src/Router.jsx` defines public, candidate, admin, hiring-manager, and design-reviewer routes. `GeodeAdminLayout` is the signed-in staff shell. The API is mounted from `server/index.js` under `/api/v1`.

## Quality checks before this setup

| Check | Result |
| --- | --- |
| `npm run lint:ds` (`client/`) | Pass. Counts matched `ds-baseline.json` (31 style attributes, 319 arbitrary utilities, 77 color literals, 0 MUI, 0 `sx`). |
| `npm run lint` (`client/`) | Fail. 2043 problems (1949 errors, 94 warnings). Pre-existing. Mostly `no-unused-vars` and `react/prop-types`. |
| Typecheck | Not available. The app is JavaScript. |
| Unit tests | None. |
| `npm run test:smoke` | Run after the setup, against the local staging preview, with no credentials. 4 passed (staff login, terms, both Geode previews). 4 failed in `critical-flows.spec.js`. The public home stayed on a loader, and unauthenticated app routes ended on `/unauthorized` (a 404 screen) instead of the login URL the test expects. The preview has no API. These failures were not caused by the new tests or rules. |
| `npm run build:staging` | Fail on the default Node heap (out of memory while rendering chunks). Pass with `NODE_OPTIONS=--max-old-space-size=6144` in 18s. Main chunk about 5.5 MB (about 1.7 MB gzip). |
| Formatter | None. |
| CI | Deploy workflows only. `deploy-frontend.yaml` runs `lint:ds` before a production deploy. |

## AI configuration that already existed

- `AGENTS.md` for product UI.
- `.cursor/skills/geode-standards` and `.cursor/skills/geode-ux`.
- No `.cursor/rules`, no `.cursor/mcp.json`, no `CLAUDE.md`.

## Risks already present

- `npm run lint` does not pass. Turning on new lint rules would add noise, not a gate.
- One client chunk is about 5.5 MB.
- `npm audit`: client 2 critical, 25 high. Server 6 critical, 18 high. Critical names are recorded in `SECURITY.md`. They were not upgraded here.
- A cookie-session key is hardcoded in `server/index.js`. See `SECURITY.md`. The value is not repeated in these docs.

## What this setup adds

Project skills, Cursor rules, engineering docs, a shadcn MCP entry, a Node test for the permission map, `npm test` and `npm run check`, a non-deploy CI workflow, and Dependabot.

## What this setup does not add

TypeScript, Prettier across the app, a second test runner, an ESLint rewrite, dependency upgrades, a visual redesign, or a change to deploy workflows.
