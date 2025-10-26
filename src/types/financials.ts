export type Period = 'TTM' | 'FY2024' | 'FY2023';

export interface IncomeStatementInput {
  revenue: number;
  returnsAllowances: number;
  cogs: number;
  salariesWages: number;
  rent: number;
  utilities: number;
  insurance: number;
  marketing: number;
  depreciation: number;
  otherOpex: number;
  interestExpense: number;
  taxes: number; // allow 0; auto-estimate if left blank
}

export interface BalanceSheetInput {
  // Assets
  cash: number;
  ar: number;
  inventory: number;
  otherCurrentAssets: number;
  ppeNet: number;
  otherLongAssets: number;
  // Liabilities
  ap: number;
  accruedLiabilities: number;
  debtCurrent: number;
  debtLong: number;
  // Equity
  ownersEquity: number; // if 0, we'll back into it
  ownerDistributions: number; // for CFF
}

export interface CashFlowDerived {
  cfo: number;
  cfi: number;
  cff: number;
  netChangeCash: number;
}

export interface FinancialModel {
  period: Period;
  is: IncomeStatementInput;
  bs: BalanceSheetInput;
  assumptions: {
    accrualVsCash: 'accrual' | 'cash';
    ownerSalaryIncluded: boolean;
    taxRateDefault: number; // e.g., 0.21
  };
}
