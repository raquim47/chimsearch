import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface VideoData {
  videoId: string;
  title: string;
  thumbnails: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  keywordCount: number;
}

interface Response {
  videos: VideoData[];
  totalKeywordCount: number;
  originLength: number;
}

export const useSearchVideos = ({
  keyword,
  year = '2024',
  limit = 10,
  enabled,
}: {
  keyword: string;
  year: string;
  limit?: number;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<Response, Error>({
    queryKey: ['searchVideos', keyword, year],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<Response>('/api/search', {
        params: { keyword, year, page: pageParam, limit },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.originLength < 10 ? undefined : allPages.length + 1;
    },
    enabled,
  });
};
