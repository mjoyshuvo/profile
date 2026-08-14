import Image from "next/image";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" aria-labelledby="name-heading" className="pt-12 pb-4 sm:pt-20">
      <Reveal>
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-9">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={124}
            height={124}
            priority
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-rule sm:h-31 sm:w-31"
          />

          <div className="min-w-0">
            <h1
              id="name-heading"
              className="font-serif text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {profile.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-teal sm:text-xl">{profile.title}</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-faint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {profile.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{profile.summary}</p>
      </Reveal>

      <Reveal delay={0.16}>
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
