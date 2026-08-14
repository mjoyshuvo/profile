import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { disciplineSuffix, disciplines, profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Hero() {
  const lines = profile.triad;
  const lastLine = lines.length - 1;

  return (
    // Fills the viewport below the 3.5rem nav, so Experience always starts
    // below the fold and the statement gets the first screen to itself.
    <section
      id="top"
      aria-labelledby="name-heading"
      className="flex min-h-[calc(100svh-3.5rem)] items-center py-8 sm:py-12 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        {/* Statement */}
        <div className="min-w-0 lg:order-1">
          <Reveal>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink-faint">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                aria-hidden="true"
              />
              {profile.status}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              id="name-heading"
              className="mt-5 font-serif text-5xl font-bold leading-[0.92] tracking-tight sm:text-8xl sm:leading-[0.9] lg:text-9xl"
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
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-on-teal transition-colors hover:bg-teal-strong"
              >
                Get in touch
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <IconLink href={profile.resumePath} label="Résumé" download>
                <Download className="h-4 w-4" aria-hidden="true" />
              </IconLink>
              <IconLink href={profile.links.linkedin} label="LinkedIn" external>
                <LinkedinIcon className="h-4 w-4" />
              </IconLink>
              <IconLink href={profile.links.github} label="GitHub" external>
                <GithubIcon className="h-4 w-4" />
              </IconLink>
            </div>
          </Reveal>
        </div>

        {/* Portrait + proof. Sits first on mobile so the reader meets the face
            before the statement; returns to the right-hand column at lg. */}
        <div className="order-first lg:order-2 lg:w-80">
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
              className="portrait-ink w-28 sm:w-44 lg:w-80"
            />
          </Reveal>

          <Reveal delay={0.24}>
            {/* Side by side. Every cell carries the same "Engineer" second
                line, so the row reads evenly however short the discipline. */}
            <dl className="mt-4 grid grid-cols-3 gap-x-4 border-t border-rule pt-4 sm:mt-5 lg:mt-7 lg:pt-5">
              {disciplines.map((d) => (
                <div key={d}>
                  <dt className="font-serif text-base font-bold tracking-tight sm:text-lg">
                    {d}
                  </dt>
                  <dd className="mt-0.5 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                    {disciplineSuffix}
                  </dd>
                </div>
              ))}
            </dl>
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
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
      className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-teal hover:text-teal"
    >
      {children}
      {label}
    </a>
  );
}
