import { Badge } from '@/components/ui/badge';
import { formatMoney, pctColor, getReadinessLabel } from '@/lib/format';

interface ReadinessWidgetProps {
  score: number;
  revenue?: number;
  ebitda?: number;
  employees?: number;
  progress?: number;
}

export default function ReadinessWidget({ score, revenue, ebitda, employees, progress }: ReadinessWidgetProps) {
  const progressValue = Math.max(0, Math.min(100, progress ?? score));
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progressValue / 100) * circumference;
  const badges = [
    { label: 'Financials', status: score >= 60 },
    { label: 'Ops', status: score >= 50 },
    { label: 'HR', status: employees && employees > 5 },
    { label: 'Compliance', status: score >= 70 }
  ];

  const badgeVariant = progressValue >= 80 ? 'default' : progressValue >= 60 ? 'secondary' : 'destructive';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="relative w-32 h-32">
          <svg width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              strokeWidth={12}
              className="text-muted-foreground stroke-current opacity-30"
              fill="transparent"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              strokeWidth={12}
              strokeLinecap="round"
              className="text-primary stroke-current"
              fill="transparent"
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: dashOffset,
                transition: 'stroke-dashoffset 0.6s ease'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{Math.round(progressValue)}%</span>
            <span className="text-xs text-muted-foreground">Complete</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Sellable Progress</h3>
            <Badge variant={badgeVariant}>{Math.round(progressValue)}%</Badge>
          </div>
          <p className={`text-sm ${pctColor(progressValue)}`}>
            {getReadinessLabel(progressValue)}
          </p>
          <p className="text-xs text-muted-foreground">
            Progress reflects your completed articles and tasks.
          </p>
        </div>
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
