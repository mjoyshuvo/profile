import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/content/profile";
import { Magnetic } from "./motion/Magnetic";
import { PhotoCard } from "./PhotoCard";
import { Reveal } from "./Reveal";

export function Hero() {
  const lines = profile.triad;
  const lastLine = lines.length - 1;
  // A running letter count across the three lines, so the rise reads as one
  // sweep through the statement rather than three that start together.
  let letter = 0;

  return (
    // Fills the viewport below the floating nav, so Experience always starts
    // below the fold. Centred only from `lg`; on a phone the column is shorter
    // than the screen and top alignment spends the slack below the fold.
    <section
      id="top"
      aria-labelledby="name-heading"
      className="hero relative flex min-h-[calc(100svh-4.5rem)] items-start overflow-x-clip py-8 sm:py-12 lg:items-center lg:py-16"
    >
      {/* A slow teal bloom behind the whole hero. Decorative. */}
      <span aria-hidden="true" className="hero-bloom" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-6 sm:gap-10 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14">
        <div className="min-w-0 lg:order-1">
          <Reveal>
            <p className="flex items-center gap-2.5 font-display text-[0.6875rem] font-semibold tracking-[0.12em] text-ink-faint uppercase sm:text-xs sm:tracking-[0.18em]">
              {/* A signal lamp: solid core, a halo, and a ring pulsing out of
                  it. aria-hidden — the availability is in the words beside
                  it — so the loop needs no pause control. */}
              <span
                className="relative grid h-3.5 w-3.5 shrink-0 place-items-center"
                aria-hidden="true"
              >
                <span className="pulse-ring absolute inset-0 rounded-full bg-teal" />
                <span className="absolute inset-0 rounded-full bg-teal/20" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_6px_var(--teal)]" />
              </span>
              {profile.status}
            </p>
          </Reveal>

          {/* Each letter rises out of its line's mask on load, with a light
              blur that clears as it lands (`.hero-ch` in globals.css). The
              letters are inline spans, so the heading's text, copy-paste and
              accessible name are unchanged. */}
          <h1
            id="name-heading"
            className="mt-5 font-display text-[3.5rem] font-extrabold leading-[0.92] tracking-[-0.05em] sm:text-8xl sm:leading-[0.9] lg:text-[7.5rem]"
          >
            <span className="sr-only">{profile.name} — </span>
            {lines.map((line, i) => (
              <span
                key={line}
                className={`hero-line block ${i === lastLine ? "text-teal" : ""}`}
              >
                {Array.from(line).map((char, j) => (
                  <span
                    key={j}
                    className="hero-ch"
                    style={{ "--c": letter++ } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <Reveal delay={0.55}>
            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-8 sm:text-lg">
              {profile.supportingLine}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-faint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <Magnetic>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-teal px-6 py-3 font-display text-sm font-semibold text-on-teal transition-[background-color,box-shadow] duration-200 hover:bg-teal-strong hover:shadow-[0_12px_24px_-12px_var(--teal)]"
                >
                  <span className="relative">Get in touch</span>
                  <ArrowRight
                    className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>

              <IconLink href={profile.resumePath} label="Résumé" download>
                <Download
                  className="h-[1.125rem] w-[1.125rem]"
                  aria-hidden="true"
                />
              </IconLink>
              <IconLink href={profile.links.linkedin} label="LinkedIn" external>
                <LinkedinIcon className="h-[1.125rem] w-[1.125rem]" />
              </IconLink>
              <IconLink href={profile.links.github} label="GitHub" external>
                <GithubIcon className="h-[1.125rem] w-[1.125rem]" />
              </IconLink>
            </div>
          </Reveal>
        </div>

        {/* Portrait first on a phone, so the reader meets the face before the
            statement; the right-hand column from lg. */}
        <div className="order-first lg:order-2">
          <PhotoCard />
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
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Magnetic strength={0.4}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
        className="group relative inline-grid h-11 w-11 place-items-center rounded-full border border-rule text-ink-soft transition-[color,background-color,border-color] duration-200 hover:border-teal hover:bg-teal-wash/50 hover:text-teal"
      >
        {children}
        {/* Real text, not an aria-label: it names the link for assistive tech
            and fades in under the button on hover or focus. Visible by default
            and hidden only where a pointer can hover, so a phone never gets
            three unlabelled circles. */}
        <span className="pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 font-display text-[0.625rem] font-semibold whitespace-nowrap uppercase tracking-[0.1em] text-ink-faint transition-[opacity,transform] duration-200 [@media(hover:hover)]:translate-y-[-3px] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100">
          {label}
        </span>
      </a>
    </Magnetic>
  );
}
