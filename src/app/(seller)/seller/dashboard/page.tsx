'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ReadinessWidget from '@/components/ReadinessWidget';
import StepTracker from '@/components/StepTracker';
import Checklist from '@/components/Checklist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReadinessResult } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getReadinessResult, getCompletedTasks, getStepProgress, saveStepProgress, saveReadinessResult, getSellerIntake } from '@/lib/firestore';
import { calculateStepFromScore } from '@/data/processSteps';

function SellerDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userProfile } = useAuth();
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [completedArticles, setCompletedArticles] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [baseScore, setBaseScore] = useState(0);
  const [scoreBonus, setScoreBonus] = useState(0);
  const [sellerData, setSellerData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        // Get readiness result from Firestore
        const firestoreReadiness = await getReadinessResult(user.uid);

        // Fallback to sessionStorage for migration
        if (!firestoreReadiness) {
          const stored = sessionStorage.getItem('readinessResult');
          if (stored) {
            const parsed = JSON.parse(stored);
            setReadinessResult(parsed);
            setBaseScore(parsed.readiness);
          }
        } else {
          setReadinessResult(firestoreReadiness);
          setBaseScore(firestoreReadiness.readiness);
        }

        // Get seller intake data
        const intake = await getSellerIntake(user.uid);
        if (intake) {
          setSellerData(intake);
        }

        // Get step progress from Firestore
        const stepProgress = await getStepProgress(user.uid);
        if (stepProgress) {
          setCompletedArticles(stepProgress.completedArticles || []);
          setCompletedTasks(stepProgress.completedTasks || []);
          setCurrentStep(stepProgress.currentStep || 1);
        } else {
          // Fallback to localStorage for migration
          const completed = JSON.parse(localStorage.getItem('sellable:completed-tasks') || '[]');
          setCompletedTasks(completed);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Calculate current step based on score
  useEffect(() => {
    if (readinessResult) {
      const step = calculateStepFromScore(readinessResult.readiness + scoreBonus);
      setCurrentStep(step);
    }
  }, [readinessResult, scoreBonus]);

  const handleArticleComplete = useCallback(async (articleId: string) => {
    if (!user) return;
    const newCompleted = [...completedArticles, articleId];
    setCompletedArticles(newCompleted);

    await saveStepProgress(user.uid, {
      currentStep,
      completedArticles: newCompleted,
      completedTasks
    });
  }, [user, completedArticles, completedTasks, currentStep]);

  const handleTaskComplete = useCallback(async (taskId: string) => {
    if (!user) return;
    const newCompleted = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    setCompletedTasks(newCompleted);

    await saveStepProgress(user.uid, {
      currentStep,
      completedArticles,
      completedTasks: newCompleted
    });
  }, [user, completedTasks, completedArticles, currentStep]);

  const handleScoreUpdate = useCallback(async (bonus: number) => {
    setScoreBonus(bonus);

    // Update the readiness result with bonus
    if (user && readinessResult) {
      const newScore = Math.min(100, baseScore + bonus);
      const updatedResult = {
        ...readinessResult,
        readiness: newScore
      };
      await saveReadinessResult(user.uid, updatedResult);
    }
  }, [user, readinessResult, baseScore]);

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

  const totalScore = Math.min(100, baseScore + scoreBonus);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Your Accelerator Dashboard"
        description="Increase your score by completing articles and tasks in each step."
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Readiness Widget */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Sellable Score</CardTitle>
                    {scoreBonus > 0 && (
                      <span className="text-sm text-green-600 font-medium">
                        +{scoreBonus} bonus points
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ReadinessWidget
                    score={totalScore}
                    revenue={sellerData?.revenue || 0}
                    ebitda={sellerData?.ebitda || 0}
                    employees={sellerData?.employees || 0}
                  />
                </CardContent>
              </Card>

              {/* Step Tracker */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Progress Steps</h2>
                <StepTracker
                  currentStep={currentStep}
                  completedArticles={completedArticles}
                  completedTasks={completedTasks}
                  onArticleComplete={handleArticleComplete}
                  onTaskComplete={handleTaskComplete}
                  onScoreUpdate={handleScoreUpdate}
                />
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
                  <CardTitle>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Articles Read</span>
                        <span>{completedArticles.length}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, completedArticles.length * 10)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tasks Completed</span>
                        <span>{completedTasks.length}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, completedTasks.length * 6)}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Complete articles and tasks to increase your sellable score.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Score</span>
                      <span className="font-medium">{baseScore}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Article Bonus</span>
                      <span>+{completedArticles.length}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Task Bonus</span>
                      <span>+{completedTasks.length * 2}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total Score</span>
                      <span>{totalScore}</span>
                    </div>
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

export default function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <SellerDashboardContent />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
