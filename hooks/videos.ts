import { FetchedVideoI, VideoDataForInfiniteQueryI, ViewedVideoI } from '@/utils/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
  return useInfiniteQuery<VideoDataForInfiniteQueryI>({
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
  return useQuery<FetchedVideoI>({
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

const VIEWED_VIDEOS = 'viewedVideos';

export const useViewedVideos = () => {
  const [viewedVideos, setViewedVideos] = useState<ViewedVideoI[]>([]);

  const getViewedVideos = (): ViewedVideoI[] => {
    const videosJSON = localStorage.getItem(VIEWED_VIDEOS);
    return videosJSON ? JSON.parse(videosJSON) : [];
  };

  useEffect(() => {
    setViewedVideos(getViewedVideos());
  }, []);

  const addVideoToState = (video: ViewedVideoI) => {
    setTimeout(
      () =>
        setViewedVideos((prevVideos) => {
          const filteredVideos = prevVideos.filter(
            (v) => v.videoId !== video.videoId
          );
          const updatedVideos = [video, ...filteredVideos].slice(0, 3);
          return updatedVideos;
        }),
      500
    );
  };

  const addViewedVideo = (video: ViewedVideoI) => {
    const videos = getViewedVideos();
    const filteredVideos = videos.filter((v) => v.videoId !== video.videoId);
    const updatedVideos = [video, ...filteredVideos].slice(0, 3);

    localStorage.setItem(VIEWED_VIDEOS, JSON.stringify(updatedVideos));
  };

  return {
    viewedVideos,
    addViewedVideo,
    addVideoToState,
  };
};
