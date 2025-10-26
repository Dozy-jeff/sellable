'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ReadinessWidget from '@/components/ReadinessWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Users, CheckCircle, DollarSign, Sparkles, TrendingUp } from 'lucide-react';
import { ReadinessResult } from '@/types';
import { formatMoney, pctColor } from '@/lib/format';

export default function SellerReadyPage() {
  const router = useRouter();
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isMentorRequesting, setIsMentorRequesting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate valuation estimate based on readiness score
  const calculateValuation = (score: number, revenue: number = 500000) => {
    const baseMultiplier = 2.5; // Base 2.5x revenue multiple
    const scoreMultiplier = score / 100; // Score as percentage
    const adjustedMultiplier = baseMultiplier * scoreMultiplier;
    const estimatedValue = revenue * adjustedMultiplier;
    
    // Add some variance for range
    const variance = estimatedValue * 0.2; // 20% variance
    const minValue = Math.max(estimatedValue - variance, revenue * 1.5);
    const maxValue = estimatedValue + variance;
    
    return {
      min: Math.round(minValue / 1000) * 1000, // Round to nearest 1000
      max: Math.round(maxValue / 1000) * 1000
    };
  };

  useEffect(() => {
    // Get readiness result from sessionStorage
    const stored = sessionStorage.getItem('readinessResult');
    if (stored) {
      const result = JSON.parse(stored);
      setReadinessResult(result);
      
      // Show confetti for high scores
      if (result.readiness >= 80) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  }, []);

  const handlePublish = async () => {
    if (!readinessResult) return;
    
    setIsPublishing(true);
    try {
      // Create user's company listing
      const userListing = {
        id: 'user-company-' + Date.now(),
        name: 'Your Company', // This would come from the form data
        location: 'San Francisco, CA', // This would come from the form data
        industry: 'B2B Services' as const,
        model: 'SaaS' as const,
        revenueTTM: 500000,
        ebitdaTTM: 100000,
        employees: 8,
        yearsOperating: 5,
        systems: ['QuickBooks', 'Stripe', 'HubSpot'],
        readiness: readinessResult.readiness,
        highlights: [
          `${readinessResult.readiness}% readiness score`,
          'AI-optimized business',
          'Complete data room ready',
          'Recently published'
        ]
      };

      // Store user's company in sessionStorage
      sessionStorage.setItem('userCompany', JSON.stringify(userListing));

      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: userListing.id })
      });
      
      const result = await response.json();
      setShowSuccess(true);
      
      // Redirect to buyer marketplace after a delay
      setTimeout(() => {
        router.push(result.url);
      }, 2000);
    } catch (error) {
      console.error('Error publishing listing:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleMentorRequest = async () => {
    setIsMentorRequesting(true);
    try {
      const response = await fetch('/api/mentors/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: 'Your Company',
          industry: 'B2B Services',
          needs: ['financial preparation', 'due diligence guidance']
        })
      });
      
      const result = await response.json();
      alert(`Mentor request submitted! ${result.message}`);
    } catch (error) {
      console.error('Error requesting mentor:', error);
    } finally {
      setIsMentorRequesting(false);
    }
  };

  const handleDataRoomDownload = async () => {
    try {
      const response = await fetch('/api/download/dataroom');
      const result = await response.json();
      
      if (result.success) {
        // In a real app, this would trigger an actual file download
        alert(`Data room generated! ${result.files.length} files ready for download (${result.totalSize} total)`);
      }
    } catch (error) {
      console.error('Error generating data room:', error);
      alert('Error generating data room. Please try again.');
    }
  };

  if (!readinessResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No readiness data found</h1>
          <p className="text-muted-foreground mb-6">Please complete the assessment first.</p>
          <Button onClick={() => router.push('/seller')}>
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const valuation = calculateValuation(readinessResult.readiness);
  const isReady = readinessResult.readiness >= 80;
  const isAlmostReady = readinessResult.readiness >= 60 && readinessResult.readiness < 80;

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/4 left-1/4 animate-bounce">
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce delay-100">
            <Sparkles className="h-6 w-6 text-pink-400" />
          </div>
          <div className="absolute top-1/2 left-1/3 animate-bounce delay-200">
            <Sparkles className="h-7 w-7 text-blue-400" />
          </div>
          <div className="absolute top-2/3 right-1/3 animate-bounce delay-300">
            <Sparkles className="h-5 w-5 text-green-400" />
          </div>
        </div>
      )}

      {/* Large Prominent Score Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${
              isReady ? 'text-green-600' : isAlmostReady ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {readinessResult.readiness}
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Sellable Score
            </h2>
            <p className={`text-xl ${
              isReady ? 'text-green-700' : isAlmostReady ? 'text-yellow-700' : 'text-red-700'
            }`}>
              {isReady ? '🎉 Ready to Sell!' : isAlmostReady ? 'Almost Ready' : 'Needs Work'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {showSuccess && (
            <Card className="mb-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800">
                    Your listing has been published! Redirecting to marketplace...
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Company Summary */}
            <Card>
              <CardHeader>
                <CardTitle>My Company Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sellable Score</span>
                    <Badge 
                      variant={readinessResult.readiness >= 80 ? 'default' : readinessResult.readiness >= 60 ? 'secondary' : 'destructive'}
                      className="text-lg px-3 py-1"
                    >
                      {readinessResult.readiness}%
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Revenue</span>
                      <span className="font-semibold">{formatMoney(500000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">EBITDA</span>
                      <span className="font-semibold">{formatMoney(100000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Employees</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Years Operating</span>
                      <span className="font-semibold">5</span>
                    </div>
                  </div>

                  {/* Valuation Estimate */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-800">Estimated Valuation</h4>
                    </div>
                    <div className="text-2xl font-bold text-green-700 mb-1">
                      {formatMoney(valuation.min)} - {formatMoney(valuation.max)}
                    </div>
                    <p className="text-sm text-green-600">
                      Based on your readiness score and financial metrics
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Completed Checklist</h4>
                    <div className="space-y-2">
                      {readinessResult.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Download Data Room</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      All documents you've built during your accelerator journey
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Financial Statements (P&L, Balance Sheet)
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Business Overview & Metrics
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        SOPs & Operations Manual
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Customer Analysis Report
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Tax Returns & Compliance
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full justify-start bg-primary hover:bg-primary/90"
                        onClick={handleDataRoomDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        📦 Complete Data Room (ZIP)
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="space-y-6">
              {/* Mentor Help */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Mentor Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Past sellers can change your outcome. Connect with experienced entrepreneurs 
                    who have successfully sold their businesses.
                  </p>
                  <Button 
                    onClick={handleMentorRequest}
                    disabled={isMentorRequesting}
                    className="w-full"
                  >
                    {isMentorRequesting ? 'Requesting...' : 'Ask for Help'}
                  </Button>
                </CardContent>
              </Card>

              {/* Publish Listing */}
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Ready to Sell
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your business is ready to be listed on our marketplace. 
                    Qualified buyers will be able to discover and evaluate your company.
                  </p>
                  <Button 
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isPublishing ? 'Publishing...' : 'SELL'}
                  </Button>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle>What happens next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>Your listing goes live on our marketplace</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>Qualified buyers can request more information</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>We facilitate introductions and due diligence</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p>You negotiate and close your deal</p>
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
