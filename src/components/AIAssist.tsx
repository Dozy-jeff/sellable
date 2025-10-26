'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Send } from 'lucide-react';

interface AIAssistProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const responses: Record<string, string[]> = {
  'clean p&l': [
    '1. Categorize all transactions by type (revenue, COGS, operating expenses)',
    '2. Remove personal expenses from business accounts',
    '3. Add back owner compensation to show true profitability',
    '4. Separate one-time expenses from recurring costs',
    '5. Ensure all revenue is properly recorded and documented'
  ],
  'documents buyers expect': [
    '1. Financial statements (P&L, Balance Sheet, Cash Flow)',
    '2. Tax returns (last 2-3 years)',
    '3. Customer contracts and agreements',
    '4. Employee information and organizational chart',
    '5. Business licenses and permits',
    '6. Insurance policies',
    '7. Lease agreements',
    '8. Intellectual property documentation'
  ],
  'due diligence': [
    '1. Financial due diligence - review of financial records',
    '2. Legal due diligence - contracts, compliance, litigation',
    '3. Operational due diligence - systems, processes, staff',
    '4. Commercial due diligence - market position, competition',
    '5. Technical due diligence - IT systems, data security'
  ]
};

export default function AIAssist({ open, onOpenChange }: AIAssistProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const lowerQuestion = question.toLowerCase();
      let foundResponse: string[] = [];
      
      for (const [key, value] of Object.entries(responses)) {
        if (lowerQuestion.includes(key)) {
          foundResponse = value;
          break;
        }
      }
      
      if (foundResponse.length === 0) {
        foundResponse = [
          'I understand you\'re asking about: "' + question + '"',
          'While I don\'t have a specific answer for this question, I recommend:',
          '1. Consulting with a business broker or M&A advisor',
          '2. Reviewing our preparation guides',
          '3. Speaking with other sellers in our community'
        ];
      }
      
      setAnswer(foundResponse);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            AI Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              placeholder="Ask a question about selling your business..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !question.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {answer.length > 0 && !isLoading && (
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {answer.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Try asking:</p>
            <ul className="space-y-1">
              <li>• "How do I clean my P&L?"</li>
              <li>• "What documents do buyers expect?"</li>
              <li>• "What is due diligence?"</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
