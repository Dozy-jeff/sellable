import { BalanceSheetInput, CashFlowDerived, FinancialModel, IncomeStatementInput } from '@/types/financials';

export function safe(n?: number) { return Number.isFinite(n as number) ? Number(n) : 0; }

export function computeIS(is: IncomeStatementInput, taxRateDefault = 0.21) {
  const revenueNet = safe(is.revenue) - safe(is.returnsAllowances);
  const grossProfit = revenueNet - safe(is.cogs);
  const opex = safe(is.salariesWages) + safe(is.rent) + safe(is.utilities) + safe(is.insurance) +
               safe(is.marketing) + safe(is.depreciation) + safe(is.otherOpex);
  const ebit = grossProfit - opex;
  const ebt = ebit - safe(is.interestExpense);
  const taxes = is.taxes > 0 ? safe(is.taxes) : Math.max(0, ebt * taxRateDefault);
  const netIncome = ebt - taxes;
  return { revenueNet, grossProfit, opex, ebit, ebt, taxes, netIncome };
}

export function computeBS(bs: BalanceSheetInput) {
  const currentAssets = safe(bs.cash) + safe(bs.ar) + safe(bs.inventory) + safe(bs.otherCurrentAssets);
  const longAssets = safe(bs.ppeNet) + safe(bs.otherLongAssets);
  const totalAssets = currentAssets + longAssets;

  const currentLiab = safe(bs.ap) + safe(bs.accruedLiabilities) + safe(bs.debtCurrent);
  const longLiab = safe(bs.debtLong);
  const totalLiabilities = currentLiab + longLiab;

  const ownersEquity = safe(bs.ownersEquity) || (totalAssets - totalLiabilities);
  const balanceCheck = totalAssets - (totalLiabilities + ownersEquity); // should equal 0

  return {
    currentAssets, longAssets, totalAssets,
    currentLiab, longLiab, totalLiabilities,
    ownersEquity, balanceCheck
  };
}

// Basic indirect cash flow based on single-period deltas.
// For MVP we assume users provide one period (TTM). We derive CFO using NI + non-cash + WC changes
// To compute deltas we would need a prior snapshot; for MVP we treat CFS as illustrative from inputs.
export function computeCF(m: FinancialModel, prior?: FinancialModel): CashFlowDerived {
  const { is, bs, assumptions } = m;
  const isCalc = computeIS(is, assumptions.taxRateDefault);

  if (!prior) {
    // MVP: approximate WC change using simple heuristics or zero.
    const nonCash = safe(is.depreciation);
    const deltaWC = 0; // leave 0 until we capture prior period
    const cfo = isCalc.netIncome + nonCash + deltaWC;

    // CFI: assume ΔPP&E ~ 0 for single period without deltas
    const cfi = 0;

    // CFF: debt changes + owner distributions (without prior, we just use distributions)
    const cff = -safe(bs.ownerDistributions);

    const netChangeCash = cfo + cfi + cff;
    return { cfo, cfi, cff, netChangeCash };
  }

  // With prior: proper deltas
  const prev = prior;
  const nonCash = safe(is.depreciation);
  const deltaAR = safe(bs.ar) - safe(prev.bs.ar);
  const deltaInv = safe(bs.inventory) - safe(prev.bs.inventory);
  const deltaAP = safe(bs.ap) - safe(prev.bs.ap);
  const deltaWC = -(deltaAR + deltaInv) + deltaAP;
  const cfo = computeIS(is, assumptions.taxRateDefault).netIncome + nonCash + deltaWC;

  const cfi = -(safe(bs.ppeNet) - safe(prev.bs.ppeNet));
  const deltaDebt = (safe(bs.debtCurrent) + safe(bs.debtLong)) - (safe(prev.bs.debtCurrent) + safe(prev.bs.debtLong));
  const cff = deltaDebt - safe(bs.ownerDistributions);
  const netChangeCash = cfo + cfi + cff;
  return { cfo, cfi, cff, netChangeCash };
}
