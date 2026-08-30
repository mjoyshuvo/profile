import { certifications } from "@/content/certifications";
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
    description: profile.metaDescription,
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
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: "certificate",
      ...(cert.credentialId ? { identifier: cert.credentialId } : {}),
      ...(cert.url ? { url: cert.url } : {}),
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuer,
        ...(cert.issuerUrl ? { url: cert.issuerUrl } : {}),
      },
    })),
    knowsAbout: allSkills,
    sameAs,
  };
}
