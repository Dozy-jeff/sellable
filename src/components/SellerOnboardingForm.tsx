'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { SellerIntake, ReadinessResult } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { saveSellerIntake, saveReadinessResult } from '@/lib/firestore';
import { scoreFromIntake, checklistForScore, getNextSteps } from '@/lib/scoring';

const sellerIntakeSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  industry: z.enum(['Home Services', 'E-commerce', 'Healthcare', 'Restaurants', 'B2B Services', 'Education', 'Other']),
  model: z.enum(['Local Services', 'Shopify/DTC', 'Marketplace', 'SaaS', 'Agency', 'Franchise']),
  revenue: z.number().min(0, 'Revenue must be positive'),
  ebitda: z.number().optional(),
  debt: z.number().min(0, 'Debt must be non-negative').optional(),
  employees: z.number().min(0, 'Employee count must be non-negative'),
  yearsOperating: z.number().min(0, 'Years operating must be non-negative'),
  systems: z.array(z.string()).optional(),
  timeline: z.enum(['ASAP', '3-6m', '6-12m', '12-18m', 'Exploring']),
  blockers: z.array(z.string()).optional(),
  hasSOPs: z.boolean().optional(),
  customerConcentration: z.enum(['low', 'med', 'high']).optional()
});

const systemsList = ['QuickBooks', 'Shopify', 'Stripe', 'HubSpot', 'Salesforce', 'Xero', 'FreshBooks', 'Other'];
const blockersList = ['messy financials', 'no SOPs', 'customer concentration', 'no systems', 'tax issues', 'legal issues'];

interface SellerOnboardingFormProps {
  autoRedirect?: boolean;
  onComplete?: (payload: { result: ReadinessResult; intake: SellerIntake }) => void;
}

export default function SellerOnboardingForm({ autoRedirect = true, onComplete }: SellerOnboardingFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [selectedBlockers, setSelectedBlockers] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<SellerIntake>({
    resolver: zodResolver(sellerIntakeSchema),
    defaultValues: {
      systems: [],
      blockers: [],
      hasSOPs: false
    }
  });

  const onSubmit = async (data: SellerIntake) => {
    if (!user) {
      alert('You must be logged in to submit this form.');
      return;
    }

    setIsSubmitting(true);
    try {
      const intake: SellerIntake = {
        ...data,
        systems: selectedSystems,
        blockers: selectedBlockers
      };

      await saveSellerIntake(user.uid, intake);

      const score = scoreFromIntake(intake);
      const checklist = checklistForScore(score);
      const nextSteps = getNextSteps(intake.blockers || []);

      const result: ReadinessResult = {
        readiness: score,
        checklist,
        nextSteps
      };

      await saveReadinessResult(user.uid, result);
      sessionStorage.setItem('readinessResult', JSON.stringify(result));

      onComplete?.({ result, intake });

      if (autoRedirect) {
        router.push(`/seller/dashboard?score=${result.readiness}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSelection = (value: string, list: string[], setList: (newList: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <label className="text-sm font-medium mb-2 block">Annual Profit (EBITDA)</label>
          <Input
            type="number"
            {...register('ebitda', { valueAsNumber: true })}
            placeholder="100000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Total Debt</label>
          <Input
            type="number"
            {...register('debt', { valueAsNumber: true })}
            placeholder="50000"
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
          {systemsList.map(system => (
            <label key={system} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedSystems.includes(system)}
                onCheckedChange={() => toggleSelection(system, selectedSystems, setSelectedSystems)}
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
          {blockersList.map(blocker => (
            <label key={blocker} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedBlockers.includes(blocker)}
                onCheckedChange={() => toggleSelection(blocker, selectedBlockers, setSelectedBlockers)}
              />
              <span className="text-sm capitalize">{blocker}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox {...register('hasSOPs')} id="hasSOPs" />
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Analyzing...' : 'Start your free readiness assessment'}
      </Button>
    </form>
  );
}
