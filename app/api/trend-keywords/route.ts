import { connectToDatabase } from '@/services/mongodb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const db = await connectToDatabase();
    const keywordsCollection = db.collection('searchKeywords');

    const trendKeywords = await keywordsCollection
      .find({})
      .sort({ count: -1 })
      .limit(5)
      .toArray();

    return NextResponse.json({ trendKeywords });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
