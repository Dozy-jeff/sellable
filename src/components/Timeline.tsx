import { CheckCircle, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TimelineProps {
  currentStep: number;
}

const milestones = [
  { label: 'Financials', key: 'financials' },
  { label: 'Taxes', key: 'taxes' },
  { label: 'Salary/Payroll', key: 'payroll' },
  { label: 'Ready!', key: 'ready' }
];

export default function Timeline({ currentStep }: TimelineProps) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between">
        {milestones.map((milestone, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={milestone.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <Circle className="h-5 w-5 text-primary fill-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm mt-2 ${isCurrent ? 'font-semibold text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'}`}>
                  {milestone.label}
                </span>
                {isCurrent && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    You are here
                  </Badge>
                )}
              </div>
              {index < milestones.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-muted'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
