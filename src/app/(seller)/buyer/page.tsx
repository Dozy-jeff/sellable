'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ListingCard from '@/components/ListingCard';
import ListingFilters from '@/components/ListingFilters';
import EmptyState from '@/components/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Listing, Industry, BusinessModel } from '@/types';
import { formatMoney } from '@/lib/format';

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

export default function BuyerMarketplacePage() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, filters]);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      const data = await response.json();
      
      // Check if user has submitted a company (stored in sessionStorage)
      const userCompany = sessionStorage.getItem('userCompany');
      if (userCompany) {
        const userListing = JSON.parse(userCompany);
        // Add user's company to the listings
        setListings([userListing, ...data]);
      } else {
        setListings(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...listings];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.name.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower)
      );
    }

    // Handle multiple industry selection
    if (filters.industry) {
      const selectedIndustries = filters.industry.split(',').filter(Boolean);
      if (selectedIndustries.length > 0) {
        filtered = filtered.filter(listing => selectedIndustries.includes(listing.industry));
      }
    }

    // Handle multiple model selection
    if (filters.model) {
      const selectedModels = filters.model.split(',').filter(Boolean);
      if (selectedModels.length > 0) {
        filtered = filtered.filter(listing => selectedModels.includes(listing.model));
      }
    }

    if (filters.minRevenue) {
      const minRev = parseInt(filters.minRevenue);
      filtered = filtered.filter(listing => listing.revenueTTM >= minRev);
    }

    if (filters.maxRevenue) {
      const maxRev = parseInt(filters.maxRevenue);
      filtered = filtered.filter(listing => listing.revenueTTM <= maxRev);
    }

    if (filters.minEbitda) {
      const minEbitda = parseInt(filters.minEbitda);
      filtered = filtered.filter(listing => listing.ebitdaTTM >= minEbitda);
    }

    if (filters.maxEbitda) {
      const maxEbitda = parseInt(filters.maxEbitda);
      filtered = filtered.filter(listing => listing.ebitdaTTM <= maxEbitda);
    }

    if (filters.minReadiness) {
      const minReadiness = parseInt(filters.minReadiness);
      filtered = filtered.filter(listing => listing.readiness >= minReadiness);
    }

    setFilteredListings(filtered);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Buyer Marketplace" 
        description="Discover businesses ready for acquisition. All listings are pre-vetted and prepared for sale."
        actions={
          <div className="text-sm text-muted-foreground">
            {filteredListings.length} businesses available
          </div>
        }
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <ListingFilters onFiltersChange={handleFiltersChange} />
              </div>
            </div>

            {/* Listings Grid */}
            <div className="lg:col-span-3">
              {filteredListings.length === 0 ? (
                <EmptyState
                  title="No businesses found"
                  description="Try adjusting your filters to see more results."
                  actionLabel="Clear Filters"
                  onAction={() => handleFiltersChange({
                    search: '',
                    industry: '',
                    model: '',
                    minRevenue: '',
                    maxRevenue: '',
                    minEbitda: '',
                    maxEbitda: '',
                    minReadiness: ''
                  })}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredListings.map((listing, index) => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing} 
                      isUserCompany={index === 0 && listing.id.startsWith('user-company')}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
