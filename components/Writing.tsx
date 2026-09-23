import { PenLine } from "lucide-react";
import { writing } from "@/content/writing";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { WritingIndex } from "./WritingIndex";

/**
 * Published pieces as an index of large titles, with the hovered or focused
 * post's cover shown beside the list. See WritingIndex.
 */
export function Writing() {
  return (
    <Section
      id="writing"
      title="Writing"
      icon={<PenLine className="h-6 w-6" />}
    >
      <Reveal>
        <WritingIndex posts={writing} />
      </Reveal>
    </Section>
  );
}
