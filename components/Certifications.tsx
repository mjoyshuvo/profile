import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications } from "@/content/certifications";
import { CardWash } from "./CardWash";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      icon={<BadgeCheck className="h-6 w-6" />}
    >
      <ul className="space-y-3 sm:space-y-4">
        {certifications.map((cert, i) => {
          // A verification link when the issuer publishes one, a plain card
          // when it doesn't — the card shouldn't look clickable if there is
          // nowhere for it to go.
          const Card = cert.url ? "a" : "div";
          const linkProps = cert.url
            ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <li key={cert.name}>
              <Reveal delay={i * 0.05}>
                <Card
                  {...linkProps}
                  className={`group relative block overflow-hidden rounded-lg border border-rule bg-paper-raised px-4 py-4 transition-[border-color,transform] duration-200 hover:border-teal ${
                    cert.url ? "press-card" : ""
                  }`}
                >
                  <CardWash />

                  {/* The badge sits left of the text at a fixed 4.5rem —
                      it's a mark, not an illustration, and it should stay the
                      same size whether the card holds two lines or four.
                      Decorative: the heading beside it already names the
                      credential and the issuer. */}
                  <div className="relative flex items-start gap-4">
                    {cert.badge ? (
                      <Image
                        src={cert.badge}
                        alt=""
                        aria-hidden="true"
                        width={320}
                        height={320}
                        sizes="72px"
                        className="mt-0.5 h-[4.5rem] w-[4.5rem] shrink-0 object-contain transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.04]"
                      />
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg leading-snug font-bold tracking-[-0.02em] transition-colors group-hover:text-teal">
                          {cert.name}
                        </h3>
                        {cert.url ? (
                          <ArrowUpRight
                            className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-teal"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>

                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {cert.blurb}
                      </p>

                      {/* Issuer and dates on one line, in the same uppercase
                        register the writing cards use for their publisher. */}
                      <p className="mt-2 font-display text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
                        {cert.issuer}
                        <span className="mx-1.5" aria-hidden="true">
                          |
                        </span>
                        Issued {cert.issued}
                        {cert.expires ? (
                          <>
                            <span className="mx-1.5" aria-hidden="true">
                              |
                            </span>
                            Expires {cert.expires}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
