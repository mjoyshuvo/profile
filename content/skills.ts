export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Three groups on purpose. Longer lists read as a keyword dump and dilute the
 * backend/data positioning — anything I'd not want to be interviewed on stays out.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Backend & Languages",
    items: ["Python", "Django", "FastAPI", "Flask", "PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "Data & Agentic Systems",
    items: [
      "ETL",
      "Prefect",
      "Celery",
      "Elasticsearch",
      "Apache Superset",
      "Agentic Workflows",
      "LLM Integration",
      "Agent Architecture",
    ],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "AWS", "Microservices", "Keycloak", "CI/CD", "Git"],
  },
];

/** Flat list, used for the JSON-LD `knowsAbout` field. */
export const allSkills: string[] = skillGroups.flatMap((g) => g.items);
