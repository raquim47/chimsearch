import { connectToDatabase } from '@/services/mongodb';
import { getVideoDetails } from '@/services/youtube';
import { NextResponse, NextRequest } from 'next/server';

type Timestamp = { time: string; text: string };
type Accumulator = { keywordCount: number; timestamps: Timestamp[] };

export const GET = async (
  req: NextRequest,
  { params }: { params: { videoId: string } }
) => {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '';
  const year = searchParams.get('year') || '2024';
  const videoId = params.videoId;
  if (!keyword)
    return NextResponse.json({ error: 'Keyword is Required' }, { status: 400 });

  try {
    const db = await connectToDatabase();
    const collection = db.collection(year);
    const video = await collection.findOne({ videoId: videoId });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    const { keywordCount, timestamps } = video.timestamps.reduce(
      (acc: Accumulator, timestamp: Timestamp) => {
        const match = timestamp.text.match(new RegExp(keyword, 'gi'));
        if (match) {
          acc.keywordCount += match.length;
          acc.timestamps.push(timestamp);
        }
        return acc;
      },
      { keywordCount: 0, timestamps: [] }
    );

    const videoDetails = await getVideoDetails([
      { videoId: videoId, count: keywordCount },
    ]);
    return NextResponse.json({
      ...videoDetails[0],
      timestamps,
    });
  } catch (error) {
    console.error('Video Detail API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
