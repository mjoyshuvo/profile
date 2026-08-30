import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Hero() {
  const lines = profile.triad;
  const lastLine = lines.length - 1;

  return (
    // Fills the viewport below the 3.5rem nav, so Experience always starts
    // below the fold and the statement gets the first screen to itself.
    //
    // Centred only from `lg`. On a phone the column is a good 180px shorter
    // than the viewport, and centring split that slack evenly — which left
    // ~90px of nothing between the nav and the portrait and pushed the triad
    // down with it. Aligning to the top spends the whole surplus at the
    // bottom, below the fold, where it costs the reader nothing and Experience
    // still starts off-screen.
    <section
      id="top"
      aria-labelledby="name-heading"
      className="flex min-h-[calc(100svh-3.5rem)] items-start py-8 sm:py-12 lg:items-center lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 sm:gap-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        {/* Statement */}
        <div className="min-w-0 lg:order-1">
          <Reveal>
            {/* 0.18em was the widest tracking on the page, and on a phone it
                pushed this 31-character line to 308px of a 327px column —
                an eyebrow running edge to edge under the headline. Below `sm`
                it drops to the 11px/0.12em the page's other uppercase labels
                use, which brings it back to ~263px and gives the line the air
                that makes it read as a caption rather than a second heading. */}
            <p className="flex items-center gap-2.5 font-display text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-faint uppercase sm:text-xs sm:tracking-[0.18em]">
              {/* A signal lamp rather than a bullet: a solid core with a glow,
                  two static halos, and a ring pulsing out of it on a loop.
                  The whole lamp is aria-hidden — the availability is in the
                  sentence beside it — so the motion carries no information and
                  needs no pause control. It stops under reduced motion. */}
              <span
                className="relative grid h-3.5 w-3.5 shrink-0 place-items-center"
                aria-hidden="true"
              >
                <span className="pulse-ring absolute inset-0 rounded-full bg-teal" />
                <span className="absolute inset-0 rounded-full bg-teal/20" />
                <span className="absolute inset-[3px] rounded-full bg-teal/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_6px_var(--teal)]" />
              </span>
              {profile.status}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="name-heading"
              // Poppins at 800 with tracking pulled to -0.045em. A geometric
              // sans at this size needs the letters closed up or the words
              // read as loose beads; the serif it replaced held together on
              // its own at Tailwind's default tracking-tight.
              className="mt-5 font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.045em] sm:text-8xl sm:leading-[0.9] lg:text-9xl"
            >
              {/* The visible heading is the statement; the name lives in the
                  sticky nav. Screen readers and crawlers still get both. */}
              <span className="sr-only">{profile.name} — </span>
              {lines.map((line, i) => (
                <span
                  key={line}
                  className={`block ${i === lastLine ? "text-teal" : ""}`}
                >
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-8 sm:text-lg">
              {profile.supportingLine}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-faint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-teal px-5 py-2.5 font-display text-sm font-semibold text-on-teal transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-teal-strong hover:shadow-[0_6px_16px_-8px_var(--teal)]"
              >
                {/* A light passing over the fill. Needs the clipping parent
                    above, or it sweeps out across the page. */}
                <span
                  aria-hidden="true"
                  className="cta-sheen pointer-events-none absolute inset-y-0 -left-8 w-8 bg-on-teal/25 blur-[6px]"
                />
                <span className="relative">Get in touch</span>
                <ArrowRight
                  className="cta-arrow relative h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Staggered so the row reads as a wave rather than three lamps
                  blinking together. */}
              <IconLink
                href={profile.resumePath}
                label="Résumé"
                download
                delay={0}
              >
                <Download
                  className="h-[1.125rem] w-[1.125rem]"
                  aria-hidden="true"
                />
              </IconLink>
              <IconLink
                href={profile.links.linkedin}
                label="LinkedIn"
                external
                delay={0.5}
              >
                <LinkedinIcon className="h-[1.125rem] w-[1.125rem]" />
              </IconLink>
              <IconLink
                href={profile.links.github}
                label="GitHub"
                external
                delay={1}
              >
                <GithubIcon className="h-[1.125rem] w-[1.125rem]" />
              </IconLink>
            </div>
          </Reveal>
        </div>

        {/* Portrait + proof. Sits first on mobile so the reader meets the face
            before the statement; returns to the right-hand column at lg. */}
        {/* Optically centred, not geometrically. The grid centres both columns,
            so the portrait's midpoint sat dead level with the text column's —
            but that column is top-heavy: 346px of display type, then a
            paragraph, a location line and a button row trailing below it. Only
            36px of the column sits above the headline against 228px below, so
            true centring hung the portrait 96px under the statement it is
            meant to sit beside. A grid item is centred by its margin box, so
            192px of bottom margin lifts it by half that — landing the portrait
            level with the headline. Measured, not guessed. */}
        <div className="order-first lg:order-2 lg:mb-48 lg:w-80">
          <Reveal delay={0.06}>
            <Image
              src={profile.sketch}
              alt={`Portrait of ${profile.name}`}
              // A pencil drawing keyed onto transparency, so it sits on the
              // paper with no frame. `portrait-ink` gives it a paper card on
              // the dark palette — inverting it would read as a photo negative.
              width={640}
              height={603}
              sizes="(min-width: 1024px) 320px, 176px"
              priority
              // At w-28 the face was a thumbnail: on a phone this is the first
              // thing on the page and it was carrying none of the weight it
              // carries at 320px on a desktop.
              className="portrait-ink w-36 sm:w-44 lg:w-80"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  external,
  download,
  delay = 0,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
  /** Seconds, to offset this link's border breathe from its neighbours. */
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      style={{ animationDelay: `${delay}s` }}
      className="cta-breathe group relative inline-grid h-11 w-11 place-items-center rounded-full border border-rule text-ink-soft transition-[color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-teal-wash/50 hover:text-teal"
    >
      {children}
      {/* Real text, not an aria-label: it names the link for assistive tech and
          fades in under the button on hover or keyboard focus. Absolutely
          positioned so three icons stay a tight row at every width.

          Standing visible by default and hidden only where a pointer can
          hover: a touch device never fires hover, so gating it the other way
          round left a phone with three unlabelled circles. */}
      <span className="pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 font-display text-[0.625rem] font-semibold whitespace-nowrap uppercase tracking-[0.1em] text-ink-faint transition-[opacity,transform] duration-200 [@media(hover:hover)]:translate-y-[-3px] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
        {label}
      </span>
    </a>
  );
}
