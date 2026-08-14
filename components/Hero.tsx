import Image from "next/image";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile, stats } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" aria-labelledby="name-heading" className="pt-12 pb-4 sm:pt-20">
      <Reveal>
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-9">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            // Source is a 4:5 portrait; the circle is square. Anchoring the
            // crop to the top keeps the face centred in the circle instead of
            // pushing it into the upper third.
            width={360}
            height={450}
            sizes="(min-width: 640px) 124px, 96px"
            priority
            className="h-24 w-24 shrink-0 rounded-full object-cover object-top ring-1 ring-rule sm:h-31 sm:w-31"
          />

          <div className="min-w-0">
            <h1
              id="name-heading"
              className="font-serif text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {profile.name}
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-faint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-9 max-w-3xl font-serif text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
          {profile.headline}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {profile.subheadline}
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-rule py-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">
                {stat.label} at {stat.context}
              </dt>
              <dd>
                <span className="block font-serif text-2xl font-bold text-teal sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink-soft">{stat.label}</span>
                <span className="mt-0.5 block text-xs text-ink-faint">{stat.context}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-9 max-w-2xl text-base leading-relaxed text-ink-soft">{profile.summary}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          {profile.summarySecondary}
        </p>
      </Reveal>

      <Reveal delay={0.26}>
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a
            href={profile.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-sm font-medium text-on-teal transition-colors hover:bg-teal-strong"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download résumé (PDF)
          </a>

          <IconLink href={`mailto:${profile.email}`} label={profile.email}>
            <Mail className="h-4 w-4" aria-hidden="true" />
          </IconLink>
          <IconLink href={profile.links.linkedin} label="LinkedIn" external>
            <LinkedinIcon className="h-4 w-4" />
          </IconLink>
          <IconLink href={profile.links.github} label="GitHub" external>
            <GithubIcon className="h-4 w-4" />
          </IconLink>
          <IconLink href={`tel:${profile.phone}`} label={profile.phone}>
            <Phone className="h-4 w-4" aria-hidden="true" />
          </IconLink>
        </div>
      </Reveal>
    </section>
  );
}

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm text-ink-soft transition-colors hover:border-teal hover:text-teal"
    >
      {children}
      {label}
    </a>
  );
}
