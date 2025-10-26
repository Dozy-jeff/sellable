import Link from 'next/link';
import { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sellable
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/seller" className="text-sm hover:text-primary">
                Seller Accelerator
              </Link>
              <Link href="/buyer" className="text-sm hover:text-primary">
                Buyer Marketplace
              </Link>
              <Link href="/about" className="text-sm hover:text-primary">
                About
              </Link>
              <Link 
                href="/seller" 
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/seller" className="hover:text-primary">Seller Accelerator</Link></li>
                <li><Link href="/buyer" className="hover:text-primary">Buyer Marketplace</Link></li>
                <li><Link href="/about" className="hover:text-primary">How it Works</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                © {currentYear} Sellable. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
