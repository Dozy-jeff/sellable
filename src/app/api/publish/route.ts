import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PublishRequest, PublishResponse } from '@/types';

const publishSchema = z.object({
  listingId: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { listingId } = publishSchema.parse(body);
    
    // Mock successful publish
    const response: PublishResponse = {
      ok: true,
      url: `/buyer?published=${listingId}`
    };
    
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to publish listing' },
      { status: 500 }
    );
  }
}
