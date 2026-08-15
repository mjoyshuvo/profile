import { MessageSquareQuote } from "lucide-react";
import { recommendations } from "@/content/recommendations";
import { RecommendationCard } from "./RecommendationCard";
import { RecommendationDeck } from "./RecommendationDeck";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * With a single recommendation — the current state — this ships **no client
 * JavaScript at all**: no tablist of one, no counter, no grid stack. The deck
 * only appears once there is something to switch between.
 */
export function Recommendations() {
  if (recommendations.length === 0) return null;

  return (
    <Section
      id="recommendations"
      title="Recommendations"
      icon={<MessageSquareQuote className="h-5 w-5" />}
    >
      <Reveal>
        {recommendations.length === 1 ? (
          <RecommendationCard rec={recommendations[0]} />
        ) : (
          <RecommendationDeck items={recommendations} />
        )}
      </Reveal>
    </Section>
  );
}
