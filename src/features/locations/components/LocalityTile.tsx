'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locality } from '../types';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocalityTileProps {
  locality: Locality;
  heightClass?: string;
  className?: string;
}

export function LocalityTile({
  locality,
  heightClass = 'h-64',
  className,
}: LocalityTileProps) {
  return (
    <Link
      href={`/search?city=${locality.cityId}&locality=${encodeURIComponent(locality.name)}`}
      className={cn(
        'group relative rounded-sm overflow-hidden border border-sand hover:border-brick block transition-all duration-200 hover:-translate-y-1 shadow-xs break-inside-avoid',
        heightClass,
        className
      )}
    >
      <Image
        src={locality.image}
        alt={locality.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/30 to-transparent" />

      {/* Top Tag & Trend Arrow */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold bg-white/95 text-ink px-2 py-0.5 rounded-sm backdrop-blur-xs shadow-xs">
          {locality.countListings} listings
        </span>

        <div className="flex items-center gap-1 bg-dark/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-sm text-[10px] font-semibold border border-white/10">
          {locality.isPositiveTrend ? (
            <TrendingUp className="w-3 h-3 text-success" />
          ) : (
            <TrendingDown className="w-3 h-3 text-danger" />
          )}
          <span className={locality.isPositiveTrend ? 'text-success' : 'text-danger'}>
            +{locality.priceChangePercent}% YoY
          </span>
        </div>
      </div>

      {/* Bottom Locality Details */}
      <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
        <span className="text-[10px] text-sand font-medium uppercase tracking-wider block">
          {locality.cityName} &bull; {locality.highlightTag}
        </span>
        <h4 className="font-montreal font-bold text-base text-cream group-hover:text-sand transition-colors leading-tight">
          {locality.name}
        </h4>

        <div className="pt-1 border-t border-white/15 flex items-center justify-between text-xs">
          <span className="text-sand font-semibold">
            ₹{locality.avgPricePerSqFt.toLocaleString('en-IN')}/sq.ft
          </span>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-white/80 group-hover:text-white">
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

