import Image from "next/image";
import { Briefcase, ExternalLink } from "lucide-react";
import { NorwayFlag } from "./BrandIcons";
import { experience, type Position, type Role } from "@/content/experience";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      icon={<Briefcase className="h-5 w-5" />}
    >
      <ol className="relative space-y-10 border-l border-rule pl-6 sm:pl-8">
        {experience.map((role, i) => (
          <li key={`${role.company}-${role.start}`} className="relative">
            {/* Timeline node */}
            <span
              className="absolute -left-[calc(1.5rem+4.5px)] top-2 h-2 w-2 rounded-full bg-teal ring-4 ring-paper sm:-left-[calc(2rem+4.5px)]"
              aria-hidden="true"
            />

            <Reveal delay={i * 0.05}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-serif text-lg font-semibold sm:text-xl">
                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-teal"
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

                <p className="shrink-0 text-sm text-ink-faint">
                  <time dateTime={role.startDate}>{role.start}</time>
                  {" – "}
                  {role.endDate ? (
                    <time dateTime={role.endDate}>{role.end}</time>
                  ) : (
                    role.end
                  )}
                  <span className="mx-1.5" aria-hidden="true">
                    |
                  </span>
                  {role.location}
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
                  />
                ))}
              </div>

              {role.client ? (
                <div className="mt-4 flex items-start gap-3 rounded-lg border border-rule bg-paper-raised px-4 py-3">
                  <ClientMark client={role.client} />
                  <p className="text-sm leading-relaxed text-ink-soft">
                    <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                      {role.client.url ? (
                        <a
                          href={role.client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-teal"
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
      </ol>
    </Section>
  );
}

/**
 * The client's logo when there's a file for it, and a lettermark otherwise, so
 * the card keeps the same shape either way.
 */
function ClientMark({ client }: { client: NonNullable<Role["client"]> }) {
  const base =
    "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-rule bg-paper";

  if (client.logo) {
    return (
      <span className={base}>
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={72}
          height={72}
          sizes="36px"
          className="h-full w-full object-contain p-1"
        />
      </span>
    );
  }

  return (
    <span className={base} aria-hidden="true">
      <span className="font-serif text-sm font-bold text-ink-faint">
        {client.name.charAt(0)}
      </span>
    </span>
  );
}

function PositionEntry({
  position,
  stacked,
}: {
  position: Position;
  stacked: boolean;
}) {
  return (
    <div className="relative">
      {stacked ? (
        <span
          className="absolute -left-[calc(1.25rem+3.5px)] top-[0.45rem] h-1.5 w-1.5 rounded-full bg-rule ring-4 ring-paper"
          aria-hidden="true"
        />
      ) : null}

      <p className="text-[0.9375rem] font-medium text-ink">{position.title}</p>
      <p className="mt-0.5 text-sm text-ink-faint">
        <time dateTime={position.startDate}>{position.start}</time>
        {" – "}
        {position.endDate ? (
          <time dateTime={position.endDate}>{position.end}</time>
        ) : (
          position.end
        )}
      </p>

      {position.bullets?.length ? (
        <ul className="mt-3 space-y-2">
          {position.bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative pl-5 text-[0.9375rem] leading-relaxed text-ink-soft"
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
