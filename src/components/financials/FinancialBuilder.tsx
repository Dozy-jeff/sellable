'use client';
import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { flowSections } from './questions';
import { QuestionStepper } from './QuestionStepper';
import { FinancialSheet } from './FinancialSheet';
import { BottomBar } from './BottomBar';
import { computeBS, computeCF, computeIS } from '@/lib/financials/compute';
import type { FinancialModel } from '@/types/financials';

const EMPTY: FinancialModel = {
  period: 'TTM',
  is: { revenue: 0, returnsAllowances: 0, cogs: 0, salariesWages: 0, rent: 0, utilities: 0, insurance: 0, marketing: 0, depreciation: 0, otherOpex: 0, interestExpense: 0, taxes: 0 },
  bs: { cash: 0, ar: 0, inventory: 0, otherCurrentAssets: 0, ppeNet: 0, otherLongAssets: 0, ap: 0, accruedLiabilities: 0, debtCurrent: 0, debtLong: 0, ownersEquity: 0, ownerDistributions: 0 },
  assumptions: { accrualVsCash: 'accrual', ownerSalaryIncluded: true, taxRateDefault: 0.21 },
};

export default function FinancialBuilder() {
  const [model, setModel] = useState<FinancialModel>(() => {
    if (typeof window === 'undefined') return EMPTY;
    const raw = localStorage.getItem('sellable:fin-model:v1');
    try { return raw ? JSON.parse(raw) as FinancialModel : EMPTY; } catch { return EMPTY; }
  });

  const [stepIndex, setStepIndex] = useState<number>(0);
  const sectionCount = flowSections.reduce((acc, s) => acc + s.questions.length, 0);
  const completedCount = stepIndex; // simple MVP

  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('sellable:fin-model:v1', JSON.stringify(model));
    }, 400);
    return () => clearTimeout(id);
  }, [model]);

  const isCalc = useMemo(() => computeIS(model.is, model.assumptions.taxRateDefault), [model]);
  const bsCalc = useMemo(() => computeBS(model.bs), [model.bs]);
  const cfCalc = useMemo(() => computeCF(model), [model]);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <QuestionStepper
            model={model}
            stepIndex={stepIndex}
            setStepIndex={setStepIndex}
            onChange={setModel}
          />
        </Card>
        <Card className="p-4">
          <FinancialSheet
            model={model}
            isCalc={isCalc}
            bsCalc={bsCalc}
            cfCalc={cfCalc}
            onChange={setModel}
          />
        </Card>
      </div>
      <BottomBar
        model={model}
        stepIndex={stepIndex}
        setStepIndex={setStepIndex}
        totalSteps={sectionCount}
      />
    </div>
  );
}
