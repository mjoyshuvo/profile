import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications, type Certification } from "@/content/certifications";
import { CardWash } from "./CardWash";
import { CopyButton } from "./CopyButton";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** "Aug 2026" → the first of that month, in UTC. */
function monthOf(label: string) {
  return new Date(`1 ${label} UTC`);
}

/**
 * How far through its validity a credential is, at build time. The site
 * redeploys often enough for "months left" to stay true; a credential with
 * no expiry has no bar.
 */
function validity(cert: Certification, now: Date) {
  if (!cert.expires) return null;
  const from = monthOf(cert.issued).getTime();
  const to = monthOf(cert.expires).getTime();
  const done = Math.min(1, Math.max(0, (now.getTime() - from) / (to - from)));
  const monthsLeft = Math.max(
    0,
    Math.round((to - now.getTime()) / (1000 * 60 * 60 * 24 * 30.4375)),
  );
  return { done, monthsLeft, expired: now.getTime() >= to };
}

/**
 * Each credential as a spotlight card: the badge in a slowly turning ring (the
 * same ring as the hero portrait), what it attests to, a bar for how much of
 * its validity is left, and the ways to check it.
 */
export function Certifications() {
  const now = new Date();

  return (
    <Section
      id="certifications"
      title="Certifications"
      icon={<BadgeCheck className="h-6 w-6" />}
    >
      <ul className="space-y-4">
        {certifications.map((cert, i) => {
          const valid = validity(cert, now);
          return (
            <li key={cert.name}>
              <Reveal delay={i * 0.05}>
                <article className="spot-card relative grid items-center gap-8 overflow-hidden rounded-[1.75rem] border border-rule bg-paper-raised p-6 shadow-[var(--shadow)] sm:p-10 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
                  <CardWash />

                  {/* Decorative: the heading beside it names the credential. */}
                  {cert.badge ? (
                    <div
                      aria-hidden="true"
                      className="badge-stage relative mx-auto h-48 w-48 sm:h-60 sm:w-60"
                    >
                      <span className="badge-glow absolute inset-0 rounded-full" />
                      <span className="badge-ring absolute inset-1.5 rounded-full border-2 border-dashed" />
                      <span className="badge-orbit absolute inset-1.5 rounded-full">
                        <span className="absolute -top-1.5 left-1/2 -ml-1.5 h-3 w-3 rounded-full bg-teal ring-4 ring-paper-raised" />
                      </span>
                      <Image
                        src={cert.badge}
                        alt=""
                        width={320}
                        height={320}
                        sizes="160px"
                        className="absolute inset-[18%] h-[64%] w-[64%] object-contain"
                      />
                    </div>
                  ) : null}

                  <div className="relative flex min-w-0 flex-col gap-4">
                    <p className="flex flex-wrap items-center gap-2.5 font-display text-[0.6875rem] font-semibold tracking-[0.14em] text-teal uppercase">
                      {cert.issuerUrl ? (
                        <a
                          href={cert.issuerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap transition-colors hover:text-teal-strong"
                        >
                          {cert.issuer}
                        </a>
                      ) : (
                        cert.issuer
                      )}
                      <span aria-hidden="true">·</span>
                      Credential
                      {valid ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-wash px-2.5 py-1 tracking-[0.06em] text-teal-strong normal-case">
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full bg-teal ${valid.expired ? "" : "badge-live"}`}
                          />
                          {valid.expired ? "Expired" : "Valid"}
                        </span>
                      ) : null}
                    </p>

                    <h3 className="font-display text-2xl leading-tight font-extrabold tracking-[-0.035em] text-balance sm:text-[2.125rem]">
                      {cert.name}
                    </h3>
                    <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
                      {cert.blurb}
                    </p>

                    {valid ? (
                      <div className="flex flex-col gap-2 pt-1">
                        <span
                          aria-hidden="true"
                          className="relative block h-2 rounded-full bg-rule"
                        >
                          <span
                            className="badge-bar absolute inset-y-0 left-0 rounded-full bg-teal"
                            style={{ width: `${valid.done * 100}%` }}
                          />
                          <span
                            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-teal bg-paper-raised"
                            style={{ left: `${valid.done * 100}%` }}
                          />
                        </span>
                        <p className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-display text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                          <span>Issued {cert.issued}</span>
                          {valid.expired ? null : (
                            <span className="text-teal">
                              {valid.monthsLeft} month
                              {valid.monthsLeft === 1 ? "" : "s"} left
                            </span>
                          )}
                          <span>Expires {cert.expires}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="font-display text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                        Issued {cert.issued}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex h-11 items-center gap-2 rounded-full bg-teal px-5 font-display text-sm font-semibold text-on-teal transition-colors hover:bg-teal-strong"
                        >
                          Verify on Credly
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                      {cert.credentialId ? (
                        <span className="inline-flex h-11 max-w-full items-center gap-2.5 rounded-full border border-rule bg-paper py-1 pr-1 pl-4">
                          <span className="min-w-0 overflow-hidden font-mono text-xs text-ellipsis whitespace-nowrap text-ink-soft">
                            ID {cert.credentialId}
                          </span>
                          <CopyButton
                            text={cert.credentialId}
                            label="Copy credential ID"
                          />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
