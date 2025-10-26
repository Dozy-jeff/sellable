'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ReadinessWidget from '@/components/ReadinessWidget';
import Timeline from '@/components/Timeline';
import TaskCards from '@/components/TaskCards';
import Checklist from '@/components/Checklist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReadinessResult } from '@/types';

export default function SellerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    // Get readiness result from sessionStorage
    const stored = sessionStorage.getItem('readinessResult');
    if (stored) {
      setReadinessResult(JSON.parse(stored));
    }
    
    // Get completed tasks
    const completed = JSON.parse(localStorage.getItem('sellable:completed-tasks') || '[]');
    setCompletedTasks(completed);
    
    setIsLoading(false);
  }, []);

  const handleChecklistComplete = () => {
    router.push('/seller/ready');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!readinessResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No readiness data found</h1>
          <p className="text-muted-foreground mb-6">Please complete the onboarding process first.</p>
          <Button onClick={() => router.push('/seller')}>
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const currentStep = readinessResult.readiness >= 80 ? 3 : readinessResult.readiness >= 60 ? 2 : 1;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Your Accelerator Dashboard" 
        description="Increase your score by completing tasks and following your personalized plan."
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Readiness Widget */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Sellable Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReadinessWidget 
                    score={readinessResult.readiness}
                    revenue={500000} // Mock data
                    ebitda={100000} // Mock data
                    employees={8} // Mock data
                  />
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline currentStep={currentStep} />
                </CardContent>
              </Card>

              {/* Task Cards */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Today's Tasks</h2>
                <TaskCards />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <Checklist 
                    items={readinessResult.checklist}
                    onComplete={handleChecklistComplete}
                    completedItems={completedTasks}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {readinessResult.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Checklist Items</span>
                      <span>{completedTasks.length} / {readinessResult.checklist.length}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(completedTasks.length / readinessResult.checklist.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Complete all checklist items to proceed to the next stage.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
