import { NextResponse } from 'next/server';
import { mockListings } from '@/data/listings';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const listing = mockListings.find(l => l.id === params.id);
    
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}
