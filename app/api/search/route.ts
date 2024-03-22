import {
  getVideoDetails,
  GetVideoDetailsKey,
} from '@/components/service/youtube-api';
import { MongoClient } from 'mongodb';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '';
  if (!keyword)
    return NextResponse.json({ error: 'Keyword is Required' }, { status: 400 });

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
            'timestamps.text': { $regex: keyword, $options: 'i' },
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
                        regex: new RegExp(keyword, 'gi'),
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $sort: { count: -1, videoId: 1 },
        },
        {
          $skip: limit * (page - 1),
        },
        {
          $limit: limit,
        },
      ])
      .toArray();

    let totalKeywordCount = 0;
    if (page === 1) {
      const totalKeywordCountResult = await collection
        .aggregate([
          {
            $match: {
              'timestamps.text': { $regex: keyword, $options: 'i' },
            },
          },
          { $unwind: '$timestamps' },
          {
            $group: {
              _id: null,
              totalKeywordCount: {
                $sum: {
                  $size: {
                    $regexFindAll: {
                      input: '$timestamps.text',
                      regex: new RegExp(keyword, 'gi'),
                    },
                  },
                },
              },
            },
          },
        ])
        .toArray();
      if (totalKeywordCountResult.length > 0) {
        totalKeywordCount = totalKeywordCountResult[0].totalKeywordCount;
      }
    }
    const videosWithDetails = await getVideoDetails(
      searchResults as GetVideoDetailsKey
    );

    return NextResponse.json({
      videos: videosWithDetails,
      totalKeywordCount,
      originLength: searchResults.length,
    });
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
