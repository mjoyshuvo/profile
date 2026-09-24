# mrityunjoy.com

Personal CV site for Mrityunjoy Das — a single scrolling page built to read well
to people, search engines, and applicant-tracking systems.

Live: https://mrityunjoy.com

## Stack

- **Next.js 16** (App Router, TypeScript) — every route is statically prerendered
- **Tailwind CSS v4** with CSS custom properties for the light/dark palette
- **Motion** (`motion/react`) for pointer and scroll-linked motion — the nav
  pill, photo tilt, magnetic buttons, swipe deck, scroll-lit words — and
  **IntersectionObserver + CSS** for entrance reveals
- **lucide-react** for UI icons; brand marks are inlined in `components/BrandIcons.tsx`

## Editing the content

All copy lives in `content/` — the components are presentational, so you never
need to touch JSX to update the CV:

| File                         | What it holds                                                     |
| ---------------------------- | ----------------------------------------------------------------- |
| `content/profile.ts`         | Name, headline, summary, stat row, contact details, social links  |
| `content/identity.ts`        | The three Engineering identity pillars                            |
| `content/experience.ts`      | Roles, dates, and bullet points                                   |
| `content/projects.ts`        | Case studies for Products and systems (`gist` is the resting row) |
| `content/recommendations.ts` | Transcribed LinkedIn recommendations                              |
| `content/skills.ts`          | Skills, grouped by category                                       |
| `content/education.ts`       | Degrees                                                           |
| `content/writing.ts`         | Published pieces                                                  |

Adding a recommendation means appending one entry to `content/recommendations.ts`.
The section renders a single quote as a plain card with no client JavaScript; at
two or more it becomes a tabbed deck with an avatar rail on its own. `avatar` is
optional — without a file it falls back to an initials monogram, so words can
land before photos do.

`public/Mrityunjoy_Das_Resume.pdf` is the downloadable résumé — replace the file
to publish a new version; the link and filename stay the same.

### Known TODO

`profile.links.stackoverflow` is empty. Paste the real profile URL to show the
link in the hero and add it to the JSON-LD `sameAs` list.

## Development

```bash
npm install
npm run dev
```

Port 3000 may be taken; `PORT=3100 npm run dev` works too.

Production build and serve:

```bash
npm run build && npm start
```

## Design constraints

These are deliberate — please keep them when changing the site:

1. **Everything renders server-side.** No content may depend on client-side
   JavaScript. `curl localhost:3000 | grep Greenfact` must find the text, and so
   must a fragment of every recommendation — including the ones the deck is not
   currently showing.
2. **One `<h1>`**, an `<h2>` per section, real `<ul>/<li>` bullets. ATS parsers
   read the markup, not the design.
3. **The scroll reveal must never hide content.** The hidden state is scoped to
   `html.js` and disabled under `prefers-reduced-motion`, so a reader without
   JavaScript or with motion reduced sees the full page.
4. **Light is the default theme.** Dark applies only when `data-theme` is set
   on `<html>` — by the toggle at the end of the nav pill, a stored
   `localStorage.theme`, or the OS preference on a first visit. The toggle
   reveals the new palette in a circle from the button (View Transitions API),
   and swaps instantly where that API is missing or motion is reduced.
5. **Colour tokens only.** Never hardcode a colour in a component — add a token
   in `globals.css` and define it in both palette blocks (`:root` and
   `[data-theme="dark"]`). The exception is commented where it sits: the client
   lettermark chip, which needs a fixed light ground in either palette.
6. **One width for every section.** The nav, hero, every `<Section>` and the
   footer all use `max-w-6xl px-6 sm:px-8`, so the page has a single left edge.
   Long-form text is capped at `max-w-[68ch]` inside that container rather than
   by narrowing the container itself.
7. **One vertical scale.** Sections are `py-12 sm:py-20`, the heading row is
   `mb-6 sm:mb-8`, and the anchor offset is `scroll-padding-top: 4.5rem` on
   `<html>` — the floating nav pill and its gap, and nothing more. Jump targets carry no
   `scroll-mt-*`: it stacks on the scroll padding and on the section's own top
   padding, and the heading lands an inch down an empty screen.

### Animation

Entrance reveals are CSS driven by one `IntersectionObserver` in
`components/Reveal.tsx`. Pointer- and scroll-linked motion uses **Motion**
(`motion/react`), with shared curves in `lib/motion.ts` and
`<MotionConfig reducedMotion="user">` in `components/motion/MotionProvider.tsx`.

- **No hidden start state in Motion props.** Motion writes `initial` styles into
  the server HTML, so `initial={{ opacity: 0 }}` would hide content from a
  reader without JavaScript. Hidden start states live in CSS under `html.js`;
  Motion only drives transforms and CSS variables whose reading rule is also
  scoped to `html.js` (see `.scroll-word`).
- `Reveal` has three modes. `rise` fades and lifts the block. `stagger` lifts
  its direct children on an `nth-child` ladder, **capped at seven**. `hold` has
  no motion of its own and only tells what is inside it that it is on screen
  (section headings, the teal rule under them, the bars on project cards).
