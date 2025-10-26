import * as XLSX from 'xlsx';
import { FinancialModel } from '@/types/financials';
import { computeBS, computeCF, computeIS } from './compute';

export function exportToXlsx(model: FinancialModel) {
  const isCalc = computeIS(model.is, model.assumptions.taxRateDefault);
  const bsCalc = computeBS(model.bs);
  const cfCalc = computeCF(model);

  const wb = XLSX.utils.book_new();

  const isRows = [
    ['Income Statement', model.period, ''],
    ['Revenue (Gross)', model.is.revenue],
    ['Returns & Allowances', model.is.returnsAllowances],
    ['Revenue (Net)', isCalc.revenueNet],
    ['COGS', model.is.cogs],
    ['Gross Profit', isCalc.grossProfit],
    ['Salaries & Wages', model.is.salariesWages],
    ['Rent', model.is.rent],
    ['Utilities', model.is.utilities],
    ['Insurance', model.is.insurance],
    ['Marketing', model.is.marketing],
    ['Depreciation', model.is.depreciation],
    ['Other Opex', model.is.otherOpex],
    ['EBIT', isCalc.ebit],
    ['Interest Expense', model.is.interestExpense],
    ['Taxes', isCalc.taxes],
    ['Net Income', isCalc.netIncome],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(isRows), 'Income Statement');

  const bsRows = [
    ['Balance Sheet', model.period, ''],
    ['Cash', model.bs.cash],
    ['Accounts Receivable', model.bs.ar],
    ['Inventory', model.bs.inventory],
    ['Other Current Assets', model.bs.otherCurrentAssets],
    ['PP&E (Net)', model.bs.ppeNet],
    ['Other Long Assets', model.bs.otherLongAssets],
    ['Total Assets', bsCalc.totalAssets],
    ['Accounts Payable', model.bs.ap],
    ['Accrued Liabilities', model.bs.accruedLiabilities],
    ['Current Debt', model.bs.debtCurrent],
    ['Long-term Debt', model.bs.debtLong],
    ['Total Liabilities', bsCalc.totalLiabilities],
    ['Owner\'s Equity', bsCalc.ownersEquity],
    ['Balance Check (should be 0)', bsCalc.balanceCheck],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(bsRows), 'Balance Sheet');

  const cfRows = [
    ['Cash Flow (Indirect)', model.period, ''],
    ['CFO', cfCalc.cfo],
    ['CFI', cfCalc.cfi],
    ['CFF', cfCalc.cff],
    ['Net Change in Cash', cfCalc.netChangeCash],
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(cfRows), 'Cash Flow');

  const fname = `Sellable_${model.period}_3Statements.xlsx`;
  XLSX.writeFile(wb, fname);
}
