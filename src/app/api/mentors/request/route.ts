import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MentorRequest } from '@/types';

const mentorRequestSchema = z.object({
  companyName: z.string().min(1),
  industry: z.enum(['Home Services', 'E-commerce', 'Healthcare', 'Restaurants', 'B2B Services', 'Education', 'Other']),
  needs: z.array(z.string())
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = mentorRequestSchema.parse(body);
    
    // Mock mentor request response
    const response = {
      ok: true,
      estResponseTime: '24–48h',
      message: 'Your mentor request has been submitted. We\'ll match you with an experienced seller in your industry.'
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
      { error: 'Failed to submit mentor request' },
      { status: 500 }
    );
  }
}
