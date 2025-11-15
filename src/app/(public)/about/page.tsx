import Shell from '@/components/Shell';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, TrendingUp } from 'lucide-react';
import { processVideos, sellableVideos } from '@/data/videos';

export default function AboutPage() {
  return (
    <Shell>
      <PageHeader 
        title="About Sellable" 
        description="Helping business owners prepare, optimize, and sell their companies with confidence."
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Problem Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Problem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Selling is Overwhelming</h3>
                <p className="text-muted-foreground mb-4">
                  Most business owners have never sold a company before. The process is complex, 
                  time-consuming, and requires specialized knowledge that takes years to develop.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Don't know where to start</li>
                  <li>• Lack proper documentation</li>
                  <li>• Unfamiliar with buyer expectations</li>
                  <li>• No access to experienced mentors</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Poor Preparation Costs Money</h3>
                <p className="text-muted-foreground mb-4">
                  Unprepared businesses sell for significantly less than they could. 
                  Buyers discount companies that lack proper financial records, systems, and processes.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Lower valuations</li>
                  <li>• Longer sale processes</li>
                  <li>• More due diligence issues</li>
                  <li>• Reduced buyer confidence</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                    <CardTitle>Prepare</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    AI-powered readiness assessment identifies gaps and creates a personalized 
                    preparation plan. Get your financials, systems, and documentation ready.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-blue-600 mr-3" />
                    <CardTitle>Optimize</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guided tasks and peer mentorship help you improve your sellability score. 
                    Connect with experienced sellers who've been through the process.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                    <CardTitle>Sell</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Access qualified buyers and close your deal with confidence. 
                    Our platform connects you with serious buyers who value prepared businesses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Now Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Market Timing</h3>
                <p className="text-muted-foreground">
                  The business-for-sale market is experiencing unprecedented growth. 
                  More buyers than ever are looking for acquisition opportunities, 
                  creating favorable conditions for sellers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Technology Advantage</h3>
                <p className="text-muted-foreground">
                  AI and modern tools make business preparation more accessible than ever. 
                  What used to take months of consulting can now be done systematically 
                  with guided support.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
