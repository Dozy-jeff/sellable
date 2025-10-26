import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTAHero() {
  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
        Make your business sellable.
      </h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
        An AI-powered accelerator that helps you prepare, optimize, and sell—even if you've never sold a company before.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/seller">
            Seller Accelerator
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
          <Link href="/buyer">
            Buyer Marketplace
          </Link>
        </Button>
      </div>
    </div>
  );
}
