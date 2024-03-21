import { MongoClient } from 'mongodb';
import { NextResponse, NextRequest } from 'next/server';

const API_KEY = 'AIzaSyCoyKmMG3dBxBHvX4P7ECYPIRijguzMIF0';

const getVideoDetails = async (videoId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails,statistics`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items.length > 0) {
    const video = data.items[0];
    return {
      videoId: videoId,
      title: video.snippet.title,
      publishedAt: video.snippet.publishedAt,
      thumbnails: video.snippet.thumbnails.medium.url,
      viewCount: video.statistics.viewCount,
      duration: video.contentDetails.duration,
    };
  } else {
    return null;
  }
};

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get('keyword');

  if (!keyword)
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });

  const year = searchParams.get('year') || '2024';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const client = new MongoClient(
    'mongodb+srv://cmikal47:haU4HQadhxR0kR51@cluster0.a4j9j0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  try {
    await client.connect();
    const db = client.db('chimtube');
    const collection = db.collection(year);
    const searchResults = await collection
      .aggregate([
        {
          $match: {
            'timestamps.text': { $regex: keyword, $options: 'i' } // 대소문자 구분 없이 검색
          },
        },
        {
          $project: {
            videoId: 1,
            count: {
              $sum: {
                $map: {
                  input: '$timestamps',
                  as: 'timestamp',
                  in: {
                    $size: {
                      $regexFindAll: {
                        input: '$$timestamp.text',
                        regex: new RegExp(keyword, 'gi'), // 기존 방식을 유지하되, 직접 $match에서 검색된 결과를 처리
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $skip: limit * (page - 1),
        },
        {
          $limit: limit,
        },
      ])
      .toArray();

    const videosDataPromises = searchResults.map(async (result) => {
      const videoDetails = await getVideoDetails(result.videoId);
      return {
        ...videoDetails,
        keywordCount: result.count,
      };
    });

    const videosData = await Promise.all(videosDataPromises);
    const result = videosData.filter((data) => data !== null);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
};
