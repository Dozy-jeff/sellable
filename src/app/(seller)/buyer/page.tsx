'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import ListingCard from '@/components/ListingCard';
import ListingFilters from '@/components/ListingFilters';
import EmptyState from '@/components/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Listing, Industry, BusinessModel } from '@/types';
import { formatMoney } from '@/lib/format';
import { Heart, Mail, MapPin, Users, TrendingUp, DollarSign, Building2, Calendar, Check, Star } from 'lucide-react';

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
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [sortBy, setSortBy] = useState<'readiness' | 'revenue' | 'ebitda'>('readiness');

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('buyer-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, filters, sortBy]);

  const toggleFavorite = (listingId: string) => {
    const newFavorites = favorites.includes(listingId)
      ? favorites.filter(id => id !== listingId)
      : [...favorites, listingId];
    setFavorites(newFavorites);
    localStorage.setItem('buyer-favorites', JSON.stringify(newFavorites));
  };

  const openListingDetail = (listing: Listing) => {
    setSelectedListing(listing);
    setIsDetailOpen(true);
  };

  const openContactDialog = (listing: Listing) => {
    setSelectedListing(listing);
    setContactSent(false);
    setContactForm({ name: '', email: '', message: `I'm interested in learning more about ${listing.name}.` });
    setIsContactOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    console.log('Contact form submitted:', contactForm);
    setContactSent(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setContactSent(false);
    }, 2000);
  };

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

    // Sort listings
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'readiness':
          return b.readiness - a.readiness;
        case 'revenue':
          return b.revenueTTM - a.revenueTTM;
        case 'ebitda':
          return b.ebitdaTTM - a.ebitdaTTM;
        default:
          return 0;
      }
    });

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
              {/* Sort Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'readiness' | 'revenue' | 'ebitda')}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="readiness">Readiness Score</option>
                    <option value="revenue">Revenue</option>
                    <option value="ebitda">EBITDA</option>
                  </select>
                </div>
                {favorites.length > 0 && (
                  <Badge variant="secondary">
                    <Heart className="h-3 w-3 mr-1 fill-current" />
                    {favorites.length} saved
                  </Badge>
                )}
              </div>

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
                    <div key={listing.id} className="relative">
                      <button
                        onClick={() => toggleFavorite(listing.id)}
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(listing.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                      <div onClick={() => openListingDetail(listing)} className="cursor-pointer">
                        <ListingCard
                          listing={listing}
                          isUserCompany={index === 0 && listing.id.startsWith('user-company')}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Listing Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedListing && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedListing.name}</DialogTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedListing.location}
                    </div>
                  </div>
                  <Badge
                    variant={selectedListing.readiness >= 80 ? 'default' : selectedListing.readiness >= 60 ? 'secondary' : 'destructive'}
                  >
                    {selectedListing.readiness}% Ready
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Revenue</p>
                          <p className="text-lg font-bold">{formatMoney(selectedListing.revenueTTM)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">EBITDA</p>
                          <p className="text-lg font-bold">{formatMoney(selectedListing.ebitdaTTM)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Business Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Business Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>Industry: {selectedListing.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span>Model: {selectedListing.model}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedListing.employees} Employees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedListing.yearsOperating} Years Operating</span>
                    </div>
                  </div>
                </div>

                {/* Systems */}
                {selectedListing.systems.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Business Systems</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedListing.systems.map((system, i) => (
                        <Badge key={i} variant="outline">{system}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Highlights</h3>
                  <div className="space-y-1">
                    {selectedListing.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => {
                      setIsDetailOpen(false);
                      openContactDialog(selectedListing);
                    }}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(selectedListing.id)}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        favorites.includes(selectedListing.id)
                          ? 'fill-red-500 text-red-500'
                          : ''
                      }`}
                    />
                    {favorites.includes(selectedListing.id) ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Seller</DialogTitle>
            <DialogDescription>
              Send a message to the seller of {selectedListing?.name}
            </DialogDescription>
          </DialogHeader>

          {contactSent ? (
            <div className="py-8 text-center">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">
                The seller will respond to your inquiry shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Your Name</label>
                <Input
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Your Email</label>
                <Input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell the seller about your interest..."
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md text-sm"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsContactOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
