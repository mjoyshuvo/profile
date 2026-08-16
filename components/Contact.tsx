import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { CardWash } from "./CardWash";
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
        <div className="group relative overflow-hidden rounded-2xl border border-rule bg-paper-raised p-7 sm:p-10">
          {/* The same corner wash every card on the page carries, so this panel
              reads as part of the set rather than as its own treatment. */}
          <CardWash />

          <div className="relative">
            {/* The availability line lives in the hero; repeating it here
                would say the same thing twice on one page. */}
            <p className="max-w-xl font-display text-2xl leading-snug font-extrabold tracking-[-0.035em] sm:text-3xl">
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
              className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-teal px-6 py-3 text-sm font-bold text-on-teal transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-teal-strong hover:shadow-[0_8px_20px_-10px_var(--teal)] sm:text-base"
            >
              {/* Same passing light as the hero call to action — the two are
                  the same button doing the same job at opposite ends of the
                  page, so they move the same way. Needs the clipping parent
                  above, or it sweeps out across the panel. */}
              <span
                aria-hidden="true"
                className="cta-sheen pointer-events-none absolute inset-y-0 -left-8 w-8 bg-on-teal/25 blur-[6px]"
              />
              <Mail className="relative h-4 w-4" aria-hidden="true" />
              <span className="relative">{profile.email}</span>
              <ArrowUpRight
                className="cta-arrow-diag relative h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
