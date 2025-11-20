'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ReadinessWidget from '@/components/ReadinessWidget';
import StepTracker from '@/components/StepTracker';
import Checklist from '@/components/Checklist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import RoleVideos from '@/components/RoleVideos';
import SellerOnboardingForm from '@/components/SellerOnboardingForm';
import { ReadinessResult, SellerIntake } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getReadinessResult, getStepProgress, saveStepProgress, saveReadinessResult, getSellerIntake } from '@/lib/firestore';
import { processSteps, calculateStepFromScore } from '@/data/processSteps';
import { processVideos } from '@/data/videos';

function SellerDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [completedArticles, setCompletedArticles] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [baseScore, setBaseScore] = useState(0);
  const [scoreBonus, setScoreBonus] = useState(0);
  const [sellerData, setSellerData] = useState<any>(null);
  const [overallProgress, setOverallProgress] = useState(0);

  const totalCourseItems = useMemo(() => {
    return processSteps.reduce((sum, step) => sum + step.articles.length + step.tasks.length, 0);
  }, []);

  const calculateOverallProgress = useCallback((articles: string[], tasks: string[]) => {
    if (totalCourseItems === 0) return 0;
    const articleCount = new Set(articles).size;
    const taskCount = new Set(tasks).size;
    const completed = Math.min(totalCourseItems, articleCount + taskCount);
    return Math.round((completed / totalCourseItems) * 100);
  }, [totalCourseItems]);

  useEffect(() => {
    if (!authLoading && userProfile?.role === 'buyer') {
      router.push('/buyer');
    }
  }, [authLoading, userProfile, router]);

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
          const articles = stepProgress.completedArticles || [];
          const tasks = stepProgress.completedTasks || [];
          setCompletedArticles(articles);
          setCompletedTasks(tasks);
          setCurrentStep(stepProgress.currentStep || 1);
          const storedProgress = stepProgress.overallProgress ?? calculateOverallProgress(articles, tasks);
          setOverallProgress(storedProgress);
        } else {
          // Fallback to localStorage for migration
          const completed = JSON.parse(localStorage.getItem('sellable:completed-tasks') || '[]');
          setCompletedTasks(completed);
          setOverallProgress(calculateOverallProgress([], completed));
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, calculateOverallProgress]);

  // Calculate current step based on score
  useEffect(() => {
    if (readinessResult) {
      const step = calculateStepFromScore(readinessResult.readiness + scoreBonus);
      setCurrentStep(step);
    }
  }, [readinessResult, scoreBonus]);

  const persistStepProgress = useCallback(async (
    articles: string[],
    tasks: string[],
    stepOverride?: number
  ) => {
    if (!user) return;
    const progressValue = calculateOverallProgress(articles, tasks);
    setOverallProgress(progressValue);

    await saveStepProgress(user.uid, {
      currentStep: stepOverride ?? currentStep,
      completedArticles: articles,
      completedTasks: tasks,
      overallProgress: progressValue
    });
  }, [user, currentStep, calculateOverallProgress]);

  const handleOnboardingComplete = useCallback(async ({ result, intake }: { result: ReadinessResult; intake: SellerIntake }) => {
    const nextStep = calculateStepFromScore(result.readiness);
    setReadinessResult(result);
    setBaseScore(result.readiness);
    setSellerData(intake);
    setCompletedArticles([]);
    setCompletedTasks([]);
    setScoreBonus(0);
    setCurrentStep(nextStep);
    await persistStepProgress([], [], nextStep);
    router.replace('/seller/dashboard');
  }, [persistStepProgress, router]);

  const handleArticleComplete = useCallback(async (articleId: string) => {
    if (!user || completedArticles.includes(articleId)) return;
    const newCompleted = [...completedArticles, articleId];
    setCompletedArticles(newCompleted);
    await persistStepProgress(newCompleted, completedTasks);
  }, [user, completedArticles, completedTasks, persistStepProgress]);

  const handleTaskComplete = useCallback(async (taskId: string) => {
    if (!user) return;
    const newCompleted = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    setCompletedTasks(newCompleted);
    await persistStepProgress(completedArticles, newCompleted);
  }, [user, completedTasks, completedArticles, persistStepProgress]);

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

  if (!authLoading && userProfile?.role === 'buyer') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalScore = Math.min(100, baseScore + scoreBonus);
  const forceOnboarding = searchParams?.get('onboarding') === '1';
  const showOnboarding = forceOnboarding || !readinessResult;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Your Accelerator Dashboard"
        description="Increase your score by completing articles and tasks in each step."
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {showOnboarding ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle>Company Information</CardTitle>
                      <span className="text-sm text-muted-foreground">Step 1 of 1</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </CardHeader>
                  <CardContent>
                    <SellerOnboardingForm autoRedirect={false} onComplete={handleOnboardingComplete} />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <RoleVideos videos={processVideos} title="Process Academy" />
                <Card>
                  <CardHeader>
                    <CardTitle>What we'll do for you</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Assess your current readiness to sell</li>
                      <li>• Create a personalized preparation plan</li>
                      <li>• Connect you with experienced mentors</li>
                      <li>• Guide you through each step</li>
                      <li>• Help you access qualified buyers</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
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
                    progress={overallProgress}
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
                      items={readinessResult!.checklist}
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
                      {readinessResult!.nextSteps.map((step, index) => (
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
          )}
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
