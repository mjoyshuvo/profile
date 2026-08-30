import Image from "next/image";
import { ArrowDown, Briefcase, ExternalLink, MapPin } from "lucide-react";
import { NorwayFlag } from "./BrandIcons";
import { experience, type Position, type Role } from "@/content/experience";
import { projects } from "@/content/projects";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      icon={<Briefcase className="h-6 w-6" />}
    >
      {/* `hold` fires the rule without the list itself moving. The rule is a
          ::before on the <ol> rather than a child element — an <ol> may only
          contain <li>, and constraint 2 in the README is there so parsers can
          read this list. */}
      <Reveal
        mode="hold"
        as="ol"
        className="timeline relative space-y-10 pl-6 sm:pl-8"
      >
        {experience.map((role, i) => (
          <li key={`${role.company}-${role.start}`} className="relative">
            {/* Timeline node. Only the role still running ripples — a pulse
                means "live", and putting one on every closed role spent the
                signal on nothing. The ring has to start wider than the dot's
                4px paper collar, or it expands entirely underneath it and
                never shows. Past roles keep the dot, in the rule's grey. */}
            <span
              className="absolute top-2 -left-[calc(1.5rem+4.5px)] grid h-2 w-2 place-items-center sm:-left-[calc(2rem+4.5px)]"
              aria-hidden="true"
            >
              {role.endDate ? null : (
                <span className="pulse-ring absolute -inset-1.5 rounded-full bg-teal" />
              )}
              <span
                className={`relative h-2 w-2 rounded-full ring-4 ring-paper ${
                  role.endDate ? "bg-rule" : "bg-teal"
                }`}
              />
            </span>

            <Reveal delay={i * 0.05}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">
                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap inline-flex items-center gap-1 transition-colors hover:text-teal"
                    >
                      {role.company}
                      <ExternalLink
                        className="h-3.5 w-3.5 opacity-60"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    role.company
                  )}
                </h3>

                {/* Monospace and uppercase, matching the meta lines on the
                    project cards — dates and places are data, and setting them
                    like data keeps them from competing with the company name.
                    Carried in a pill so the span reads as one object: the
                    dash and the hairline divider do the joining work that
                    an arrow and a slash used to do as characters, and they
                    sit on the baseline instead of drifting above it. */}
                <p className="inline-flex shrink-0 flex-col items-start gap-y-1 self-start rounded-full border border-rule bg-paper-raised px-3 py-1 font-display font-semibold text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase md:flex-row md:items-center md:gap-x-2.5">
                  <span className="inline-flex items-center gap-x-2.5 whitespace-nowrap">
                    <time dateTime={role.startDate}>{role.start}</time>
                    <span
                      aria-hidden="true"
                      className="h-px w-3 shrink-0 bg-rule"
                    />
                    <DateEnd end={role.end} endDate={role.endDate} />
                  </span>
                  {/* Two rows on a phone, one row from `md`. Wrapping was
                      doing this before, but wrapping picks its own break
                      point: the divider led the second line as a bar joining
                      nothing above it, and the pin sat out of line with the
                      date. Each row is its own nowrap group instead, so the
                      break is where we put it and the divider only exists in
                      the single-row layout, between the date and the place. */}
                  <span className="inline-flex items-center gap-x-2.5 whitespace-nowrap">
                    <span
                      aria-hidden="true"
                      className="hidden h-3 w-px shrink-0 bg-rule md:block"
                    />
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {role.location}
                    </span>
                  </span>
                </p>
              </div>

              {/* Position stack. Indented under the company with its own rule so
                  a promotion reads as one tenure, not as separate jobs. */}
              <div
                className={
                  role.positions.length > 1
                    ? "mt-4 space-y-6 border-l border-rule/70 pl-5"
                    : "mt-3"
                }
              >
                {role.positions.map((position) => (
                  <PositionEntry
                    key={position.title + position.start}
                    position={position}
                    stacked={role.positions.length > 1}
                    // A single position whose span is the whole tenure is the
                    // pill directly above it, printed twice. The dates belong
                    // to the company row there; the position line only needs
                    // them once the stack has more than one entry to separate.
                    showDates={
                      role.positions.length > 1 ||
                      position.startDate !== role.startDate ||
                      position.endDate !== role.endDate
                    }
                  />
                ))}
              </div>

              {/* Derived from the project list rather than hand-maintained, so
                  removing a case study can't leave a dead anchor behind. */}
              <CaseStudyLinks company={role.company} />

              {role.client ? (
                <div className="mt-4 flex max-w-3xl items-start gap-3 rounded-lg border border-rule bg-paper-raised px-4 py-3">
                  <ClientMark client={role.client} />
                  <p className="text-sm leading-relaxed text-ink-soft">
                    <span className="inline-flex items-center gap-1.5 font-display font-semibold text-ink">
                      {role.client.url ? (
                        <a
                          href={role.client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap transition-colors hover:text-teal"
                        >
                          {role.client.name}
                        </a>
                      ) : (
                        role.client.name
                      )}
                      {/* Every client here is Norwegian; the flag says so
                          faster than the sentence does. */}
                      <NorwayFlag className="h-3 w-[1.03rem] shrink-0 rounded-[1px] ring-1 ring-black/10" />
                      <span className="sr-only">(Norway)</span>
                    </span>{" "}
                    — {role.client.blurb}
                  </p>
                </div>
              ) : null}
            </Reveal>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}

/**
 * The right-hand side of a date range. An ongoing role gets a teal badge rather
 * than the word in running text — it is the one piece of this metadata a reader
 * actually scans for, and there is no `<time>` to wrap it in anyway.
 */
function DateEnd({ end, endDate }: { end: string; endDate?: string }) {
  if (endDate) {
    return <time dateTime={endDate}>{end}</time>;
  }

  return (
    <span className="rounded-full bg-teal-wash px-2 py-0.5 font-display font-semibold text-teal">
      {end}
    </span>
  );
}

/**
 * Links from a role to the case studies delivered under it. Matched on
 * `Project.company`, so the two sections can't drift apart: delete a project
 * and its link disappears with it.
 */
function CaseStudyLinks({ company }: { company: string }) {
  const matches = projects.filter((project) => project.company === company);
  if (matches.length === 0) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
      {matches.map((project) => (
        <li key={project.slug}>
          <a
            href={`#project-${project.slug}`}
            className="tap group inline-flex items-center gap-1.5 font-display text-sm font-medium text-ink-faint transition-colors hover:text-teal"
          >
            <ArrowDown
              className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
              aria-hidden="true"
            />
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-teal">
              {project.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The client's logo when there's a file for it, and a lettermark otherwise, so
 * the card keeps the same shape either way.
 */
function ClientMark({ client }: { client: NonNullable<Role["client"]> }) {
  // Both marks are wordmarks drawn for a light ground, and one is green — so
  // the chip carries its own light surface in either theme rather than being
  // inverted, which would misrepresent the brand colour.
  const base =
    "flex h-9 shrink-0 items-center justify-center rounded-md border border-rule bg-[#f5f3ee]";

  if (client.logo) {
    return (
      <span className={`${base} w-24 px-2`}>
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={160}
          height={54}
          className="h-4 w-auto max-w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`${base} w-9`} aria-hidden="true">
      <span className="font-display text-sm font-bold text-ink-faint">
        {client.name.charAt(0)}
      </span>
    </span>
  );
}

function PositionEntry({
  position,
  stacked,
  showDates,
}: {
  position: Position;
  stacked: boolean;
  /** False when the company pill above already states this exact span. */
  showDates: boolean;
}) {
  return (
    <div className="relative">
      {stacked ? (
        <span
          className="absolute -left-[calc(1.25rem+3.5px)] top-[0.45rem] h-1.5 w-1.5 rounded-full bg-rule ring-4 ring-paper"
          aria-hidden="true"
        />
      ) : null}

      <p className="font-display text-[0.9375rem] font-semibold text-ink">
        {position.title}
      </p>
      {/* No pill here — the same joining marks as the role line, but plain, so
          the tenure stays the object and its positions read inside it. */}
      {showDates ? (
        <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display font-semibold text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
          <time dateTime={position.startDate}>{position.start}</time>
          <span aria-hidden="true" className="h-px w-3 shrink-0 bg-rule" />
          <DateEnd end={position.end} endDate={position.endDate} />
        </p>
      ) : null}

      {position.bullets?.length ? (
        <ul className="mt-3 space-y-2">
          {position.bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative max-w-[68ch] pl-5 text-[0.9375rem] leading-relaxed text-ink-soft"
            >
              <span
                className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-teal/60"
                aria-hidden="true"
              />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
