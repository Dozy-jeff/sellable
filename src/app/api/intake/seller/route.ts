import { NextResponse } from 'next/server';
import { z } from 'zod';
import { SellerIntake, ReadinessResult } from '@/types';
import { scoreFromIntake, checklistForScore, getNextSteps } from '@/lib/scoring';

const sellerIntakeSchema = z.object({
  companyName: z.string().min(1),
  website: z.string().optional(),
  location: z.string().min(1),
  industry: z.enum(['Home Services', 'E-commerce', 'Healthcare', 'Restaurants', 'B2B Services', 'Education', 'Other']),
  model: z.enum(['Local Services', 'Shopify/DTC', 'Marketplace', 'SaaS', 'Agency', 'Franchise']),
  revenue: z.number().min(0),
  ebitda: z.number().optional(),
  employees: z.number().min(0),
  yearsOperating: z.number().min(0),
  systems: z.array(z.string()),
  timeline: z.enum(['ASAP', '3-6m', '6-12m', '12-18m', 'Exploring']),
  blockers: z.array(z.string()),
  hasSOPs: z.boolean().optional(),
  customerConcentration: z.enum(['low', 'med', 'high']).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = sellerIntakeSchema.parse(body);
    
    const readiness = scoreFromIntake(validatedData);
    const checklist = checklistForScore(readiness);
    const nextSteps = getNextSteps(validatedData.blockers);
    
    const result: ReadinessResult = {
      readiness,
      checklist,
      nextSteps
    };
    
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process intake' },
      { status: 500 }
    );
  }
}
