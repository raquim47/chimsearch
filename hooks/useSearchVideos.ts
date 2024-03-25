import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export type Timestamp = { time: string; text: string }[];

interface Video {
  videoId: string;
  title: string;
  thumbnails: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  keywordCount: number;
  timestamps?: Timestamp;
}

interface VideosData {
  videos: Video[];
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
  return useInfiniteQuery<VideosData>({
    queryKey: ['searchVideos', keyword, year],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/videos?keyword=${keyword}&year=${year}&page=${pageParam}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.originLength < 10 ? undefined : allPages.length + 1;
    },
    enabled,
  });
};

export const useGetVideoDetail = ({
  videoId,
  keyword,
  year,
  enabled,
}: {
  videoId: string;
  keyword: string;
  year: string;
  enabled?: boolean;
}) => {
  return useQuery<Video>({
    queryKey: ['getVideoDetail', videoId, keyword, year],
    queryFn: async () => {
      const response = await fetch(
        `/api/videos/${videoId}?keyword=${keyword}&year=${year}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    },
    enabled,
  });
};
