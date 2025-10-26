'use client';
import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { flowSections, Q } from './questions';
import { cn } from '@/lib/utils';

type Props = {
  model: any;
  stepIndex: number;
  setStepIndex: (n: number) => void;
  onChange: (m: any) => void;
};

function setDeep(obj: any, path: string, value: any) {
  const parts = path.split('.');
  const last = parts.pop()!;
  const parent = parts.reduce((o, p) => (o[p] ??= {}), obj);
  parent[last] = value;
}

function getDeep(obj: any, path: string) {
  return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
}

export function QuestionStepper({ model, stepIndex, setStepIndex, onChange }: Props) {
  const flat: Q[] = useMemo(() => flowSections.flatMap(s => s.questions), []);
  const q = flat[stepIndex];
  const value = getDeep(model, q.field) ?? '';

  const onPrev = () => setStepIndex(Math.max(0, stepIndex - 1));
  const onNext = () => {
    if (stepIndex < flat.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const onInput = (v: any) => {
    const draft = structuredClone(model);
    const parsed = q.type === 'currency' ? Number(String(v).replace(/[^0-9.-]/g, '')) : v;
    setDeep(draft, q.field, Number.isNaN(parsed) ? 0 : parsed);
    onChange(draft);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Step {stepIndex + 1} of {flat.length}</div>
      <h3 className="text-xl font-semibold">{q.label}</h3>
      <p className="text-sm text-muted-foreground">{q.help}</p>
      <p className="text-sm italic text-muted-foreground">Where to find it: {q.where}</p>

      {q.type === 'currency' && (
        <div className="space-y-2">
          <Label>Amount</Label>
          <Input inputMode="decimal" placeholder={q.placeholder ?? '0'} value={value} onChange={e => onInput(e.target.value)} />
        </div>
      )}

      {q.type === 'radio' && (
        <div className="flex gap-3">
          {q.options?.map(opt => (
            <Button
              key={opt.label}
              variant={value === opt.value ? 'default' : 'secondary'}
              onClick={() => onInput(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}

      {q.type === 'select' && (
        <select
          className={cn('border rounded-md p-2')}
          value={value ?? ''}
          onChange={e => onInput(Number(e.target.value))}
        >
          {q.options?.map(o => <option key={o.label} value={o.value}>{o.label}</option>)}
        </select>
      )}

      <Separator />
      <div className="flex justify-between">
        <Button variant="secondary" onClick={onPrev} disabled={stepIndex === 0}>Previous</Button>
        <Button onClick={onNext} disabled={stepIndex >= flat.length - 1}>
          {stepIndex >= flat.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