- `components/SplitWords.tsx` splits section headings into per-word masks.
  **The space between words must stay a plain text node between the masks**,
  or `overflow: hidden` collapses it.
- **Hero.** The triad rises letter by letter from its line masks (`.hero-ch`).
  `components/PhotoCard.tsx` sets the cut-out photo
  (`public/mrityunjoy-das-cutout.webp`) in a circle over a teal glow, with a
  dashed ring, pointer tilt, scroll drift and three glass chips. The chips carry
  words, so they arrive once and hold still.
- **Nav.** A floating glass pill (`components/Nav.tsx`). The active link's
  background is one element handed between links by a shared `layoutId`. The
  pill tucks away on scroll down and returns on scroll up. The reading-progress
  line on its lower edge is a sprung `useScroll`.
- **Magnetic buttons** (`components/motion/Magnetic.tsx`) pull towards a fine
  pointer and do nothing on touch.
- **Projects.** From `md` up the cards pin and stack; `components/StackEffect.tsx`
  feeds `--stack` so the covered card shrinks and dims. Any open case study
  turns the stacking off. `components/ProjectFigures.tsx` draws before/after
  bars from each project's `stats` (pairs under a 5% ratio stay in the case
  study tiles only) and count blocks from `counts`.
- **Experience** is a metro line (`components/CareerRail.tsx`): one station
  per company at its start month, the line filled to the selected company,
  and the current role's stretch dashed and moving towards "Now". From `sm` up
  the stations are tabs over one bento panel; on a phone the list itself is a
  vertical line and the selected row opens in place. Every panel is
  server-rendered; without JavaScript the line is hidden and all companies are
  listed. Each role's `highlights` in `content/experience.ts` must restate
  numbers already in its bullets; they count up (`components/CountUp.tsx`)
  from the final value the server rendered, on teal piano keys (`.piano` in
  `app/globals.css`) that drop in, play a run and press under the pointer.
  Each position card has a month ruler (`MonthRuler`): one tick a month, the
  position's months in teal, a playhead at its end; the ticks rise in a wave
  and name their month under the pointer. Both are CSS only. Bullets past the
  third fold behind a `Disclosure`, still in the DOM.
- **Engineering identity** is a stack of layers (`components/IdentityStack.tsx`):
  AI on data on backend, dots running between them. `tags` in
  `content/identity.ts` must only name tools the body names.
- **Skills** is a filter board (`components/SkillsBoard.tsx`). Filtering fades
  tiles; it never removes them.
- **Certifications** show how much validity is left, computed at build time
  from `issued` / `expires`, so a redeploy keeps it true.
- **Writing** is an index of large titles (`components/WritingIndex.tsx`); the
  hovered or focused post's cover shows beside the list on desktop and inline
  on phones.
- **Recommendations** are a spotlight: people on the left, the selected one's
  `pull` sentence and full text on the right. `pull` must be copied word for
  word from `quote`. The quote can be dragged or swiped; inactive panels wait
  to the side (`data-side`) so a switch slides in the direction of travel.
- **Contact.** The closing line lights up word by word as it scrolls in
  (`components/motion/ScrollWords.tsx`); beside it, a contact card that tilts
  towards a fine pointer (`components/ContactCard.tsx`) holds every way to
  reach me, one row each.
- **Writing** sits inside one card; the list can grow, and the cover preview
  is sticky so it stays beside the row it belongs to.
- **Theme in a link.** `?theme=dark` or `?theme=light` on any URL sets the
  theme for that visit. It is read by the pre-paint script in
  `app/layout.tsx` and never saved, so it cannot overwrite a visitor's own
  choice.
- **The `prefers-reduced-motion` block forces every animation to its _final_
  frame, not to nothing.** Any new `@keyframes` must be neutralised there by
  name, or it ships in its end state for the readers who asked for less motion.
- The **availability lamp**, the photo ring and the hero bloom loop without a
  pause control because they are `aria-hidden` and carry no information. They
  stop under `prefers-reduced-motion`.
- **Anything that moves on its own and carries meaning needs a
  keyboard-reachable pause control.** Hover-pause does not count.

### Disclosures

`components/Disclosure.tsx` is the "See more" on a long recommendation and the
"Case study" on a project card. **The disclosed content deliberately sits outside
the `<details>`** — inside a closed one it would be `display: none`, and both the
quotes and the case studies have to stay in the DOM and in the accessibility tree
whether or not anyone opens them. So the `<details>` is an empty, native,
keyboard-reachable control, and `:has(.disclosure[open])` opens its sibling.

- `.proj-body` is a one-row grid that animates `grid-template-rows` from `0fr`
  to `1fr`, so a case study opens to its real height with no ceiling to outgrow.
- `.rec-quote` still releases a `max-height` clamp. That open height is a
  **ceiling, not a measurement**, so raise it if a quote grows past it.
- The clamp is a screen affordance. Every disclosure is forced open in
  `@media print`, or Cmd-P would drop the case studies and truncate a quote.

## Deployment

Hosted on Vercel; pushes to `main` deploy automatically. The custom domain is
configured in the Vercel project settings.

Verified before launch: Lighthouse 96 performance / 100 accessibility /
100 best-practices / 100 SEO, CLS 0.
