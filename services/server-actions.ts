import { TrendKeywordI } from "@/utils/types";

export const getTrendKeywords = async (): Promise<TrendKeywordI[]> => {
  const res = await fetch(`/api/trend-keywords`, {
    next: {
      revalidate: 300,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch Trend Keywords');
  }
  const data = await res.json();
  return data.trendKeywords;
};
