import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contact"
      title="Get in touch"
      icon={<Mail className="h-6 w-6" />}
    >
      <Reveal>
        {/* One panel rather than a grid of equal cards: email is the action
            that matters, so it gets the weight and everything else recedes. */}
        <div className="relative overflow-hidden rounded-2xl border border-rule bg-paper-raised p-7 sm:p-10">
          {/* Soft teal bloom behind the top-right corner. Decorative only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal/10 blur-3xl"
          />

          <div className="relative">
            {/* The availability line lives in the hero; repeating it here
                would say the same thing twice on one page. */}
            <p className="max-w-xl font-serif text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
              Let&apos;s talk about your project.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              I&apos;m always happy to talk about backend architecture, data
              pipelines, agentic systems, or whatever is quietly costing your
              team its afternoons.
            </p>

            {/* The email is the primary action; everything else is a footnote. */}
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-teal px-6 py-3 text-sm font-medium text-on-teal transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-teal-strong hover:shadow-[0_8px_20px_-10px_var(--teal)] sm:text-base"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-6 text-sm">
              <SocialLink
                href={profile.links.linkedin}
                label="in/mrityunjoy-das"
              >
                <LinkedinIcon className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={profile.links.github} label="@mjoyshuvo">
                <GithubIcon className="h-4 w-4" />
              </SocialLink>

              <span className="flex w-full items-center gap-1.5 text-ink-faint sm:ml-auto sm:w-auto">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-teal"
    >
      <span className="text-ink-faint transition-colors group-hover:text-teal">
        {children}
      </span>
      <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-teal">
        {label}
      </span>
    </a>
  );
}
