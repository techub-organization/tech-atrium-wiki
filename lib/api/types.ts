export type StackApiStatus = "mock" | "live";

export type HeroData = {
  serviceName: string;
  serviceLabel: string;
  summary: string;
};

export type ApiSource = {
  name: string;
  category: "language" | "framework" | "database";
  status: StackApiStatus;
  endpoint: string | null;
  note: string;
};

export type HomePageData = {
  hero: HeroData;
  sources: ApiSource[];
  highlights: string[];
  articlePreview: {
    title: string;
    summary: string;
    markdown: string;
  };
};
