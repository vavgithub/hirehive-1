---
name: production-readiness-audit
description: Audit this hiring app for production readiness. Use when asked for a production audit, a release review, a risk review, or a go-live check. Does not apply the fixes unless asked.
---

# Production readiness audit

Read `docs/engineering/BASELINE.md`, `ARCHITECTURE.md`, `SECURITY.md`, and `PERFORMANCE.md` first. Inspect the code those docs point at. Do not treat the docs as newer than the code.

This is a Vite + React 18 client and an Express + Mongoose API. Skip Next.js and edge-runtime advice.

## Inspect

- Auth middleware and role checks on the server, not only the client permission map
- Organization scoping on candidate, job, and company queries
- Secrets in source, client bundles, and logs
- Upload limits and where files are stored
- `npm audit` in `client/` and `server/` (report counts and package names, not exploit steps)
- `npm run lint` versus `npm run lint:ds` in `client/`
- `npm test` and whether `npm run test:smoke` can run without credentials
- The Vite chunk size from a local build, if a build is possible without raising the heap past the machine
- Error responses that leak stack traces outside development
- Deploy workflows in `.github/workflows` (do not trigger them)

## Output

Group findings as Critical, High, Medium, and Low. For each one include the file, the evidence, a proposed fix, a complexity note (small, contained, or cross-cutting), and how to verify the fix.

Do not edit the application as part of the audit. Do not rotate secrets, deploy, or run against production.
