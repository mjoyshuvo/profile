import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Get in touch" icon={<Mail className="h-5 w-5" />}>
      <Reveal>
        <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
          I&apos;m always happy to talk about backend architecture, data pipelines, or interesting
          engineering problems. The fastest way to reach me is email.
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          <ContactRow
            href={`mailto:${profile.email}`}
            label="Email"
            value={profile.email}
            icon={<Mail className="h-4 w-4" aria-hidden="true" />}
          />
          <ContactRow
            href={`tel:${profile.phone}`}
            label="Phone"
            value={profile.phone}
            icon={<Phone className="h-4 w-4" aria-hidden="true" />}
          />
          <ContactRow
            href={profile.links.linkedin}
            label="LinkedIn"
            value="in/mrityunjoy-das"
            external
            icon={<LinkedinIcon className="h-4 w-4" />}
          />
          <ContactRow
            href={profile.links.github}
            label="GitHub"
            value="@mjoyshuvo"
            external
            icon={<GithubIcon className="h-4 w-4" />}
          />
        </ul>
      </Reveal>
    </Section>
  );
}

function ContactRow({
  href,
  label,
  value,
  icon,
  external,
}: {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-3 rounded-lg border border-rule bg-paper-raised px-4 py-3 transition-colors hover:border-teal"
      >
        <span className="text-teal">{icon}</span>
        <span className="min-w-0">
          <span className="block text-xs uppercase tracking-wider text-ink-faint">{label}</span>
          <span className="block truncate text-sm text-ink">{value}</span>
        </span>
      </a>
    </li>
  );
}
