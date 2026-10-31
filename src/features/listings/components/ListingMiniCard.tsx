'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Listing } from '../types';
import { formatPrice } from '@/lib/format';
import { MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListingMiniCardProps {
  listing: Listing;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function ListingMiniCard({
  listing,
  isSelected,
  onSelect,
  className,
}: ListingMiniCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group flex gap-3 p-2.5 rounded-sm bg-white border border-sand hover:border-brick transition-all duration-150 cursor-pointer text-left',
        isSelected && 'border-brick ring-1 ring-brick bg-cream/30',
        className
      )}
    >
      <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-sand-light shrink-0">
        <Image
          src={listing.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'}
          alt={listing.title}
          fill
          sizes="80px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listing.badge && (
          <span className="absolute top-1 left-1 text-[8px] bg-dark/80 text-sand px-1 rounded-xs font-semibold">
            {listing.badge}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <span className="font-montreal font-bold text-sm text-brick block">
            {formatPrice(listing.price)}
          </span>
          <h4 className="font-montreal font-semibold text-xs text-ink truncate group-hover:text-brick transition-colors">
            {listing.title}
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-ink/60 truncate mt-0.5">
            <MapPin className="w-3 h-3 text-brick shrink-0" />
            <span className="truncate">{listing.locality}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-ink/70 pt-1 border-t border-sand/40">
          <span>{listing.bhk > 0 ? `${listing.bhk} BHK` : listing.propertyType}</span>
          <Link
            href={`/property/${listing.slug}`}
            className="text-brick font-semibold hover:underline inline-flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

