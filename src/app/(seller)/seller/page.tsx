'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageHeader from '@/components/PageHeader';
import RoleVideos from '@/components/RoleVideos';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { processVideos, sellableVideos } from '@/data/videos';
import { SellerIntake } from '@/types';

const sellerIntakeSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  industry: z.enum(['Home Services', 'E-commerce', 'Healthcare', 'Restaurants', 'B2B Services', 'Education', 'Other']),
  model: z.enum(['Local Services', 'Shopify/DTC', 'Marketplace', 'SaaS', 'Agency', 'Franchise']),
  revenue: z.number().min(0, 'Revenue must be positive'),
  ebitda: z.number().optional(),
  employees: z.number().min(0, 'Employee count must be non-negative'),
  yearsOperating: z.number().min(0, 'Years operating must be non-negative'),
  systems: z.array(z.string()).optional(),
  timeline: z.enum(['ASAP', '3-6m', '6-12m', '12-18m', 'Exploring']),
  blockers: z.array(z.string()).optional(),
  hasSOPs: z.boolean().optional(),
  customerConcentration: z.enum(['low', 'med', 'high']).optional()
});

export default function SellerOnboardingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [selectedBlockers, setSelectedBlockers] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SellerIntake>({
    resolver: zodResolver(sellerIntakeSchema),
    defaultValues: {
      systems: [],
      blockers: [],
      hasSOPs: false
    }
  });

  const systems = ['QuickBooks', 'Shopify', 'Stripe', 'HubSpot', 'Salesforce', 'Xero', 'FreshBooks', 'Other'];
  const blockers = ['messy financials', 'no SOPs', 'customer concentration', 'no systems', 'tax issues', 'legal issues'];

  const onSubmit = async (data: SellerIntake) => {
    console.log('Form data:', data); // Debug log
    console.log('Selected systems:', selectedSystems);
    console.log('Selected blockers:', selectedBlockers);
    
    setIsSubmitting(true);
    try {
      // Create mock result for testing
      const mockResult = {
        readiness: 67,
        checklist: [
          'Upload clean P&L (TTM + 3Y)',
          'Provide customer concentration analysis',
          'Create/update SOPs for core ops',
          'Tax returns (last 2 years)',
          'Employee roster + roles'
        ],
        nextSteps: [
          'Connect QuickBooks and categorize transactions',
          'Create SOP for order fulfillment'
        ]
      };
      
      // Store result in sessionStorage for dashboard
      sessionStorage.setItem('readinessResult', JSON.stringify(mockResult));
      
      // Redirect to dashboard
      router.push(`/seller/dashboard?score=${mockResult.readiness}`);
      
      // Uncomment below to use real API
      /*
      const response = await fetch('/api/intake/seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data, 
          systems: selectedSystems, 
          blockers: selectedBlockers 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API response:', result);
      
      sessionStorage.setItem('readinessResult', JSON.stringify(result));
      router.push(`/seller/dashboard?score=${result.readiness}`);
      */
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Company Name *</label>
                        <Input {...register('companyName')} placeholder="Your company name" />
                        {errors.companyName && (
                          <p className="text-sm text-red-600 mt-1">{errors.companyName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Website</label>
                        <Input {...register('website')} placeholder="https://yourcompany.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Location *</label>
                        <Input {...register('location')} placeholder="City, State" />
                        {errors.location && (
                          <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Industry *</label>
                        <select {...register('industry')} className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                          <option value="">Select industry</option>
                          <option value="Home Services">Home Services</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Restaurants">Restaurants</option>
                          <option value="B2B Services">B2B Services</option>
                          <option value="Education">Education</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.industry && (
                          <p className="text-sm text-red-600 mt-1">{errors.industry.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Business Model *</label>
                      <select {...register('model')} className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                        <option value="">Select model</option>
                        <option value="Local Services">Local Services</option>
                        <option value="Shopify/DTC">Shopify/DTC</option>
                        <option value="Marketplace">Marketplace</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Agency">Agency</option>
                        <option value="Franchise">Franchise</option>
                      </select>
                      {errors.model && (
                        <p className="text-sm text-red-600 mt-1">{errors.model.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Annual Revenue *</label>
                        <Input 
                          type="number" 
                          {...register('revenue', { valueAsNumber: true })} 
                          placeholder="500000" 
                        />
                        {errors.revenue && (
                          <p className="text-sm text-red-600 mt-1">{errors.revenue.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">EBITDA</label>
                        <Input 
                          type="number" 
                          {...register('ebitda', { valueAsNumber: true })} 
                          placeholder="100000" 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Employees *</label>
                        <Input 
                          type="number" 
                          {...register('employees', { valueAsNumber: true })} 
                          placeholder="5" 
                        />
                        {errors.employees && (
                          <p className="text-sm text-red-600 mt-1">{errors.employees.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Years Operating *</label>
                      <Input 
                        type="number" 
                        {...register('yearsOperating', { valueAsNumber: true })} 
                        placeholder="3" 
                      />
                      {errors.yearsOperating && (
                        <p className="text-sm text-red-600 mt-1">{errors.yearsOperating.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Business Systems</label>
                      <div className="grid grid-cols-2 gap-2">
                        {systems.map(system => (
                          <label key={system} className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedSystems.includes(system)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSystems([...selectedSystems, system]);
                                } else {
                                  setSelectedSystems(selectedSystems.filter(s => s !== system));
                                }
                              }}
                            />
                            <span className="text-sm">{system}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Timeline to Sell *</label>
                      <select {...register('timeline')} className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP</option>
                        <option value="3-6m">3-6 months</option>
                        <option value="6-12m">6-12 months</option>
                        <option value="12-18m">12-18 months</option>
                        <option value="Exploring">Just exploring</option>
                      </select>
                      {errors.timeline && (
                        <p className="text-sm text-red-600 mt-1">{errors.timeline.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Current Blockers</label>
                      <div className="grid grid-cols-2 gap-2">
                        {blockers.map(blocker => (
                          <label key={blocker} className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedBlockers.includes(blocker)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedBlockers([...selectedBlockers, blocker]);
                                } else {
                                  setSelectedBlockers(selectedBlockers.filter(b => b !== blocker));
                                }
                              }}
                            />
                            <span className="text-sm">{blocker}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        {...register('hasSOPs')} 
                        id="hasSOPs"
                      />
                      <label htmlFor="hasSOPs" className="text-sm">
                        We have documented Standard Operating Procedures (SOPs)
                      </label>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Customer Concentration</label>
                      <select {...register('customerConcentration')} className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                        <option value="">Select concentration</option>
                        <option value="low">Low (no single customer &gt;10%)</option>
                        <option value="med">Medium (1-2 customers 20-30%)</option>
                        <option value="high">High (1 customer &gt;50%)</option>
                      </select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                      onClick={() => console.log('Submit button clicked')}
                    >
                      {isSubmitting ? 'Analyzing...' : 'Start your free readiness assessment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <RoleVideos videos={processVideos} title="Process Academy" />
              <RoleVideos videos={sellableVideos} title="About Sellable" />
              
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
