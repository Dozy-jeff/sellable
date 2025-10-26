import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Play, Bot } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import AIAssist from './AIAssist';

export default function TaskCards() {
  const [showAIAssist, setShowAIAssist] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sheets for Today */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Sheets for Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Build your three financial statements with our guided wizard and live spreadsheet.
          </p>
          <div className="space-y-2">
            <Link href="/seller/financials/build">
              <Button className="w-full">
                Build your three statements
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Customer Analysis
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Operations Checklist
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Play className="h-5 w-5 mr-2" />
            Recommended Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
            <Play className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="font-semibold mb-2">What Buyers Expect</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Learn what buyers look for when evaluating businesses and how to prepare your company for sale.
          </p>
          <Button size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Watch Now
          </Button>
        </CardContent>
      </Card>

      {/* AI Assist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            AI Assist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get instant answers to your questions about preparing your business for sale.
          </p>
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => setShowAIAssist(true)}
          >
            <Bot className="h-4 w-4 mr-2" />
            Ask a Question
          </Button>
        </CardContent>
      </Card>

      <AIAssist open={showAIAssist} onOpenChange={setShowAIAssist} />
    </div>
  );
}
