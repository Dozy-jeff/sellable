export type Q = {
  id: string;
  label: string;
  field: string;       // dot path into model (e.g., 'is.revenue', 'bs.cash')
  type: 'currency' | 'select' | 'radio';
  help: string;        // plain-English definition
  where: string;       // where to find it
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: any }[];
};

export const introQuestions: Q[] = [
  {
    id: 'assumptions.method',
    label: 'Accounting method',
    field: 'assumptions.accrualVsCash',
    type: 'radio',
    help: 'Whether your books are kept on accrual (record when earned/incurred) or cash (record when paid/received).',
    where: 'QuickBooks settings, your accountant, or last year\'s tax return.',
    options: [
      { label: 'Accrual', value: 'accrual' },
      { label: 'Cash', value: 'cash' },
    ],
    required: true,
  },
  {
    id: 'assumptions.ownerpay',
    label: 'Is owner salary included in salaries & wages?',
    field: 'assumptions.ownerSalaryIncluded',
    type: 'radio',
    help: 'If you pay yourself via payroll, include it here; if distributions only, choose No.',
    where: 'Payroll records, bank statements.',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    required: true,
  },
  {
    id: 'assumptions.taxrate',
    label: 'Default tax rate (if unknown we\'ll estimate)',
    field: 'assumptions.taxRateDefault',
    type: 'select',
    help: 'Used to estimate taxes if not provided; you can override later.',
    where: 'Ask your accountant; defaults vary.',
    options: [
      { label: '21%', value: 0.21 },
      { label: '24%', value: 0.24 },
      { label: '28%', value: 0.28 },
      { label: '30%', value: 0.30 },
    ],
  },
];

export const isQuestions: Q[] = [
  {
    id: 'is.revenue',
    label: 'Total revenue (TTM or FY)',
    field: 'is.revenue',
    type: 'currency',
    help: 'All money earned from customers before any deductions.',
    where: 'QuickBooks P&L (Total Income), POS sales report, or Schedule C line 1.',
    required: true,
    placeholder: 'e.g., 500,000',
  },
  {
    id: 'is.returnsAllowances',
    label: 'Returns & allowances',
    field: 'is.returnsAllowances',
    type: 'currency',
    help: 'Refunds, discounts, or returns that reduce gross revenue.',
    where: 'P&L or sales system adjustments.',
  },
  {
    id: 'is.cogs',
    label: 'Cost of goods sold (COGS)',
    field: 'is.cogs',
    type: 'currency',
    help: 'Direct costs to produce or deliver your product/service (materials, subcontractors).',
    where: 'P&L COGS section; Schedule C Part III.',
    required: true,
  },
  { id: 'is.salariesWages', label: 'Salaries & wages', field: 'is.salariesWages', type: 'currency', help: 'Payroll for employees (optionally payroll taxes/benefits).', where: 'Payroll system, P&L.' },
  { id: 'is.rent', label: 'Rent', field: 'is.rent', type: 'currency', help: 'Rent or lease expenses for office, warehouse, etc.', where: 'P&L; lease agreements.' },
  { id: 'is.utilities', label: 'Utilities', field: 'is.utilities', type: 'currency', help: 'Electricity, gas, water, internet, phone.', where: 'P&L; utility bills.' },
  { id: 'is.insurance', label: 'Insurance', field: 'is.insurance', type: 'currency', help: 'General liability, workers\' comp, health, property.', where: 'P&L; insurance statements.' },
  { id: 'is.marketing', label: 'Marketing & advertising', field: 'is.marketing', type: 'currency', help: 'Paid ads, sponsorships, creative services, SEO tools.', where: 'P&L; ad platform receipts.' },
  { id: 'is.depreciation', label: 'Depreciation & amortization', field: 'is.depreciation', type: 'currency', help: 'Non-cash expense allocating asset cost over time.', where: 'Tax return; fixed asset schedule.' },
  { id: 'is.otherOpex', label: 'Other operating expenses', field: 'is.otherOpex', type: 'currency', help: 'Any other operating costs not listed above.', where: 'P&L.' },
  { id: 'is.interestExpense', label: 'Interest expense', field: 'is.interestExpense', type: 'currency', help: 'Interest you pay on loans or credit lines.', where: 'P&L; loan statements.' },
  { id: 'is.taxes', label: 'Income taxes (if known)', field: 'is.taxes', type: 'currency', help: 'Taxes on profit; leave blank to estimate using default rate.', where: 'Tax returns; CPA.' },
];

export const bsQuestions: Q[] = [
  { id: 'bs.cash', label: 'Cash', field: 'bs.cash', type: 'currency', help: 'Cash & checking balances at period end.', where: 'Bank statements; Balance Sheet.' },
  { id: 'bs.ar', label: 'Accounts receivable', field: 'bs.ar', type: 'currency', help: 'Invoices you\'ve issued but not yet collected.', where: 'Balance Sheet; A/R aging.' },
  { id: 'bs.inventory', label: 'Inventory', field: 'bs.inventory', type: 'currency', help: 'Finished goods or materials on hand.', where: 'Balance Sheet; inventory report.' },
  { id: 'bs.otherCurrentAssets', label: 'Other current assets', field: 'bs.otherCurrentAssets', type: 'currency', help: 'Prepaids, deposits, etc.', where: 'Balance Sheet.' },
  { id: 'bs.ppeNet', label: 'PP&E (net)', field: 'bs.ppeNet', type: 'currency', help: 'Property, plant & equipment after depreciation.', where: 'Balance Sheet; fixed asset schedule.' },
  { id: 'bs.otherLongAssets', label: 'Other long-term assets', field: 'bs.otherLongAssets', type: 'currency', help: 'Intangibles, long-term deposits.', where: 'Balance Sheet.' },
  { id: 'bs.ap', label: 'Accounts payable', field: 'bs.ap', type: 'currency', help: 'Bills you owe suppliers.', where: 'Balance Sheet; A/P aging.' },
  { id: 'bs.accruedLiabilities', label: 'Accrued liabilities', field: 'bs.accruedLiabilities', type: 'currency', help: 'Payroll accruals, taxes payable, etc.', where: 'Balance Sheet.' },
  { id: 'bs.debtCurrent', label: 'Current portion of debt', field: 'bs.debtCurrent', type: 'currency', help: 'Debt due within 12 months.', where: 'Loan amortization schedule.' },
  { id: 'bs.debtLong', label: 'Long-term debt', field: 'bs.debtLong', type: 'currency', help: 'Debt due after 12 months.', where: 'Loan statements.' },
  { id: 'bs.ownersEquity', label: 'Owner\'s equity (if known)', field: 'bs.ownersEquity', type: 'currency', help: 'Retained earnings + paid-in capital; leave blank to compute.', where: 'Balance Sheet; CPA.' },
  { id: 'bs.ownerDistributions', label: 'Owner distributions (this period)', field: 'bs.ownerDistributions', type: 'currency', help: 'Cash distributions to owners; used in cash flow from financing.', where: 'Bank statements; equity ledger.' },
];

export const flowSections = [
  { id: 'intro', title: 'Assumptions', questions: introQuestions },
  { id: 'is', title: 'Income Statement', questions: isQuestions },
  { id: 'bs', title: 'Balance Sheet', questions: bsQuestions },
];
