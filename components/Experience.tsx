import { Briefcase, ExternalLink } from "lucide-react";
import { experience } from "@/content/experience";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience" icon={<Briefcase className="h-5 w-5" />}>
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
                      <ExternalLink className="h-3.5 w-3.5 text-ink-faint" aria-hidden="true" />
                    </a>
                  ) : (
                    role.company
                  )}
                  <span className="font-sans text-base font-normal text-ink-soft">
                    {" "}
                    · {role.title}
                  </span>
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

              {role.note ? (
                <p className="mt-1 text-sm italic text-ink-faint">{role.note}</p>
              ) : null}

              <ul className="mt-3 space-y-2">
                {role.bullets.map((bullet) => (
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
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
