# References

Use the official page for the version this repo actually runs. A blog post does not override that page, and a generic skill does not override `AGENTS.md`.

## How to resolve a conflict

1. The code and `AGENTS.md` describe this product.
2. Official docs for the installed version come next.
3. Skills in `.agents/skills` and `.cursor/skills` are checklists. Skip sections written for a framework this repo does not use.

## Sources

| Topic | Source | Version note |
| --- | --- | --- |
| React | https://react.dev/ | 18.2. Do not use React 19-only APIs. |
| React Router | https://reactrouter.com/en/6.23.0 | 6.23. Not the framework mode in v7. |
| Vite | https://vitejs.dev/guide/ | 5.2. |
| TanStack Query | https://tanstack.com/query/v5 | 5.35. |
| Redux Toolkit | https://redux-toolkit.js.org/ | 2.2. |
| React Hook Form | https://react-hook-form.com/docs | 7.53. No schema library is installed. |
| Express | https://expressjs.com/en/4x/api.html | 4.18. |
| Mongoose | https://mongoosejs.com/docs/guide.html | 8.0. |
| Tailwind | https://tailwindcss.com/docs | 3.4. Not v4. |
| shadcn/ui | https://ui.shadcn.com/ | CLI pinned to 4.23.0 for MCP. Components are already vendored. |
| Radix | https://www.radix-ui.com/primitives/docs/overview/introduction | Primitives in `client/src/components/shadcn`. Do not switch to Base UI. |
| Playwright | https://playwright.dev/docs/best-practices | 1.49, in `client/e2e`. |
| WCAG 2.2 | https://www.w3.org/WAI/WCAG22/quickref/ | For accessibility reviews. |
| WAI-ARIA APG | https://www.w3.org/WAI/ARIA/apg/ | For keyboard patterns. |
| Nielsen Norman | https://www.nngroup.com/articles/ten-usability-heuristics/ | Heuristics, not defects by themselves. |
| OWASP ASVS | https://owasp.org/www-project-application-security-verification-standard/ | Map a finding to a requirement. Do not paste the standard into the repo. |
| Core Web Vitals | https://web.dev/articles/vitals | Goals, not numbers this repo has measured in the field. |
| Cursor rules and skills | https://cursor.com/docs | Rules are `.cursor/rules/*.mdc`. Skills are `SKILL.md` files. |
| Vercel agent skills | https://github.com/vercel-labs/agent-skills | Installed skills are listed in `skills-lock.json`. |
| MCP | https://ui.shadcn.com/docs/mcp | Project config is `.cursor/mcp.json`. |

## Which skill to open

- React performance: `.agents/skills/vercel-react-best-practices`. Ignore Next.js sections.
- Component API shape: `.agents/skills/vercel-composition-patterns`. Ignore React 19 sections.
- Accessibility pass: `.agents/skills/web-design-guidelines`, then `.cursor/skills/ux-accessibility-review`.
- New visual work: Geode docs first. `.agents/skills/frontend-design` only when the task is a new composition and the brand is already fixed.
- Adding a shadcn component: `.agents/skills/shadcn`, from `client/`, without `init` or a preset switch.
- A feature: `.cursor/skills/feature-delivery`.
- A release review: `.cursor/skills/production-readiness-audit`.
