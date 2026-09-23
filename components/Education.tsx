import { GraduationCap } from "lucide-react";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * Each degree as a milestone: the year large, the degree beside it, and a
 * short line from graduating to the first role — both dates the page already
 * states, joined so the reader sees one ran straight into the other.
 */
export function Education() {
  // The earliest position on the CV: the last role's last (oldest) position.
  const firstRole = experience[experience.length - 1];
  const firstPosition = firstRole?.positions[firstRole.positions.length - 1];

  return (
    <Section
      id="education"
      title="Education"
      icon={<GraduationCap className="h-6 w-6" />}
    >
      <ul className="space-y-4">
        {education.map((degree, i) => {
          const year = degree.date.match(/\d{4}/)?.[0];
          // Only draw the bridge for the degree the career followed.
          const bridge = i === 0 && firstPosition;
          return (
            <li key={degree.degree}>
              <Reveal delay={i * 0.05}>
                <article className="grid items-center gap-6 rounded-[1.75rem] border border-rule bg-paper-raised p-6 sm:p-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
                  {year ? (
                    <span
                      aria-hidden="true"
                      className="edu-year font-display text-[5.5rem] leading-[0.85] font-extrabold tracking-[-0.06em] tabular-nums sm:text-[8.5rem]"
                    >
                      {year}
                    </span>
                  ) : null}

                  <div className="flex flex-col gap-3">
                    <p className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-teal uppercase">
                      Degree · {degree.date}
                    </p>
                    <h3 className="font-display text-2xl leading-tight font-extrabold tracking-[-0.035em] text-balance sm:text-[1.875rem]">
                      {degree.degree}
                    </h3>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
                      {degree.institutionUrl ? (
                        <a
                          href={degree.institutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap font-semibold text-teal transition-colors hover:text-teal-strong"
                        >
                          {degree.institution}
                        </a>
                      ) : (
                        <span className="font-semibold text-ink">
                          {degree.institution}
                        </span>
                      )}
                      {degree.under ? <> · {degree.under}</> : null} ·{" "}
                      {degree.location}
                    </p>
                  </div>

                  {bridge ? (
                    <div className="grid items-center gap-3 border-t border-rule pt-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 md:col-span-2">
                      <span className="flex items-center gap-2.5 font-display text-[0.8125rem] font-semibold">
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 rounded-full bg-teal"
                        />
                        {degree.date} · Graduated
                      </span>
                      <span
                        aria-hidden="true"
                        className="edu-bridge hidden h-1 rounded-full sm:block"
                      />
                      <span className="flex items-center gap-2.5 font-display text-[0.8125rem] font-semibold sm:flex-row-reverse">
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 rounded-full border-[3px] border-teal bg-paper-raised"
                        />
                        {firstPosition.start} · First role at{" "}
                        {firstRole.company.split(" ")[0]}
                      </span>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
