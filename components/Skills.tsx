import { Wrench } from "lucide-react";
import { skillGroups } from "@/content/skills";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills" icon={<Wrench className="h-6 w-6" />}>
      <div className="space-y-7">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                {group.label}
              </h3>
              <ul className="mt-2.5 flex flex-wrap gap-2 sm:mt-0">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-rule bg-paper-raised px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-teal hover:text-teal"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
