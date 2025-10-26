import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatMoney, pctColor, bgColor, getReadinessLabel } from '@/lib/format';

interface ReadinessWidgetProps {
  score: number;
  revenue?: number;
  ebitda?: number;
  employees?: number;
}

export default function ReadinessWidget({ score, revenue, ebitda, employees }: ReadinessWidgetProps) {
  const badges = [
    { label: 'Financials', status: score >= 60 },
    { label: 'Ops', status: score >= 50 },
    { label: 'HR', status: employees && employees > 5 },
    { label: 'Compliance', status: score >= 70 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Sellable Score</h3>
          <Badge variant={score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
            {score}%
          </Badge>
        </div>
        <Progress value={score} className="h-2" />
        <p className={`text-sm mt-1 ${pctColor(score)}`}>
          {getReadinessLabel(score)}
        </p>
      </div>

      {revenue && (
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Revenue (TTM)</p>
            <p className="font-semibold">{formatMoney(revenue)}</p>
          </div>
          {ebitda && (
            <div>
              <p className="text-muted-foreground">EBITDA</p>
              <p className="font-semibold">{formatMoney(ebitda)}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            variant={badge.status ? 'default' : 'outline'}
            className="text-xs"
          >
            {badge.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
