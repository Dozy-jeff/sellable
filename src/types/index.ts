export type Industry =
  | 'Home Services' | 'E-commerce' | 'Healthcare'
  | 'Restaurants' | 'B2B Services' | 'Education' | 'Other';

export type BusinessModel =
  | 'Local Services' | 'Shopify/DTC' | 'Marketplace'
  | 'SaaS' | 'Agency' | 'Franchise';

export interface Listing {
  id: string;
  name: string;
  location: string;
  industry: Industry;
  model: BusinessModel;
  revenueTTM: number;
  ebitdaTTM: number;
  employees: number;
  yearsOperating: number;
  systems: string[];          // e.g., ['QuickBooks','Shopify']
  readiness: number;          // 0–100
  highlights: string[];
}

export interface SellerIntake {
  companyName: string;
  website?: string;
  location: string;
  industry: Industry;
  model: BusinessModel;
  revenue: number;            // annual, USD
  ebitda?: number;
  employees: number;
  yearsOperating: number;
  systems: string[];
  timeline: 'ASAP' | '3-6m' | '6-12m' | '12-18m' | 'Exploring';
  blockers: string[];         // e.g., ['messy financials','no SOPs']
  hasSOPs?: boolean;
  customerConcentration?: 'low'|'med'|'high';
}

export interface ReadinessResult {
  readiness: number;
  checklist: string[];
  nextSteps: string[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  url: string;
  category: 'process' | 'sellable';
}

export interface MentorRequest {
  companyName: string;
  industry: Industry;
  needs: string[];
}

export interface PublishRequest {
  listingId: string;
}

export interface PublishResponse {
  ok: boolean;
  url: string;
}
