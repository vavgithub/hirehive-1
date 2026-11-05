# Security

Reviewed from the code on 29 Oct 2026. No production host was attacked. No user data was changed. Findings are not fixes.

## Model

- Staff and candidate sessions are JWTs in an httpOnly cookie (`server/controllers/admin/auth.controller.js`). `secure` is on when `NODE_ENV` is `production`. `sameSite` is `strict` otherwise and `none` in production. Max age is 30 days.
- `server/middlewares/authMiddleware.js` verifies the cookie and loads the user. `roleProtect` checks the role. Infrastructure failures return 503 instead of a fake 401.
- Helmet is enabled in `server/index.js`, with cross-origin resource policy set to `cross-origin` and COOP set to `same-origin-allow-popups`.
- The client permission map only chooses routes and buttons.
- HTML from users is sanitized in places with DOMPurify on the client and `sanitize-html` on the server. Keep both.
- Uploads (`server/middlewares/uploadMiddleware.js`) allow PDF or Word for resumes (10 MB), WebM for assessment video (50 MB), and JPEG or PNG for profile pictures (5 MB). The extension is taken from the original filename. Files are written under `server/uploads`. `express.static` serves `public`, not `uploads`.

## Critical

`server/index.js` passes a hardcoded string as the `cookie-session` encryption key. The value is in git. Move it to an environment variable and rotate it in a change that updates the deploy environment at the same time. This setup did not change it, because a deploy without the new variable would drop those sessions. The value is intentionally not copied here.

## High

- `npm audit` on 29 Oct 2026: client 2 critical and 25 high (38 total). Server 6 critical and 18 high (76 total). Critical package names: client `form-data`, `tar`. Server `fast-xml-parser`, `form-data`, `protobufjs`, `proxy-addr`, `request`, `tar`. These are not direct dependencies in `package.json`. Do not `npm audit fix` blindly. Review a lockfile update on its own.
- Production cookies use `sameSite: "none"`. That needs `secure`, which the code sets only when `NODE_ENV` is `production`. Confirm staging sets that, or cross-site cookie rules will surprise you. `sameSite=none` also needs a CSRF review for state-changing routes. No CSRF token was found in this pass.
- JSON and urlencoded bodies allow 30 MB (`server/index.js`). That is a denial-of-service lever. Lower it only after checking the largest legitimate payload.

## Medium

- Some admin queries filter on `req.user.company_id` (for example company jobs in `server/controllers/admin/admin.controller.js`). Other routes take `:company_id` or `:candidateId` from the URL. This pass did not prove every handler ignores a foreign id. That review is still open.
- Resume filtering trusts the MIME type the browser sends, and keeps the client extension. A stored file should be downloaded with an attachment disposition and a server-chosen extension.
- `server/middlewares/uploadMiddleware.js` logs field name and MIME type. Do not extend that log to names, emails, or file contents.
- The client bundle will contain every `VITE_` variable. Do not put secrets there.
- Server dependencies include both `bcrypt` and `bcryptjs`, and both AWS SDK v2 and v3. Do not delete them until call sites are counted.

## What was not changed

Cookie flags, the session key, upload rules, Helmet, and dependency versions. Changing them alters production behavior and needs a separate review.
