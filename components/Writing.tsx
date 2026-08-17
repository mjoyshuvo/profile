import Image from "next/image";
import { ArrowUpRight, PenLine } from "lucide-react";
import { CardWash } from "./CardWash";
import { writing } from "@/content/writing";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Writing() {
  return (
    <Section
      id="writing"
      title="Writing"
      icon={<PenLine className="h-6 w-6" />}
    >
      <ul className="space-y-3">
        {writing.map((post, i) => (
          <li key={post.url}>
            <Reveal delay={i * 0.05}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="press-card group relative block overflow-hidden rounded-lg border border-rule bg-paper-raised px-4 py-4 transition-[border-color,transform] duration-200 hover:border-teal"
              >
                {/* The same corner wash the project and contact cards carry. */}
                <CardWash />

                {/* The article's own cover, taken from the piece's own social
                    card. A band across the top on a phone — where the card is
                    the full width of the screen and an image beside the text
                    would leave neither enough room — and a fixed plate to the
                    right from `sm` up, so the list keeps one left edge. */}
                <span className="relative flex flex-col gap-3 sm:flex-row-reverse sm:items-start sm:gap-5">
                  {post.cover ? (
                    <span className="block shrink-0 overflow-hidden rounded-md border border-rule sm:w-44">
                      <Image
                        src={post.cover}
                        // Decorative: the title beside it names the piece, and
                        // the cover restates it rather than adding to it.
                        alt=""
                        aria-hidden="true"
                        width={960}
                        height={540}
                        sizes="(min-width: 640px) 176px, 100vw"
                        className="block h-32 w-full object-cover transition-transform duration-300 sm:h-24 [@media(hover:hover)]:group-hover:scale-[1.04]"
                      />
                    </span>
                  ) : null}

                  <span className="block min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-display text-lg leading-snug font-bold tracking-[-0.02em] transition-colors group-hover:text-teal">
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
                    <span className="mt-2 block font-display text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
                      {post.publisher}
                    </span>
                  </span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
