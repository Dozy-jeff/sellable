'use client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { exportToXlsx } from '@/lib/financials/export';
import { useRouter } from 'next/navigation';

export function BottomBar({
  model,
  stepIndex,
  setStepIndex,
  totalSteps,
}: {
  model: any; stepIndex: number; setStepIndex: (n: number) => void; totalSteps: number;
}) {
  const router = useRouter();
  const pct = Math.round(((stepIndex + 1) / totalSteps) * 100);
  const isComplete = stepIndex >= totalSteps - 1;

  const handleComplete = () => {
    // Mark financials as completed in localStorage
    const completedTasks = JSON.parse(localStorage.getItem('sellable:completed-tasks') || '[]');
    if (!completedTasks.includes('financials')) {
      completedTasks.push('financials');
      localStorage.setItem('sellable:completed-tasks', JSON.stringify(completedTasks));
    }
    
    // Update readiness score
    const currentScore = parseInt(localStorage.getItem('sellable:readiness-score') || '0');
    const newScore = Math.min(100, currentScore + 20); // Add 20 points for completing financials
    localStorage.setItem('sellable:readiness-score', newScore.toString());
    
    router.push('/seller/dashboard?completed=financials');
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3 w-full md:w-1/2">
        <Progress value={pct} className="w-full" />
        <div className="text-sm text-muted-foreground">{pct}%</div>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0}>Previous</Button>
        <Button onClick={() => setStepIndex(Math.min(totalSteps - 1, stepIndex + 1))} disabled={isComplete}>Next</Button>
        <Button variant="outline" onClick={() => exportToXlsx(model)}>Download XLSX</Button>
        {isComplete && (
          <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
            Complete & Return to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
