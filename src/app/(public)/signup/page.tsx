'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createUserProfile, updateUserProfile } from '@/lib/firestore';
import { Building2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'seller' | 'buyer'>('seller');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signUp(email, password, name);

      if (userCredential.user) {
        await createUserProfile(userCredential.user.uid, email, name, role);
        await updateUserProfile(userCredential.user.uid, { role });
      }

      router.push(role === 'buyer' ? '/buyer' : '/seller/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 relative">
      <Link href="/" className="text-2xl font-bold text-primary absolute top-6 left-6">
        Sellable
      </Link>
      <div className="max-w-md mx-auto flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full">
            <CardHeader className="space-y-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-2 w-fit"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Get started with Sellable today</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label>I&apos;m signing up as</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={role === 'seller' ? 'default' : 'outline'}
                      className={`w-full justify-start h-auto py-4 ${role === 'seller' ? '' : 'bg-transparent'}`}
                      onClick={() => setRole('seller')}
                      disabled={loading}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Seller</span>
                      </div>
                    </Button>
                    <Button
                      type="button"
                      variant={role === 'buyer' ? 'default' : 'outline'}
                      className={`w-full justify-start h-auto py-4 ${role === 'buyer' ? '' : 'bg-transparent'}`}
                      onClick={() => setRole('buyer')}
                      disabled={loading}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-md bg-primary/10">
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Buyer</span>
                      </div>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating account...' : 'Sign up'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
