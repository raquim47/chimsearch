import {
  FetchedVideoI,
  GetVideoDetailsProps,
  YouTubeVideoI,
} from '@/utils/types';

export const fetchVideoTitle = async (videoId: string): Promise<string> => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('YouTube API request failed');
  }
  const data = await response.json();

  if (data.items.length > 0) {
    return data.items[0].snippet.title;
  } else {
    throw new Error('No video found with the given ID');
  }
};

export const getVideoDetails = async (videos: GetVideoDetailsProps) => {
  const videoIds = videos.map((data) => data.videoId);
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(
    ','
  )}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics`;
  const response = await fetch(url);
  const data = await response.json();

  const videoMap = new Map(videos.map((video) => [video.videoId, video.count]));

  return data.items.map((video: YouTubeVideoI) => ({
    videoId: video.id,
    title: video.snippet.title,
    publishedAt: video.snippet.publishedAt,
    thumbnails: video.snippet.thumbnails.medium.url,
    viewCount: video.statistics.viewCount,
    duration: video.contentDetails.duration,
    keywordCount: videoMap.get(video.id) || 0,
  }));
};
