import type { HomePageData } from "./types";

export const mockHomePageData: HomePageData = {
  hero: {
    serviceName: "tech-atrium-wiki",
    serviceLabel: "techrium",
    summary:
      "React frontend driven developer wiki. Stack-specific APIs can replace these mock sections as contributors deliver endpoints.",
  },
  sources: [
    {
      name: "React Frontend",
      category: "framework",
      status: "mock",
      endpoint: null,
      note: "Main frontend owned by the primary developer.",
    },
    {
      name: "Python API",
      category: "language",
      status: "mock",
      endpoint: process.env.TECHRIUM_PYTHON_API ?? null,
      note: "Will override comparison or article support data when connected.",
    },
    {
      name: "Postgres Support",
      category: "database",
      status: "mock",
      endpoint: process.env.TECHRIUM_POSTGRES_API ?? null,
      note: "Schema and storage integration placeholder.",
    },
  ],
  highlights: [
    "Mock data is the default fallback until stack APIs are ready.",
    "Each contributor can wire a stack-specific endpoint without changing page structure.",
    "The frontend can swap in live responses by updating the data source layer.",
  ],
};
