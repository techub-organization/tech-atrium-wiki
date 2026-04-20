import { mockHomePageData } from "./mock-data";
import type { HomePageData } from "./types";

async function tryFetchJson(url: string): Promise<Partial<HomePageData> | null> {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Partial<HomePageData>;
  } catch {
    return null;
  }
}

export async function loadHomePageData(): Promise<HomePageData> {
  const apiUrl = process.env.TECHRIUM_FRONT_PAGE_API;

  if (!apiUrl) {
    return mockHomePageData;
  }

  const liveData = await tryFetchJson(apiUrl);

  if (!liveData) {
    return mockHomePageData;
  }

  return {
    ...mockHomePageData,
    ...liveData,
    hero: {
      ...mockHomePageData.hero,
      ...liveData.hero,
    },
    sources: liveData.sources ?? mockHomePageData.sources,
    highlights: liveData.highlights ?? mockHomePageData.highlights,
  };
}
