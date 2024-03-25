interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

export type GetVideoDetailsKey = { videoId: string; count?: number }[];

export const getVideoDetails = async (videos: GetVideoDetailsKey) => {
  const videoIds = videos.map((data) => data.videoId);
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(
    ','
  )}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics`;
  const response = await fetch(url);
  const data = await response.json();

  const videoMap = new Map(videos.map((video) => [video.videoId, video.count]));

  return data.items.map((video: YouTubeVideo) => ({
    videoId: video.id,
    title: video.snippet.title,
    publishedAt: video.snippet.publishedAt,
    thumbnails: video.snippet.thumbnails.medium.url,
    viewCount: video.statistics.viewCount,
    duration: video.contentDetails.duration,
    keywordCount: videoMap.get(video.id) || 1,
  }));
};
