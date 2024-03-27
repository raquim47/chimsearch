import { connectToDatabase } from './mongodb';

export const getTrendKeywords = async () => {
  'use server';

  try {
    const db = await connectToDatabase();
    const keywordsCollection = db.collection('searchKeywords');
    const result = await keywordsCollection
      .find({})
      .sort({ count: -1 })
      .limit(5)
      .toArray();

    const trendKeywords = result.map((doc) => ({
      _id: doc._id.toString(), 
      keyword: doc.keyword,
      count: doc.count,
    }));
    return trendKeywords;
  } catch (error) {
    console.error('Failed to fetch trend keywords:', error);
    throw new Error('Failed to fetch trend keywords');
  }
};
