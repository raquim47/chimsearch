import { connectToDatabase } from '@/service/mongodb';
import { getVideoDetails, GetVideoDetailsKey } from '@/service/youtube-api';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '';
  if (!keyword)
    return NextResponse.json({ error: 'Keyword is Required' }, { status: 400 });

  const year = searchParams.get('year') || '2024';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  try {
    const db = await connectToDatabase();
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
    if (page === 1 && searchResults.length > 0) {
      const keywordsCollection = db.collection('searchKeywords');
      await keywordsCollection.updateOne(
        { keyword: keyword },
        {
          $set: { lastSearched: new Date() },
          $inc: { count: 1 },
        },
        { upsert: true }
      );
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
  }
};
