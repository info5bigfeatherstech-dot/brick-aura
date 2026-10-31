'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { MegaMenu } from './MegaMenu';
import { CitySelector } from './CitySelector';
import { Button } from '@/components/ui/button';
import { MAIN_NAV_LINKS } from '@/config/navigation';
import { useWishlistStore } from '@/features/wishlist/store';
import { useUiStore } from '@/lib/ui-store';
import { Heart, Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();
  const { setWishlistSheetOpen, setMobileMenuOpen } = useUiStore();
  const { items } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const wishlistCount = mounted ? items.length : 0;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full bg-white transition-all duration-200 border-b border-sand',
        isScrolled ? 'shadow-sm py-2 sm:py-2.5' : 'py-3 sm:py-3.5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Logo + Desktop Nav Links */}
          <div className="flex items-center gap-8">
            <BrandLogo size="md" />

            <nav
              aria-label="Desktop Main Navigation"
              className="hidden lg:flex items-center gap-6"
            >
              {MAIN_NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'relative text-sm font-medium transition-colors py-1 hover:text-brick',
                      isActive ? 'text-brick font-semibold' : 'text-ink'
                    )}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="ml-1.5 inline-block text-[9px] uppercase tracking-wider font-bold bg-brick text-white px-1.5 py-0.2 rounded-xs">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* All Residential Mega Menu */}
              <MegaMenu />
            </nav>
          </div>

          {/* Right Desktop: City Selector + Wishlist + Post Property FREE */}
          <div className="hidden lg:flex items-center gap-4">
            <CitySelector />

            {/* Wishlist Trigger */}
            <button
              onClick={() => setWishlistSheetOpen(true)}
              className="relative p-2 rounded-sm text-ink hover:text-brick hover:bg-cream border border-transparent hover:border-sand transition-all focus:outline-none focus:ring-1 focus:ring-brick"
              aria-label={`View shortlisted properties (${wishlistCount})`}
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brick text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Post Property Primary CTA */}
            <Link href="/post-property">
              <Button variant="default" size="default" className="gap-2 font-semibold shadow-xs">
                <span>Post Property</span>
                <span className="text-[10px] font-bold bg-white text-brick px-1.5 py-0.5 rounded-xs tracking-wide">
                  FREE
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Top Bar Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <CitySelector className="text-xs py-1 px-2 h-8" />

            <Link
              href="/search"
              className="p-2 rounded-sm text-ink hover:text-brick transition-colors"
              aria-label="Search properties"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setWishlistSheetOpen(true)}
              className="relative p-2 rounded-sm text-ink hover:text-brick transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute 0 top-0 right-0 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brick text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-sm text-ink hover:text-brick transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

