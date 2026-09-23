import { Compass } from "lucide-react";
import { pillars } from "@/content/identity";
import { IdentityStack } from "./IdentityStack";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * The three disciplines as a stack of layers: the backend at the base, the
 * data pipelines on it, and the AI work on top — which is how the work
 * actually depends on itself. The selected layer's full statement shows
 * beside the stack. Everything is rendered here, on the server; IdentityStack
 * only decides which panel shows.
 */
export function Identity() {
  // Pillars are listed Backend → Data → AI; the stack draws them top-down.
  const layers = pillars
    .map(({ eyebrow, icon: Icon, title, body, tags }, i) => ({
      key: eyebrow.toLowerCase().replace(/[^a-z]+/g, "-"),
      label: `Layer ${i + 1}`,
      eyebrow,
      icon: <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
      panel: (
        <div className="flex flex-col gap-4">
          <p className="font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-teal uppercase">
            Layer {i + 1} · {eyebrow}
          </p>
          <h3 className="font-display text-2xl leading-tight font-extrabold tracking-[-0.035em] text-balance sm:text-[2.25rem]">
            {title}
          </h3>
          <p className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
            {body}
          </p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-teal-wash px-3.5 py-1.5 font-display text-[0.8125rem] font-medium text-teal-strong"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ),
    }))
    .reverse();

  return (
    <Section
      id="identity"
      title="Engineering identity"
      icon={<Compass className="h-6 w-6" />}
    >
      <Reveal>
        <IdentityStack layers={layers} initial={layers[1]?.key ?? layers[0].key} />
      </Reveal>
    </Section>
  );
}
