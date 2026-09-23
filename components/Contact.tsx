import Image from "next/image";
import { ArrowUpRight, CalendarDays, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ContactCard } from "./ContactCard";
import { CopyButton } from "./CopyButton";
import { profile } from "@/content/profile";
import { ScrollWords } from "./motion/ScrollWords";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * The close: the page's last big line on the left, lighting up word by word
 * as it scrolls in, and on the right a contact card — who, whether I'm
 * available, and every way to reach me as one row each.
 */
export function Contact() {
  const [user, domain] = profile.email.split("@");

  return (
    <Section
      id="contact"
      title="Get in touch"
      icon={<Mail className="h-6 w-6" />}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-14">
        <div>
          <ScrollWords
            text="Let’s build something that stays up."
            className="font-display text-[2.75rem] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance sm:text-7xl"
          />
          <Reveal>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-8 sm:text-lg">
              I&apos;m always happy to talk about backend architecture, data
              pipelines, agentic systems, or whatever is quietly costing your
              team its afternoons.
            </p>
            <p className="mt-6 flex items-center gap-2 font-display text-sm font-semibold text-ink-faint">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {profile.location} · working with teams in Norway
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactCard>
            <div className="flex items-center gap-4">
              <span className="photo-glow relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={profile.cutout}
                  alt=""
                  width={160}
                  height={160}
                  sizes="80px"
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="font-display text-xl font-extrabold tracking-[-0.02em]">
                  {profile.name}
                </p>
                <p className="text-sm text-ink-soft">
                  {profile.title} · Cefalo
                </p>
                <p className="flex items-center gap-2 font-display text-xs font-semibold text-teal-strong">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="pulse-ring absolute inset-0 rounded-full bg-teal" />
                    <span className="relative h-2 w-2 rounded-full bg-teal" />
                  </span>
                  {profile.status}
                </p>
              </div>
            </div>

            <ul className="border-t border-rule">
              <li className="flex min-h-16 items-center gap-3 border-b border-rule">
                <RowIcon>
                  <Mail className="h-[1.125rem] w-[1.125rem]" />
                </RowIcon>
                <a
                  href={`mailto:${profile.email}`}
                  className="tap min-w-0 font-display text-[0.9375rem] font-semibold break-words transition-colors hover:text-teal"
                >
                  {user}@<wbr />
                  {domain}
                </a>
                <span className="ml-auto shrink-0">
                  <CopyButton text={profile.email} label="Copy email address" />
                </span>
              </li>
              <Row href={profile.bookingUrl} label="Book a 30-min call">
                <CalendarDays className="h-[1.125rem] w-[1.125rem]" />
              </Row>
              <Row href={profile.links.linkedin} label="in/mrityunjoy-das">
                <LinkedinIcon className="h-4 w-4" />
              </Row>
              <Row href={profile.links.github} label="@mjoyshuvo" last>
                <GithubIcon className="h-4 w-4" />
              </Row>
            </ul>
          </ContactCard>
        </Reveal>
      </div>
    </Section>
  );
}

function RowIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-wash text-teal"
    >
      {children}
    </span>
  );
}

/** One way to reach me: the whole row is the link, and its arrow turns. */
function Row({
  href,
  label,
  last,
  children,
}: {
  href: string;
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className={last ? "" : "border-b border-rule"}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-h-16 items-center gap-3 font-display text-[0.9375rem] font-semibold transition-colors hover:text-teal"
      >
        <RowIcon>{children}</RowIcon>
        <span className="min-w-0 break-words">{label}</span>
        <ArrowUpRight
          className="ml-auto h-[1.125rem] w-[1.125rem] shrink-0 text-teal transition-transform duration-300 group-hover:rotate-45"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
