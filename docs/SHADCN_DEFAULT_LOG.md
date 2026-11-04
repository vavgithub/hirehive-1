# Default shadcn pass

Temporary visual experiment on `cursor/shadcn-default-theme-7844`. The live rebrand site stays as it is until this branch is merged. Reverting is closing this pull request.

Green `#8dff00` is the only theme color. It is `--primary`, `--geode-action`, and `--ring`. Text on that green is `#111f00`. Everything else uses the default shadcn neutral scale: page `#fafafa`, card `#ffffff`, border `#e5e5e5`, text `#0a0a0a`, muted text `#737373`. Radius is `0.5rem` on cards and `0.375rem` on controls. Badges, avatars, and switches are fully round.

## What changed

- Icons go through one library, Lucide, at 16px and stroke 2, in `currentColor`. `IconWrapper` no longer draws a colored tile. The Google mark stays a small brand SVG because Lucide has no official Google logo.
- Buttons use the stock heights: default `h-10`, small `h-9`, large `h-11`, icon `h-10`. Primary is green. Secondary is the light gray shadcn secondary, not black. Outline and ghost match the default variants.
- Tables share one component. Header cells are `h-12 px-4`, body cells are `p-4`, type is `text-sm`. The selected page size is the green primary button.
- Inputs are `h-10`, `rounded-md`, with a green focus ring. Textareas keep a 5rem minimum height.
- The app face is the system sans stack. Gilroy is no longer the default UI face. Heading rules no longer add a forced bottom padding.
- The drawn SVG cursor is gone. The browser cursor is back.
- Staff login, candidate login, and sign-up are a centered card. The photo panel and the fake stat cards on those screens are removed. Sign-in, Google, and forgot-password still run the same handlers.
- Stat cards on jobs and candidates are a shadcn card: label, 16px icon, value. The oversized corner icon and the horizontal scroll strip are gone. The dropdown for the trend is unchanged.
- The admin shell content padding is `p-6`. The sidebar is `w-60` on a white surface. The page behind the cards is the muted gray.
- Switches match the stock size (`2.75rem` by `1.5rem`) with a white thumb. Checked track is green. Checkboxes use the green accent.
- Selected skill chips use the green primary fill.

## Internal screens, signed in

Checked the live admin account on the staging data: dashboard, jobs (open, closed, draft, and a job), a candidate profile, assessments, all candidates, future gems, parked, calendar, teams and a member, guide, settings, and profile.

- Removed the colored fade that sat on top of the candidate stat cards.
- Employment filters (full-time, contract, intern) are the same chip as the other filters, with a 16px icon, instead of stacked icon tiles.
- Job search fields use the shared prefix field. The inline left padding is gone.
- The applications chart keeps its series color. Its height is fixed at 11rem, and the card no longer stretches to match the column beside it.
- Missing photos use the light silhouette, including when the navy file was already saved on a profile. The candidate photo stacks on a narrow screen.
- Phone menu buttons are 44px. Page padding is 1rem below the md breakpoint. Pinch zoom is allowed.

## Left in place

- Routes, auth, permissions, data fetching, and form submissions.
- Chart color ramps. Those series are data, not chrome.
- The public job board layout. It inherits the same type, buttons, inputs, and colors.
- FullCalendar and the rich-text toolbar. Their controls pick up the shared button, icon, and field styles.
