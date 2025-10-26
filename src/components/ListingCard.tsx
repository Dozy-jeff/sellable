import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatMoney, pctColor, getReadinessLabel } from '@/lib/format';
import { Listing } from '@/types';
import { MapPin, Users, TrendingUp, DollarSign } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  isUserCompany?: boolean;
}

export default function ListingCard({ listing, isUserCompany = false }: ListingCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${isUserCompany ? 'border-primary/50 bg-primary/5' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{listing.name}</CardTitle>
              {isUserCompany && (
                <Badge variant="default" className="text-xs">
                  Your Company
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {listing.location}
            </div>
          </div>
          <Badge 
            variant={listing.readiness >= 80 ? 'default' : listing.readiness >= 60 ? 'secondary' : 'destructive'}
            className="ml-2"
          >
            {listing.readiness}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Industry</span>
            <span>{listing.industry}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Model</span>
            <span>{listing.model}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Revenue</p>
                <p className="font-semibold">{formatMoney(listing.revenueTTM)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">EBITDA</p>
                <p className="font-semibold">{formatMoney(listing.ebitdaTTM)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{listing.employees} employees</span>
            </div>
            <span className="text-muted-foreground">{listing.yearsOperating} years</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Highlights:</p>
            <div className="flex flex-wrap gap-1">
              {listing.highlights.slice(0, 2).map((highlight, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
              {listing.highlights.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{listing.highlights.length - 2} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Readiness</span>
              <span className={`text-sm font-medium ${pctColor(listing.readiness)}`}>
                {getReadinessLabel(listing.readiness)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
