// videos
export interface FetchedVideoI {
  videoId: string;
  title: string;
  thumbnails: string;
  duration: string;
  viewCount?: string;
  keywordCount?: number;
  publishedAt?: string;
  timestamps?: Timestamp;
}

export interface VideoDataForInfiniteQueryI {
  videos: FetchedVideoI[];
  totalKeywordCount: number;
  originLength: number;
}

export interface YouTubeVideoI {
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

export interface ViewedVideoI {
  videoId: string;
  keyword: string;
  year: string;
  duration: string;
  title: string;
  thumbnails: string;
}

// etc...
export interface MetadataProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export type GetVideoDetailsProps = { videoId: string; count?: number }[];

export interface TrendKeywordI {
  _id: string;
  keyword: string;
  count: number;
}

export type Timestamp = { time: string; text: string }[];
