'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  model: any;
  isCalc: any;
  bsCalc: any;
  cfCalc: any;
  onChange: (m: any) => void;
};

function setDeep(obj: any, path: string, value: any) {
  const parts = path.split('.');
  const last = parts.pop()!;
  const parent = parts.reduce((o, p) => (o[p] ??= {}), obj);
  parent[last] = value;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function FinancialSheet({ model, isCalc, bsCalc, cfCalc, onChange }: Props) {
  const [activeTab, setActiveTab] = useState('income');

  const handleInputChange = (path: string, value: string) => {
    const draft = structuredClone(model);
    const numValue = Number(value.replace(/[^0-9.-]/g, '')) || 0;
    setDeep(draft, path, numValue);
    onChange(draft);
  };

  return (
    <div className="h-[600px] overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="income">Income Statement</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="income" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Revenue (Gross)</label>
                  <Input
                    value={model.is.revenue || ''}
                    onChange={(e) => handleInputChange('is.revenue', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Returns & Allowances</label>
                  <Input
                    value={model.is.returnsAllowances || ''}
                    onChange={(e) => handleInputChange('is.returnsAllowances', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">Revenue (Net)</span>
                  <span className="font-bold">{formatCurrency(isCalc.revenueNet)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">COGS</label>
                  <Input
                    value={model.is.cogs || ''}
                    onChange={(e) => handleInputChange('is.cogs', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">Gross Profit</span>
                    <span className="font-bold">{formatCurrency(isCalc.grossProfit)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Operating Expenses</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Salaries & Wages</label>
                    <Input
                      value={model.is.salariesWages || ''}
                      onChange={(e) => handleInputChange('is.salariesWages', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rent</label>
                    <Input
                      value={model.is.rent || ''}
                      onChange={(e) => handleInputChange('is.rent', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Utilities</label>
                    <Input
                      value={model.is.utilities || ''}
                      onChange={(e) => handleInputChange('is.utilities', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Insurance</label>
                    <Input
                      value={model.is.insurance || ''}
                      onChange={(e) => handleInputChange('is.insurance', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Marketing</label>
                    <Input
                      value={model.is.marketing || ''}
                      onChange={(e) => handleInputChange('is.marketing', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Depreciation</label>
                    <Input
                      value={model.is.depreciation || ''}
                      onChange={(e) => handleInputChange('is.depreciation', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">EBIT</span>
                  <span className="font-bold">{formatCurrency(isCalc.ebit)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Interest Expense</label>
                  <Input
                    value={model.is.interestExpense || ''}
                    onChange={(e) => handleInputChange('is.interestExpense', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Taxes</label>
                  <Input
                    value={isCalc.taxes || ''}
                    onChange={(e) => handleInputChange('is.taxes', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="bg-primary/10 p-3 rounded border-2 border-primary">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Net Income</span>
                  <span className="font-bold text-lg">{formatCurrency(isCalc.netIncome)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Assets</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Cash</label>
                    <Input
                      value={model.bs.cash || ''}
                      onChange={(e) => handleInputChange('bs.cash', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Accounts Receivable</label>
                    <Input
                      value={model.bs.ar || ''}
                      onChange={(e) => handleInputChange('bs.ar', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Inventory</label>
                    <Input
                      value={model.bs.inventory || ''}
                      onChange={(e) => handleInputChange('bs.inventory', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Other Current Assets</label>
                    <Input
                      value={model.bs.otherCurrentAssets || ''}
                      onChange={(e) => handleInputChange('bs.otherCurrentAssets', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">PP&E (Net)</label>
                    <Input
                      value={model.bs.ppeNet || ''}
                      onChange={(e) => handleInputChange('bs.ppeNet', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Other Long Assets</label>
                    <Input
                      value={model.bs.otherLongAssets || ''}
                      onChange={(e) => handleInputChange('bs.otherLongAssets', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Assets</span>
                    <span className="font-bold">{formatCurrency(bsCalc.totalAssets)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Liabilities</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Accounts Payable</label>
                    <Input
                      value={model.bs.ap || ''}
                      onChange={(e) => handleInputChange('bs.ap', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Accrued Liabilities</label>
                    <Input
                      value={model.bs.accruedLiabilities || ''}
                      onChange={(e) => handleInputChange('bs.accruedLiabilities', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Current Debt</label>
                    <Input
                      value={model.bs.debtCurrent || ''}
                      onChange={(e) => handleInputChange('bs.debtCurrent', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Long-term Debt</label>
                    <Input
                      value={model.bs.debtLong || ''}
                      onChange={(e) => handleInputChange('bs.debtLong', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Liabilities</span>
                    <span className="font-bold">{formatCurrency(bsCalc.totalLiabilities)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Equity</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Owner's Equity</label>
                    <Input
                      value={bsCalc.ownersEquity || ''}
                      onChange={(e) => handleInputChange('bs.ownersEquity', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Owner Distributions</label>
                    <Input
                      value={model.bs.ownerDistributions || ''}
                      onChange={(e) => handleInputChange('bs.ownerDistributions', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className={`p-3 rounded ${Math.abs(bsCalc.balanceCheck) > 0.01 ? 'bg-red-100 border border-red-300' : 'bg-green-100 border border-green-300'}`}>
                  <div className="flex justify-between">
                    <span className="font-medium">Balance Check</span>
                    <span className={`font-bold ${Math.abs(bsCalc.balanceCheck) > 0.01 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(bsCalc.balanceCheck)}
                    </span>
                  </div>
                  {Math.abs(bsCalc.balanceCheck) > 0.01 && (
                    <p className="text-xs text-red-600 mt-1">Should be $0 - check your inputs</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">Cash Flow from Operations (CFO)</span>
                    <span className="font-bold">{formatCurrency(cfCalc.cfo)}</span>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">Cash Flow from Investing (CFI)</span>
                    <span className="font-bold">{formatCurrency(cfCalc.cfi)}</span>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">Cash Flow from Financing (CFF)</span>
                    <span className="font-bold">{formatCurrency(cfCalc.cff)}</span>
                  </div>
                </div>
                <div className="bg-primary/10 p-3 rounded border-2 border-primary">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Net Change in Cash</span>
                    <span className="font-bold text-lg">{formatCurrency(cfCalc.netChangeCash)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
