import { useState, useEffect } from 'react';

const VIEWED_VIDEOS = 'viewedVideos';

interface ViewedVideoI {
  videoId: string;
  keyword: string;
  year: string;
  duration: string;
  title: string;
  thumbnails: string;
}

const useViewedVideos = () => {
  const [viewedVideos, setViewedVideos] = useState<ViewedVideoI[]>([]);

  const getViewedVideos = (): ViewedVideoI[] => {
    const videosJSON = localStorage.getItem(VIEWED_VIDEOS);
    return videosJSON ? JSON.parse(videosJSON) : [];
  };

  useEffect(() => {
    setViewedVideos(getViewedVideos());
  }, []);

  const addViewedVideo = (video: ViewedVideoI) => {
    const videos = getViewedVideos();
    const filteredVideos = videos.filter((v) => v.videoId !== video.videoId);
    const updatedVideos = [video, ...filteredVideos].slice(0, 3);

    localStorage.setItem(VIEWED_VIDEOS, JSON.stringify(updatedVideos));
  };

  return { viewedVideos, addViewedVideo };
};

export default useViewedVideos;
