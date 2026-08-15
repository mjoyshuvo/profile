import { ArrowUpRight, PenLine } from "lucide-react";
import { writing } from "@/content/writing";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Writing() {
  return (
    <Section id="writing" title="Writing" icon={<PenLine className="h-6 w-6" />}>
      <ul className="space-y-3">
        {writing.map((post, i) => (
          <li key={post.url}>
            <Reveal delay={i * 0.05}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-rule bg-paper-raised px-4 py-4 transition-colors hover:border-teal"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-teal">
                    {post.title}
                  </span>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-teal"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-soft">
                  {post.blurb}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-wider text-ink-faint">
                  {post.publisher}
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
