'use client';

import PageHeader from '@/components/PageHeader';
import Shell from '@/components/Shell';
import RoleVideos from '@/components/RoleVideos';
import SellerOnboardingForm from '@/components/SellerOnboardingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { processVideos } from '@/data/videos';

function SellerOnboardingContent() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Tell us about your company"
        description="Help us understand your business so we can create a personalized preparation plan."
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
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
                  <SellerOnboardingForm />
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
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
        </div>
      </div>
    </div>
  );
}

export default function SellerOnboardingPage() {
  return (
    <Shell>
      <SellerOnboardingContent />
    </Shell>
  );
}
