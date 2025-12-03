'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Article } from '@/data/articles';

interface ProcessArticlesProps {
  articles: Article[];
  title?: string;
}

export default function ProcessArticles({ articles, title = "Articles" }: ProcessArticlesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [readArticles, setReadArticles] = useState<string[]>([]);

  const toggleArticle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!readArticles.includes(id)) {
        setReadArticles([...readArticles, id]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {articles.map((article) => {
          const isExpanded = expandedId === article.id;
          const isRead = readArticles.includes(article.id);

          return (
            <Card key={article.id} className={isRead ? 'border-green-200 bg-green-50/50' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {isRead && (
                        <span className="inline-flex items-center text-xs text-green-600 font-medium">
                          <Check className="h-3 w-3 mr-1" />
                          Read
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isExpanded && (
                  <div className="prose prose-sm max-w-none mb-4 pt-4 border-t">
                    {article.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h4 key={index} className="font-semibold text-foreground mt-4 mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
                        return (
                          <h5 key={index} className="font-medium text-foreground mt-3 mb-1 italic">
                            {paragraph.replace(/\*/g, '')}
                          </h5>
                        );
                      }
                      return (
                        <p key={index} className="text-muted-foreground mb-3 leading-relaxed">
                          {paragraph.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>;
                            }
                            if (part.startsWith('*') && part.endsWith('*')) {
                              return <em key={i}>{part.replace(/\*/g, '')}</em>;
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>
                )}
                <Button
                  variant={isExpanded ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleArticle(article.id)}
                  className="w-full"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Article
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
