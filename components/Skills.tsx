import { Wrench } from "lucide-react";
import { skillGroups } from "@/content/skills";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SkillsBoard } from "./SkillsBoard";

/**
 * Skills as a filter board. Every skill is rendered on the server; the board
 * only changes which tiles are in front. See SkillsBoard.
 */
export function Skills() {
  return (
    <Section id="skills" title="Skills" icon={<Wrench className="h-6 w-6" />}>
      <Reveal>
        <SkillsBoard groups={skillGroups} />
      </Reveal>
    </Section>
  );
}
