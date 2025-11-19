'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessStep, Article, StepTask } from '@/types';
import { processSteps, getScoreBonus } from '@/data/processSteps';
import { CheckCircle2, Circle, BookOpen, ListTodo, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface StepTrackerProps {
  currentStep: number;
  completedArticles: string[];
  completedTasks: string[];
  onArticleComplete: (articleId: string) => void;
  onTaskComplete: (taskId: string) => void;
  onScoreUpdate: (bonus: number) => void;
}

export default function StepTracker({
  currentStep,
  completedArticles,
  completedTasks,
  onArticleComplete,
  onTaskComplete,
  onScoreUpdate
}: StepTrackerProps) {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleOpen, setIsArticleOpen] = useState(false);

  useEffect(() => {
    const bonus = getScoreBonus(completedArticles, completedTasks);
    onScoreUpdate(bonus);
  }, [completedArticles, completedTasks, onScoreUpdate]);

  const getStepProgress = (step: ProcessStep) => {
    const totalItems = step.articles.length + step.tasks.length;
    const completedItems =
      step.articles.filter(a => completedArticles.includes(a.id)).length +
      step.tasks.filter(t => completedTasks.includes(t.id)).length;
    return (completedItems / totalItems) * 100;
  };

  const isStepComplete = (step: ProcessStep) => {
    return getStepProgress(step) === 100;
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleOpen(true);
  };

  const handleMarkArticleRead = () => {
    if (selectedArticle && !completedArticles.includes(selectedArticle.id)) {
      onArticleComplete(selectedArticle.id);
    }
  };

  const handleTaskToggle = (taskId: string) => {
    onTaskComplete(taskId);
  };

  const getNextArticle = () => {
    if (!selectedArticle || !selectedStep) return null;
    const currentIndex = selectedStep.articles.findIndex(a => a.id === selectedArticle.id);
    if (currentIndex < selectedStep.articles.length - 1) {
      return selectedStep.articles[currentIndex + 1];
    }
    return null;
  };

  const getPrevArticle = () => {
    if (!selectedArticle || !selectedStep) return null;
    const currentIndex = selectedStep.articles.findIndex(a => a.id === selectedArticle.id);
    if (currentIndex > 0) {
      return selectedStep.articles[currentIndex - 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Step Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {processSteps.map((step, index) => {
          const progress = getStepProgress(step);
          const isComplete = isStepComplete(step);
          const isCurrent = index + 1 === currentStep;
          const isLocked = index + 1 > currentStep;

          return (
            <Card
              key={step.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isCurrent ? 'ring-2 ring-primary' : ''
              } ${isLocked ? 'opacity-50' : ''}`}
              onClick={() => !isLocked && setSelectedStep(step)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant={isComplete ? 'default' : isCurrent ? 'secondary' : 'outline'}>
                    Step {index + 1}
                  </Badge>
                  {isComplete && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                <CardTitle className="text-sm">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(progress)}% complete
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Step Detail */}
      {selectedStep && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedStep.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedStep.description}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedStep(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="articles">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Articles ({selectedStep.articles.length})
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <ListTodo className="h-4 w-4" />
                  Tasks ({selectedStep.tasks.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="articles" className="mt-4">
                <div className="space-y-3">
                  {selectedStep.articles.map((article) => {
                    const isRead = completedArticles.includes(article.id);
                    return (
                      <div
                        key={article.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                          isRead ? 'bg-green-50 border-green-200' : ''
                        }`}
                        onClick={() => handleArticleClick(article)}
                      >
                        <div className="flex items-center gap-3">
                          {isRead ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{article.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {article.readTime} read
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-4">
                <div className="space-y-3">
                  {selectedStep.tasks.map((task) => {
                    const isComplete = completedTasks.includes(task.id);
                    return (
                      <div
                        key={task.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          isComplete ? 'bg-green-50 border-green-200' : ''
                        }`}
                      >
                        <Checkbox
                          checked={isComplete}
                          onCheckedChange={() => handleTaskToggle(task.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <p className={`font-medium text-sm ${isComplete ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.description}
                          </p>
                        </div>
                        {isComplete && (
                          <Badge variant="secondary" className="text-xs">
                            +2 pts
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Article Reader Dialog */}
      <Dialog open={isArticleOpen} onOpenChange={setIsArticleOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{selectedArticle.readTime}</Badge>
                  {completedArticles.includes(selectedArticle.id) && (
                    <Badge variant="secondary" className="text-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="prose prose-sm max-w-none mt-4">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedArticle.content}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex gap-2">
                  {getPrevArticle() && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedArticle(getPrevArticle()!)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                  )}
                  {getNextArticle() && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedArticle(getNextArticle()!)}
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>

                {!completedArticles.includes(selectedArticle.id) ? (
                  <Button onClick={handleMarkArticleRead}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark as Read (+1 pt)
                  </Button>
                ) : (
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Article Completed
                  </Badge>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
