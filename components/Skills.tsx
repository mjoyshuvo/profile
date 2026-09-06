import { Wrench } from "lucide-react";
import { CardWash } from "./CardWash";
import { skillGroups } from "@/content/skills";
import { skillIcons } from "./SkillIcons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills" icon={<Wrench className="h-6 w-6" />}>
      {/* Ruled rows rather than floating blocks: the separator is then the same
          hairline used everywhere else on the page, and each group reads as one
          line of a list instead of a loose cluster. One observed container
          drives the stagger — see the ladder in globals.css. */}
      <Reveal
        mode="stagger"
        as="ul"
        step={0.06}
        className="border-t border-rule"
      >
        {skillGroups.map((group) => (
          <li
            key={group.label}
            className="border-b border-rule py-5 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6"
          >
            <h3 className="font-display font-semibold text-[0.6875rem] tracking-[0.12em] text-ink-faint uppercase">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2 sm:mt-0">
              {group.items.map((skill) => {
                const Icon = skillIcons[skill];

                return (
                  // Each chip is its own small card, wash and all: the corner
                  // bloom at chip scale, brightening on its own hover.
                  <li
                    key={skill}
                    className="group relative overflow-hidden rounded-full border border-rule bg-paper-raised py-1.5 pr-3 pl-2.5 font-display text-sm font-medium text-ink-soft transition-colors hover:border-teal hover:text-teal"
                  >
                    <CardWash size="chip" />
                    <span className="relative flex items-center gap-1.5">
                      {/* The glyph repeats what the word already says, so it is
                          decoration — hidden from a screen reader, and the
                          chip keeps its padding if a skill has no icon. */}
                      {Icon ? (
                        <Icon
                          className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-colors group-hover:text-teal"
                          aria-hidden="true"
                        />
                      ) : null}
                      {skill}
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
