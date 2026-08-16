# mrityunjoy.com

Personal CV site for Mrityunjoy Das — a single scrolling page built to read well
to people, search engines, and applicant-tracking systems.

Live: https://mrityunjoy.com

## Stack

- **Next.js 16** (App Router, TypeScript) — every route is statically prerendered
- **Tailwind CSS v4** with CSS custom properties for the light/dark palette
- **IntersectionObserver + CSS transitions and keyframes** for all motion, plus a
  scroll-driven progress bar behind `@supports` (no animation library)
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
4. **Light is the default theme.** The OS `prefers-color-scheme` is deliberately
   ignored — dark applies only when `data-theme` is set on `<html>`.
   (`components/ThemeToggle.tsx` still exists but is mounted nowhere, so today
   that only happens via a stored `localStorage.theme`.)
5. **Colour tokens only.** Never hardcode a colour in a component — add a token
   in `globals.css` and define it in both palette blocks (`:root` and
   `[data-theme="dark"]`). The two exceptions are commented where they sit: the
   client lettermark chip and the dark-mode sheet behind the hero portrait, both
   of which need a fixed light ground in either palette.
6. **One width for every section.** The nav, hero, every `<Section>` and the
   footer all use `max-w-6xl px-5 sm:px-8`, so the page has a single left edge.
   Long-form text is capped at `max-w-[68ch]` inside that container rather than
   by narrowing the container itself.

### Animation

All motion is CSS driven by one `IntersectionObserver` in `components/Reveal.tsx`.
No library, and nothing here may start depending on one.

- `Reveal` has three modes. `rise` fades and lifts the block. `stagger` leaves
  the block still and lifts its direct children on an `nth-child` ladder in
  `globals.css`, **capped at seven** — past that the ladder out-runs the scroll.
  `hold` has no motion of its own and exists only to tell the words inside a
  heading when they are on screen. `as` picks the tag, so the wrapper can be a
  `ul`/`ol` instead of emitting a `div` inside a list.
- `components/SplitWords.tsx` splits section headings into per-word masks. **The
  space between words must stay a plain text node between the masks.** Put it
  inside a mask and `overflow: hidden` collapses it, which quietly turns
  "Products and systems" into "Productsandsystems" for copy-paste and for the
  accessible name. Note this does mean a multi-word heading is no longer one
  contiguous string in the raw HTML — grep the DOM's text, not the markup.
- The scroll progress bar is CSS-only behind `@supports (animation-timeline:
scroll())`. Deliberately not a scroll listener: that would put main-thread work
  on every frame for a decorative hairline.
- **The `prefers-reduced-motion` block forces every animation to its _final_
  frame, not to nothing.** Any new `@keyframes` must therefore be neutralised
  there by name, or it ships in its end state for the readers who asked for
  less motion.
- The **section icons** drift their own SVG shapes on a stagger, so each mark
  moves out of its own construction — Layers ripples through three chevrons,
  Mail through envelope and flap. One rule in `globals.css` covers all eight;
  no per-icon code.
- The other thing that moves on its own is the **availability lamp** in the hero. It pulses
  without a pause control because WCAG 2.2.2 governs moving _information_, and
  the lamp is `aria-hidden` and says nothing the sentence beside it does not —
  stop it and nothing is lost. It still stops under `prefers-reduced-motion`.
- **Anything that moves and does carry meaning needs a keyboard-reachable pause
  control.** Hover-pause does not count: it is unreachable by keyboard and by
  touch, and Lighthouse does not check, so the score would sit at 100 while the
  page regressed. Scope the animation to `html.js` — the same condition as the
  button — so motion and control cannot ship apart.

### Disclosures

`components/Disclosure.tsx` is the "See more" on a long recommendation and the
"Case study" on a project card. **The disclosed content deliberately sits outside
the `<details>`** — inside a closed one it would be `display: none`, and both the
quotes and the case studies have to stay in the DOM and in the accessibility tree
whether or not anyone opens them. So the `<details>` is an empty, native,
keyboard-reachable control, and `:has(.disclosure[open])` releases a `max-height`
clamp on its sibling (`.rec-quote`, `.proj-body`).

Two consequences worth knowing before changing it:

- The open height is a **ceiling, not a measurement** — `max-height` cannot
  transition to `content`. Prose longer than the ceiling gets silently clipped, so
  raise it if a case study grows.
- The clamp is a screen affordance. Every disclosure is forced open in
  `@media print`, or Cmd-P would drop the case studies and truncate a quote.

## Deployment

Hosted on Vercel; pushes to `main` deploy automatically. The custom domain is
configured in the Vercel project settings.

Verified before launch: Lighthouse 96 performance / 100 accessibility /
100 best-practices / 100 SEO, CLS 0.
