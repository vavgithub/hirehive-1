# Architecture

What the repository does today.

## Layout

- `client/` is the Vite app. Pages live in `client/src/pages/Admin`, `Candidate`, and `DesignReviewer`.
- Shared UI is `client/src/components`, with Radix primitives in `client/src/components/shadcn`.
- Routing is `client/src/Router.jsx`. Staff routes sit under `GeodeAdminLayout`. Candidate routes use `ProtectedRouteCandidate`. Staff routes use `ProtectedRoute`.
- HTTP helpers are `client/src/services`. Role and path maps are `client/src/config/permissions.config.js`.
- `server/` is Express. Routes are `server/routes`. Controllers sit beside Mongoose models in `server/models`. Auth middleware is `server/middlewares/authMiddleware.js`.

## Data and state

Screens load data with TanStack Query or a service call. Redux holds a smaller slice of client state. React context covers auth and onboarding. There is no server-rendered React tree.

The browser talks to `/api/v1/...`. In local dev, Vite can proxy `/api` when `VITE_DEV_API_PROXY` is set. That value is public configuration, not a secret to copy into docs.

## Auth

Staff and candidates authenticate against the Express API. The session cookie is httpOnly. The client also chooses routes with `hasPermission` and `getRoute`. Those functions only hide UI. The server must allow the request.

Roles in the client map: Admin, Hiring Manager, Design Reviewer, Candidate.

## Patterns to reuse

- A new staff screen is a route in `Router.jsx`, a permission entry if the role should see it, and a page that uses the existing shell.
- A new control starts from `client/src/components/shadcn` or the product `Button`.
- A new endpoint follows an existing router: `protect` or `protectCandidate`, then `roleProtect` when the role matters, then a controller that scopes by the caller's company.

## Deploy

Frontend deploy workflows in `.github/workflows` publish the Vite build. The backend has `server/appspec.yml` for its existing deploy path. This setup does not change those workflows. `prod-main` is the live application. The Geode skin is the `rebrand` line.
