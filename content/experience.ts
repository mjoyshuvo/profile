export type Role = {
  company: string;
  companyUrl?: string;
  title: string;
  start: string;
  end: string;
  /** ISO dates, for the JSON-LD and <time> elements. */
  startDate: string;
  endDate?: string;
  location: string;
  note?: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Cefalo",
    companyUrl: "https://www.cefalo.com/",
    title: "Staff Software Engineer",
    start: "Nov 2022",
    end: "Present",
    startDate: "2022-11-01",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Working as a Data Engineer for a Norwegian client named Greenfact.",
      "Successfully reduced data processing time by 75% on some pipelines by using multiprocessing and optimizing code.",
      "Optimized Dockerfile that reduced build time to 50%.",
      "Built different data pipelines using ETL.",
      "Serving as an AI coach, guiding a team to improve their agentic architecture and adopt agentic workflows that hold up in production.",
    ],
  },
  {
    company: "Brainstation-23",
    companyUrl: "https://brainstation-23.com/",
    title: "Senior Software Engineer",
    start: "Sep 2021",
    end: "Oct 2022",
    startDate: "2021-09-01",
    endDate: "2022-10-31",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Worked for a Norwegian client Ferdia to build a microservice and multi-tenant architecture-based web application.",
      "Led a team of 8 developers to write scalable code for a bus booking platform.",
      "Communicated with cross-functional teams regarding product and design.",
      "Optimized system performance by 50% using query optimization throughout the system.",
      "Implemented a caching mechanism using Redis, which increased performance by almost 60% in some cases.",
    ],
  },
  {
    company: "ADN Diginet Limited",
    companyUrl: "https://adndiginet.com/",
    title: "Senior Software Engineer",
    start: "Jan 2021",
    end: "Aug 2021",
    startDate: "2021-01-01",
    endDate: "2021-08-31",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Guided the product development team of 5 to achieve goals.",
      "Took part in system design for projects with the developer team and feature planning with the business team.",
      "Implemented SSO using Keycloak in a microservice-based architecture.",
      "Wrote Dockerfile for containerization of different services.",
      "Built various RestAPI implementations using FastAPI and Flask.",
      "Designed and implemented a billing module for a CRM project.",
      "Configured a report module using Apache Superset.",
      "Built a lead generation module using Facebook marketing API.",
      "Helped the team and individuals to learn better code management, linting, and version controlling.",
    ],
  },
  {
    company: "InfoSapex Limited",
    title: "Senior Software Engineer",
    start: "Aug 2016",
    end: "Oct 2020",
    startDate: "2016-08-01",
    endDate: "2020-10-31",
    location: "Dhaka, Bangladesh",
    note: "Joined as an Intern",
    bullets: [
      "Worked on different projects like Document Management System, Online Booking Platform, and Brac TBCP.",
      "Successfully implemented ElasticSearch that improved search functionality by 42%.",
      "Implemented Celery and CeleryBeat for asynchronous tasks.",
      "Developed features in web applications using Django that was used by some top corporates in Bangladesh.",
      "Worked on a mobile app to make new features using Flutter.",
      "Optimized jQuery code that improved loading time by 20%.",
    ],
  },
];
