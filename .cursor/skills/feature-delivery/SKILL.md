---
name: feature-delivery
description: Deliver a feature in this repo without unrelated rewrites. Use when asked to add a feature, change a flow, or implement a ticket. Use a short path for a small edit and a written plan only when the change crosses several modules.
---

# Feature delivery

## Small edit

One component or one clearly local bug.

1. Read the component and the helper it already uses.
2. Make the smallest change that preserves routes, permissions, and API payloads.
3. Run the nearest check. `npm test` for a pure helper. `npm run lint:ds` for a UI change. Both via `npm run check` when the edit touches either.

## Larger feature

1. Restate the request and the acceptance check in a few lines.
2. Find the page, the route in `client/src/Router.jsx`, the permission in `client/src/config/permissions.config.js`, and the Express route that already serves the data.
3. Reuse a shadcn primitive and a token. Read `.cursor/skills/design-system-governance/SKILL.md` if the UI is new.
4. Note auth and candidate-data risks. Read `docs/engineering/SECURITY.md` if the feature reads another user's record or accepts a file.
5. Implement in steps that can be checked on their own.
6. Add a `node:test` when the change is a pure rule. Add a Playwright case only for a public flow that needs no credentials.
7. Run `npm run check` from `client/`. For a UI change, look at the screen if the dev server is already up.
8. Review the diff for unrelated files, secrets, and drive-by formatting.

## Done

Summarize what changed, what you ran, and any risk you did not test. Do not call the full ESLint script a success. It has a known pre-existing failure, recorded in `docs/engineering/BASELINE.md`.
