import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { disciplines, profile } from "@/content/profile";
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
      <div className="mx-auto grid w-full max-w-6xl gap-7 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
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
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-8 sm:text-xl">
              {profile.supportingLine}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-faint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-8">
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
              height={799}
              sizes="(min-width: 1024px) 320px, 160px"
              priority
              className="portrait-ink h-28 w-auto sm:h-40 lg:h-96"
            />
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-5 grid grid-cols-3 gap-x-4 border-t border-rule pt-4 lg:mt-7 lg:pt-5">
              {disciplines.map((d) => (
                <div key={d.name}>
                  <dt className="font-serif text-lg font-bold tracking-tight sm:text-xl">
                    {d.name}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-faint">
                    {d.detail}
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
