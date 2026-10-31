'use client';

import React from 'react';
import { Eyebrow } from '@/components/shared/Eyebrow';
import { SearchPanel } from './SearchPanel';
import { HeroMosaic } from './HeroMosaic';
import { ShieldCheck, Building2, Layers } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function SplitHeroSection() {
  return (
    <section className="relative bg-cream border-b border-sand overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Subtle background brick grid */}
      <div className="absolute inset-0 bg-brick-grid-subtle opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Eyebrow, Headline, Subtext, SearchPanel, Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <Eyebrow variant="brick">India&apos;s Property Marketplace</Eyebrow>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-montreal tracking-[-0.03em] text-ink leading-[1.12]">
                Every address starts with a{' '}
                <span className="text-brick underline decoration-sand decoration-wavy decoration-2">
                  conversation.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-ink/75 max-w-xl font-normal leading-relaxed">
                Connect directly with certified owners and verified builders across 40+ Indian metros with zero brokerage.
              </p>
            </div>

            {/* Vertical Search Panel */}
            <SearchPanel />

            {/* 3 Trust Stats Inline */}
            <div className="grid grid-cols-3 gap-3 pt-2 sm:pt-4 border-t border-sand/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-white border border-sand flex items-center justify-center text-brick shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-montreal font-bold text-sm sm:text-base text-ink leading-tight">
                    {siteConfig.stats.listings}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-ink/60">Verified Listings</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-white border border-sand flex items-center justify-center text-brick shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-montreal font-bold text-sm sm:text-base text-ink leading-tight">
                    {siteConfig.stats.reraVerified}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-ink/60">Government Audited</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-white border border-sand flex items-center justify-center text-brick shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-montreal font-bold text-sm sm:text-base text-ink leading-tight">
                    {siteConfig.stats.builders}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-ink/60">Top Developers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): 3-image mosaic */}
          <div className="lg:col-span-5">
            <HeroMosaic />
          </div>
        </div>
      </div>
    </section>
  );
}

