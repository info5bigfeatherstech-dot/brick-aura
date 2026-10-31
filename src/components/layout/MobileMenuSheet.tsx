'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { CitySelector } from './CitySelector';
import { MAIN_NAV_LINKS, RESIDENTIAL_MEGA_MENU } from '@/config/navigation';
import { useUiStore } from '@/lib/ui-store';
import { Phone, ArrowRight, Building2, Home, Castle, Layers, LayoutGrid, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

const iconMap = {
  Building2,
  Home,
  Castle,
  Layers,
  LayoutGrid,
  Sparkles,
};

export function MobileMenuSheet() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="left" className="w-full sm:max-w-md p-6 overflow-y-auto flex flex-col">
        <SheetHeader className="pb-4 border-b border-sand">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" />
          </div>
        </SheetHeader>

        {/* City selection in mobile */}
        <div className="py-4 border-b border-sand flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Selected City:
          </span>
          <CitySelector />
        </div>

        {/* Primary Navigation Links */}
        <div className="py-4 border-b border-sand space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50 block mb-2">
            Main Categories
          </span>
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="flex items-center justify-between py-2.5 px-3 rounded-sm text-sm font-medium text-ink hover:bg-cream hover:text-brick transition-colors"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] bg-brick/10 text-brick font-semibold px-2 py-0.5 rounded-sm">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* All Residential Breakdown */}
        <div className="py-4 border-b border-sand space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50 block mb-1">
            All Residential Options
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {RESIDENTIAL_MEGA_MENU.map((item) => {
              const IconComponent = iconMap[item.iconName as keyof typeof iconMap] || Building2;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 p-2 rounded-sm hover:bg-cream transition-colors text-ink"
                >
                  <div className="w-7 h-7 rounded-sm bg-sand-light flex items-center justify-center text-brick">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-ink">{item.title}</div>
                    <div className="text-[10px] text-ink/50">{item.count}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink/40" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Support & Post Property Action */}
        <div className="pt-4 mt-auto space-y-3">
          <Link
            href="/post-property"
            onClick={handleLinkClick}
            className="w-full h-11 flex items-center justify-center gap-2 bg-brick text-white rounded-sm text-sm font-semibold hover:bg-brick-hover transition-colors"
          >
            <span>Post Property</span>
            <span className="text-[10px] bg-white text-brick font-bold px-1.5 py-0.2 rounded-xs">
              FREE
            </span>
          </Link>

          <a
            href={`tel:${siteConfig.contact.tollFree}`}
            className="flex items-center justify-center gap-2 py-2 text-xs text-ink/70 hover:text-brick"
          >
            <Phone className="w-3.5 h-3.5 text-brick" />
            <span>Support: {siteConfig.contact.tollFree}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

