import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 5;
  const client = new MongoClient(
    'mongodb+srv://cmikal47:haU4HQadhxR0kR51@cluster0.a4j9j0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
  try {
    await client.connect();
    const db = client.db('chimtube');
    const collection = db.collection('2024');
    const searchResults = await collection
  .aggregate([
    {
      $match: {
        $text: { $search: keyword },
      },
    },
    {
      $project: {
        videoId: 1,
        timestamps: {
          $filter: {
            input: "$timestamps",
            as: "timestamp",
            cond: { $regexMatch: { input: "$$timestamp.text", regex: new RegExp(keyword, 'i') } }
          }
        },
      },
    },
    {
      $addFields: {
        count: { $size: "$timestamps" },
      },
    },
    {
      $skip: limit * (page - 1),
    },
    {
      $limit: limit,
    },
  ])
  .toArray();
    // const searchResults = await collection
    //   .aggregate([
    //     {
    //       $match: {
    //         'timestamps.text': { $regex: regex },
    //       },
    //     },
    //     {
    //       $project: {
    //         videoId: 1,
    //         timestamps: {
    //           $filter: {
    //             input: '$timestamps',
    //             as: 'timestamp',
    //             cond: {
    //               $regexMatch: { input: '$$timestamp.text', regex: regex },
    //             },
    //           },
    //         },
    //         count: {
    //           $reduce: {
    //             input: '$timestamps',
    //             initialValue: 0,
    //             in: {
    //               $add: [
    //                 '$$value',
    //                 {
    //                   $size: {
    //                     $regexFindAll: { input: '$$this.text', regex: regex },
    //                   },
    //                 },
    //               ],
    //             },
    //           },
    //         },
    //       },
    //     },
    //   ])
    //   .toArray();
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
