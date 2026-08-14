# mrityunjoy.com

Personal CV site for Mrityunjoy Das — a single scrolling page built to read well
to people, search engines, and applicant-tracking systems.

Live: https://mrityunjoy.com

## Stack

- **Next.js 16** (App Router, TypeScript) — every route is statically prerendered
- **Tailwind CSS v4** with CSS custom properties for the light/dark palette
- **IntersectionObserver + CSS transitions** for the scroll reveal (no animation library)
- **lucide-react** for UI icons; brand marks are inlined in `components/BrandIcons.tsx`

## Editing the content

All copy lives in `content/` — the components are presentational, so you never
need to touch JSX to update the CV:

| File | What it holds |
|---|---|
| `content/profile.ts` | Name, headline, summary, stat row, contact details, social links |
| `content/experience.ts` | Roles, dates, and bullet points |
| `content/skills.ts` | Skills, grouped by category |
| `content/education.ts` | Degrees |

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
   JavaScript. `curl localhost:3000 | grep Greenfact` must find the text.
2. **One `<h1>`**, an `<h2>` per section, real `<ul>/<li>` bullets. ATS parsers
   read the markup, not the design.
3. **The scroll reveal must never hide content.** The hidden state is scoped to
   `html.js` and disabled under `prefers-reduced-motion`, so a reader without
   JavaScript or with motion reduced sees the full page.
4. **Light is the default theme.** The OS `prefers-color-scheme` is deliberately
   ignored — dark applies only when the reader picks it via the toggle, which
   stores `data-theme` on `<html>`.
5. **Colour tokens only.** Never hardcode a colour in a component — add a token
   in `globals.css` and define it in both palette blocks (`:root` and
   `[data-theme="dark"]`).

## Deployment

Hosted on Vercel; pushes to `main` deploy automatically. The custom domain is
configured in the Vercel project settings.

Verified before launch: Lighthouse 96 performance / 100 accessibility /
100 best-practices / 100 SEO, CLS 0.
