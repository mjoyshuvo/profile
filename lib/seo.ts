import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { SITE_URL, profile, sameAs } from "@/content/profile";
import { allSkills } from "@/content/skills";

/**
 * schema.org Person graph. Search engines and some recruiter tools read this to
 * resolve identity across LinkedIn/GitHub, so `sameAs` matters as much as the
 * visible markup.
 */
export function personJsonLd() {
  const current = experience[0];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}${profile.photo}`,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    description: profile.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    worksFor: {
      "@type": "Organization",
      name: current.company,
      ...(current.companyUrl ? { url: current.companyUrl } : {}),
    },
    alumniOf: education.map((d) => ({
      "@type": "CollegeOrUniversity",
      name: d.institution,
      ...(d.institutionUrl ? { url: d.institutionUrl } : {}),
    })),
    knowsAbout: allSkills,
    sameAs,
  };
}
