'use client';

import React from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import {
  Coins,
  Bed,
  CalendarCheck,
  Building,
  Castle,
  Landmark,
  Briefcase,
  Store,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function BentoBrowseSection() {
  const budgetShortcuts = [
    { label: 'Under ₹50 Lac', sub: 'Affordable & Starter', min: 0, max: 5000000, count: '14,200+' },
    { label: '₹50 Lac - ₹1 Cr', sub: 'Mid-Segment Homes', min: 5000000, max: 10000000, count: '28,400+' },
    { label: '₹1 Cr - ₹2 Cr', sub: 'Premium Family Residences', min: 10000000, max: 20000000, count: '36,100+' },
    { label: '₹2 Cr & Above', sub: 'Luxury & Penthouses', min: 20000000, max: 150000000, count: '18,900+' },
  ];

  const bhkShortcuts = [
    { label: '1 BHK', bhk: 1, sub: 'Compact & Rentals', count: '12,400+' },
    { label: '2 BHK', bhk: 2, sub: 'Most Popular', count: '45,800+', popular: true },
    { label: '3 BHK', bhk: 3, sub: 'Spacious Family', count: '39,200+' },
    { label: '4+ BHK', bhk: 4, sub: 'Luxury Living', count: '11,500+' },
  ];

  const possessionShortcuts = [
    { label: 'Ready to Move', val: 'ready', tag: 'Instant Handover', count: '52,000+' },
    { label: 'Possession in 2026', val: '2026', tag: 'Under Construction', count: '31,000+' },
    { label: 'Possession in 2027', val: '2027', tag: 'Fast Progress', count: '22,400+' },
    { label: '2028 & Beyond', val: '2028', tag: 'Pre-Launch Savings', count: '14,800+' },
  ];

  const typeShortcuts = [
    { label: 'Flats & Apartments', val: 'Flat', icon: Building, count: '98,000+' },
    { label: 'Luxury Villas', val: 'Villa', icon: Castle, count: '8,400+' },
    { label: 'Approved Plots', val: 'Plot', icon: Landmark, count: '19,500+' },
    { label: 'Grade-A Offices', val: 'Office', icon: Briefcase, count: '7,200+' },
    { label: 'Retail Shops', val: 'Shop', icon: Store, count: '4,600+' },
  ];

  return (
    <SectionShell
      id="bento-browse"
      eyebrow="Architectural Index"
      title="Browse Your Way"
      subtitle="Discover properties segmented precisely by financial threshold, structural blueprint, or delivery schedule."
      variant="cream"
      withPattern
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* Bento Tile 1: By Budget (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-sm border border-sand p-6 flex flex-col justify-between shadow-xs hover:border-brick transition-colors">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-brick">
              <Coins className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                By Budget
              </span>
            </div>
            <h3 className="font-montreal font-bold text-xl text-ink">
              Find homes within your investment band
            </h3>
            <p className="text-xs text-ink/60">
              Clear price brackets with transparent square-foot benchmarks across India.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {budgetShortcuts.map((b) => (
              <Link
                key={b.label}
                href={`/search?minPrice=${b.min}&maxPrice=${b.max}`}
                className="group/btn p-3 rounded-sm border border-sand bg-cream/40 hover:bg-white hover:border-brick transition-all duration-150"
              >
                <div className="flex items-center justify-between">
                  <span className="font-montreal font-bold text-sm text-ink group-hover/btn:text-brick transition-colors">
                    {b.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink/40 group-hover/btn:text-brick group-hover/btn:translate-x-0.5 transition-all" />
                </div>
                <div className="text-[11px] text-ink/60 mt-0.5">{b.sub}</div>
                <span className="inline-block text-[10px] text-brick font-semibold mt-1 bg-brick/10 px-1.5 py-0.2 rounded-xs">
                  {b.count} properties
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bento Tile 2: By BHK (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-sm border border-sand p-6 flex flex-col justify-between shadow-xs hover:border-brick transition-colors">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-brick">
              <Bed className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                By Layout / BHK
              </span>
            </div>
            <h3 className="font-montreal font-bold text-xl text-ink">
              Select room configurations for your family
            </h3>
            <p className="text-xs text-ink/60">
              From ergonomic 1BHK starter studios to palatial 4BHK duplex penthouses.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {bhkShortcuts.map((item) => (
              <Link
                key={item.label}
                href={`/search?bhk=${item.bhk}`}
                className={cn(
                  'group/bhk p-3 rounded-sm border border-sand bg-cream/40 hover:bg-white hover:border-brick transition-all text-center flex flex-col justify-between',
                  item.popular && 'border-brick/40 bg-brick/5'
                )}
              >
                <div>
                  <div className="w-8 h-8 mx-auto rounded-full bg-white border border-sand flex items-center justify-center text-brick mb-1.5 group-hover/bhk:scale-105 transition-transform">
                    <Bed className="w-4 h-4" />
                  </div>
                  <span className="font-montreal font-bold text-base text-ink group-hover/bhk:text-brick transition-colors block">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-ink/60 block mt-0.5">{item.sub}</span>
                </div>
                <span className="text-[10px] font-semibold text-brick mt-2">
                  {item.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bento Tile 3: By Possession (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-sm border border-sand p-6 flex flex-col justify-between shadow-xs hover:border-brick transition-colors">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-brick">
              <CalendarCheck className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                By Possession Timeline
              </span>
            </div>
            <h3 className="font-montreal font-bold text-xl text-ink">
              Ready to move or future delivery
            </h3>
          </div>

          <div className="space-y-2">
            {possessionShortcuts.map((pos) => (
              <Link
                key={pos.label}
                href={`/search?possession=${pos.val}`}
                className="group/pos flex items-center justify-between p-2.5 rounded-sm border border-sand bg-cream/30 hover:bg-white hover:border-brick transition-all"
              >
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-ink group-hover/pos:text-brick transition-colors block">
                    {pos.label}
                  </span>
                  <span className="text-[10px] text-ink/50">{pos.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brick">{pos.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink/40 group-hover/pos:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bento Tile 4: By Property Type (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-sm border border-sand p-6 flex flex-col justify-between shadow-xs hover:border-brick transition-colors">
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-brick">
              <Building className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                By Property Classification
              </span>
            </div>
            <h3 className="font-montreal font-bold text-xl text-ink">
              Explore residential, commercial & plotted assets
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {typeShortcuts.map((t) => {
              const IconComp = t.icon;
              return (
                <Link
                  key={t.label}
                  href={`/search?type=${t.val}`}
                  className="group/type p-3 rounded-sm border border-sand bg-cream/40 hover:bg-white hover:border-brick transition-all flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-sm bg-white border border-sand flex items-center justify-center text-brick mb-2 group-hover/type:bg-brick group-hover/type:text-white transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs sm:text-sm text-ink group-hover/type:text-brick transition-colors block">
                      {t.label}
                    </span>
                    <span className="text-[11px] text-ink/60 mt-0.5 block">{t.count} items</span>
                  </div>
                </Link>
              );
            })}

            {/* Custom CTA Tile inside grid */}
            <Link
              href="/search"
              className="p-3 rounded-sm border border-dashed border-brick/40 bg-brick/5 hover:bg-brick/10 transition-colors flex flex-col justify-center items-center text-center"
            >
              <TrendingUp className="w-5 h-5 text-brick mb-1" />
              <span className="text-xs font-bold text-brick">View All Indices</span>
              <span className="text-[10px] text-ink/60">Search Custom Matrix &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

