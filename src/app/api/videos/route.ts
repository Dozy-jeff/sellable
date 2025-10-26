import { NextResponse } from 'next/server';
import { processVideos, sellableVideos } from '@/data/videos';

export async function GET() {
  try {
    return NextResponse.json({
      processVideos,
      sellableVideos
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
