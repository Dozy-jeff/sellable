'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Filter, Search, DollarSign, TrendingUp, MapPin } from 'lucide-react';
import { Industry, BusinessModel } from '@/types';

interface ListingFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  industry: Industry | '';
  model: BusinessModel | '';
  minRevenue: string;
  maxRevenue: string;
  minEbitda: string;
  maxEbitda: string;
  minReadiness: string;
}

const industries: Industry[] = [
  'Home Services', 'E-commerce', 'Healthcare', 'Restaurants', 
  'B2B Services', 'Education', 'Other'
];

const models: BusinessModel[] = [
  'Local Services', 'Shopify/DTC', 'Marketplace', 'SaaS', 'Agency', 'Franchise'
];

export default function ListingFilters({ onFiltersChange }: ListingFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industry: '',
    model: '',
    minRevenue: '',
    maxRevenue: '',
    minEbitda: '',
    maxEbitda: '',
    minReadiness: ''
  });

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleIndustryToggle = (industry: Industry) => {
    const newSelection = selectedIndustries.includes(industry)
      ? selectedIndustries.filter(i => i !== industry)
      : [...selectedIndustries, industry];
    setSelectedIndustries(newSelection);
    handleFilterChange('industry', newSelection.join(','));
  };

  const handleModelToggle = (model: BusinessModel) => {
    const newSelection = selectedModels.includes(model)
      ? selectedModels.filter(m => m !== model)
      : [...selectedModels, model];
    setSelectedModels(newSelection);
    handleFilterChange('model', newSelection.join(','));
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      industry: '' as Industry | '',
      model: '' as BusinessModel | '',
      minRevenue: '',
      maxRevenue: '',
      minEbitda: '',
      maxEbitda: '',
      minReadiness: ''
    };
    setFilters(clearedFilters);
    setSelectedIndustries([]);
    setSelectedModels([]);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <Search className="h-4 w-4 mr-2" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Input
            placeholder="Company name, location..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Industry */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <MapPin className="h-4 w-4 mr-2" />
            Industry
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {industries.map(industry => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={`industry-${industry}`}
                  checked={selectedIndustries.includes(industry)}
                  onCheckedChange={() => handleIndustryToggle(industry)}
                />
                <label
                  htmlFor={`industry-${industry}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {industry}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Model */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <TrendingUp className="h-4 w-4 mr-2" />
            Business Model
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {models.map(model => (
              <div key={model} className="flex items-center space-x-2">
                <Checkbox
                  id={`model-${model}`}
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() => handleModelToggle(model)}
                />
                <label
                  htmlFor={`model-${model}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {model}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <DollarSign className="h-4 w-4 mr-2" />
            Revenue Range
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Min Revenue</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minRevenue}
                onChange={(e) => handleFilterChange('minRevenue', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Max Revenue</label>
              <Input
                type="number"
                placeholder="No limit"
                value={filters.maxRevenue}
                onChange={(e) => handleFilterChange('maxRevenue', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Readiness Score */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base">
            <Filter className="h-4 w-4 mr-2" />
            Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div>
            <label className="text-sm font-medium mb-2 block">Min Readiness %</label>
            <Input
              type="number"
              placeholder="0"
              min="0"
              max="100"
              value={filters.minReadiness}
              onChange={(e) => handleFilterChange('minReadiness', e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher scores indicate better-prepared businesses
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
              </span>
              <Badge variant="secondary">
                {activeFiltersCount}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
