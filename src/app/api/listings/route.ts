import { NextResponse } from 'next/server';
import { mockListings } from '@/data/listings';

export async function GET() {
  try {
    return NextResponse.json(mockListings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}
