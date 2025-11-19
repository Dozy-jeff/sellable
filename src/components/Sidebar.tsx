'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logOut } from '@/lib/auth';
import { updateUserProfile } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  RefreshCw,
  User,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, userProfile } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const isSeller = userProfile?.role === 'seller' || pathname?.includes('/seller');
  const isBuyer = userProfile?.role === 'buyer' || pathname?.includes('/buyer');

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleRoleSwitch = async (role: 'seller' | 'buyer') => {
    if (!user) return;

    try {
      await updateUserProfile(user.uid, { role });
      if (role === 'seller') {
        router.push('/seller/dashboard');
      } else {
        router.push('/buyer');
      }
    } catch (error) {
      console.error('Error switching role:', error);
    }
  };

  const handleReset = () => {
    // Clear all user data and redirect to onboarding
    sessionStorage.removeItem('readinessResult');
    localStorage.removeItem('sellable:completed-tasks');
    localStorage.removeItem('buyer-favorites');
    router.push('/seller');
    setIsResetConfirmOpen(false);
    setIsSettingsOpen(false);
  };

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/'
    },
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/seller/dashboard',
      active: pathname === '/seller/dashboard',
      show: isSeller || !isBuyer
    },
    {
      label: 'Marketplace',
      icon: ShoppingBag,
      href: '/buyer',
      active: pathname === '/buyer',
      show: true
    }
  ];

  return (
    <>
      <div className={`h-screen bg-background border-r flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="text-xl font-bold text-primary">
              Sellable
            </Link>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md hover:bg-muted"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* User Info */}
        {user && !collapsed && (
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userProfile?.displayName || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userProfile?.role === 'buyer' ? 'Buyer' : 'Seller'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.filter(item => item.show !== false).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Role Switch */}
        {user && (
          <div className="p-2 border-t">
            <div className={`${collapsed ? 'space-y-1' : 'grid grid-cols-2 gap-1'}`}>
              <button
                onClick={() => handleRoleSwitch('seller')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs transition-colors ${
                  isSeller && !isBuyer
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                }`}
                title="Switch to Seller"
              >
                <Building2 className="h-3.5 w-3.5" />
                {!collapsed && <span>Seller</span>}
              </button>
              <button
                onClick={() => handleRoleSwitch('buyer')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs transition-colors ${
                  isBuyer
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                }`}
                title="Switch to Buyer"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                {!collapsed && <span>Buyer</span>}
              </button>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="p-2 border-t space-y-1">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          )}
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account and preferences
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {/* User Info */}
            {user && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">{userProfile?.displayName || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Role: {userProfile?.role === 'buyer' ? 'Buyer' : 'Seller'}
                </p>
              </div>
            )}

            {/* Reset Assessment */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Reset Assessment</h3>
              <p className="text-xs text-muted-foreground">
                Start fresh with new business information. This will clear your current progress and score.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsResetConfirmOpen(true)}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset & Start Over
              </Button>
            </div>

            {/* Edit Profile */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Update Business Info</h3>
              <p className="text-xs text-muted-foreground">
                Re-enter your business details to get an updated sellable score.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push('/seller');
                  setIsSettingsOpen(false);
                }}
                className="w-full"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Update Business Details
              </Button>
            </div>

            {/* Switch Role */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Switch Role</h3>
              <p className="text-xs text-muted-foreground">
                Change between seller and buyer views.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={isSeller && !isBuyer ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    handleRoleSwitch('seller');
                    setIsSettingsOpen(false);
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Seller
                </Button>
                <Button
                  variant={isBuyer ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    handleRoleSwitch('buyer');
                    setIsSettingsOpen(false);
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Buyer
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Assessment?</DialogTitle>
            <DialogDescription>
              This will clear all your progress, including:
            </DialogDescription>
          </DialogHeader>

          <ul className="text-sm space-y-1 py-2">
            <li>- Your sellable score</li>
            <li>- Completed articles and tasks</li>
            <li>- Saved business information</li>
          </ul>

          <p className="text-sm text-muted-foreground">
            You'll be redirected to enter new business details.
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsResetConfirmOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReset}
              className="flex-1"
            >
              Reset Everything
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
