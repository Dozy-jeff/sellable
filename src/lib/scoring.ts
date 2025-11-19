import { SellerIntake } from '@/types';

export function scoreFromIntake(x: SellerIntake): number {
  let score = 40;
  if (x.revenue > 500_000) score += 10;
  if ((x.ebitda ?? 0) > 0) score += 5;
  if (x.employees > 5) score += 10;
  if (x.systems?.length) score += 10;
  if (x.hasSOPs) score += 10;
  if (x.customerConcentration === 'high') score -= 10;

  // Debt scoring
  const debtToRevenue = (x.debt ?? 0) / (x.revenue || 1);
  if (debtToRevenue > 0.5) score -= 10;
  else if (debtToRevenue > 0.3) score -= 5;
  else if (debtToRevenue === 0 || !x.debt) score += 5;

  return Math.min(95, Math.max(10, score));
}

export function checklistForScore(score: number): string[] {
  const base = [
    'Upload clean P&L (TTM + 3Y)',
    'Provide customer concentration analysis',
    'Create/update SOPs for core ops',
    'Tax returns (last 2 years)',
    'Employee roster + roles'
  ];
  if (score < 60) base.unshift('Categorize all transactions (last 12 months)');
  if (score >= 75) base.push('Prepare data room index (folders, naming)');
  return base;
}

export function getNextSteps(blockers: string[]): string[] {
  const stepMap: Record<string, string> = {
    'messy financials': 'Connect QuickBooks and categorize transactions',
    'no SOPs': 'Create SOP for order fulfillment',
    'customer concentration': 'Diversify customer base',
    'no systems': 'Implement basic business systems',
    'tax issues': 'Resolve tax compliance issues'
  };
  
  return blockers.map(blocker => stepMap[blocker] || `Address ${blocker}`);
}
