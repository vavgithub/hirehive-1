# Performance

Measured on 29 Oct 2026. No field Core Web Vitals data exists in this repo. The goals below are targets, not results.

| Metric | Target at p75 | Measured here |
| --- | --- | --- |
| LCP | 2.5 s | Not measured |
| INP | 200 ms | Not measured |
| CLS | 0.1 | Not measured |

## Build

`npm run build:staging` in `client/`:

- Default Node heap: aborted. `JavaScript heap out of memory` while rendering chunks. Sourcemaps are on in `client/vite.config.js`.
- With `NODE_OPTIONS=--max-old-space-size=6144`: succeeded in about 18 seconds.
- Output: `index-CiKaBteY.js` at 5,549 kB (gzip 1,734 kB) and CSS at 147 kB (gzip 44 kB). Vite warned that the chunk exceeds 500 kB. 3,260 modules were transformed.
- Gilroy is in the bundle (about 144 kB). Several PNG backgrounds are 280–390 kB each.

The chunk hash will change on the next build. The size is the finding.

## What the bundle is carrying

The client dependencies include ECharts, FullCalendar, Lexical, `react-pdf`, `lottie-web` (the build also warned that Lottie uses `eval`), and three date libraries (`dayjs`, `date-fns`, `luxon`). They ship in one Vite entry. There is no server-component boundary to move them across.

## Recommendations, not done here

1. Code-split routes that a visitor does not need on the first paint (PDF, calendar, charts), then rebuild and compare the entry chunk. Small, after a measurement.
2. Keep a single date library when a screen is already being edited. Do not migrate all three in one pass.
3. Add field Web Vitals (the app already has Sentry) before tuning for LCP or INP.
4. Give new images width and height. Do not start a font change. Gilroy is the brand face.

No runtime dependency was added for performance.
