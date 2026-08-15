import { GraduationCap } from "lucide-react";
import { education } from "@/content/education";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education" icon={<GraduationCap className="h-6 w-6" />}>
      <ul className="space-y-6">
        {education.map((degree, i) => (
          <li key={degree.degree}>
            <Reveal delay={i * 0.05}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-serif text-lg font-semibold">
                  {degree.degree}
                  <span className="font-sans text-base font-normal text-ink-soft">
                    {" "}
                    · {degree.institution}
                  </span>
                </h3>
                <p className="shrink-0 text-sm text-ink-faint">
                  {degree.date}
                  <span className="mx-1.5" aria-hidden="true">
                    |
                  </span>
                  {degree.location}
                </p>
              </div>
              {degree.under ? (
                <p className="mt-1 text-sm text-ink-faint">Under: {degree.under}</p>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
