'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Listing, Project } from '../types';
import { useWishlistStore, useRecentlyViewedStore } from '@/features/wishlist/store';
import { formatPrice, formatArea } from '@/lib/format';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type ListingCardData = Listing | Project;

interface ListingCardProps {
  item: ListingCardData;
  variant?: 'property' | 'project' | 'auto';
  className?: string;
  onSelect?: () => void;
}

export function ListingCard({
  item,
  variant = 'auto',
  className,
  onSelect,
}: ListingCardProps) {
  const router = useRouter();
  const isProject = variant === 'project' || ('isReraVerified' in item && 'configurations' in item);
  const { isWishlisted, toggleWishlist } = useWishlistStore();
  const { recordView } = useRecentlyViewedStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlisted = mounted ? isWishlisted(item.id) : false;

  const targetUrl = isProject
    ? `/projects/${item.slug}`
    : `/property/${item.slug}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click came from an internal link or button, let that handle it
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    if (!isProject) {
      recordView(item as Listing);
    }
    if (onSelect) onSelect();
    router.push(targetUrl);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isProject) {
      toggleWishlist(item as Listing);
    }
  };

  // 1. PROJECT CARD VARIANT
  if (isProject) {
    const proj = item as Project;
    return (
      <div
        onClick={handleCardClick}
        className={cn(
          'group relative bg-white rounded-sm border border-sand hover:border-brick overflow-hidden transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between shadow-xs cursor-pointer',
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-light">
          <Image
            src={proj.heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
            alt={proj.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-black/20" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge variant="brick" className="bg-white/95 text-brick backdrop-blur-xs font-semibold">
              Project Launch
            </Badge>
            {proj.highlightTag && (
              <Badge variant="dark" className="text-[10px] bg-dark/80 text-cream">
                {proj.highlightTag}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
            <div>
              <span className="text-[11px] font-medium text-sand block">{proj.builderName}</span>
              <h3 className="font-montreal font-bold text-base text-cream truncate">
                {proj.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/70 block uppercase">Starts from</span>
              <span className="font-montreal font-bold text-base text-sand">
                {formatPrice(proj.priceMin)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-ink/70">
              <MapPin className="w-3.5 h-3.5 text-brick shrink-0" />
              <span className="truncate">{proj.locality}, {proj.city}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {proj.bhkOptions.map((b) => (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded-sm bg-cream border border-sand text-[11px] font-medium text-ink"
                >
                  {b}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded-sm bg-sand-light text-[11px] text-ink/70">
                Possession: {proj.possessionDate}
              </span>
            </div>
          </div>

          {/* Footer of Card */}
          <div className="pt-3 border-t border-sand flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-[11px] text-success font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RERA ID: {proj.reraId.slice(0, 15)}...</span>
            </div>

            <Link
              href={`/projects/${proj.slug}`}
              className="inline-flex items-center gap-1 font-semibold text-brick hover:underline group-hover:translate-x-0.5 transition-transform"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. PROPERTY CARD VARIANT
  const prop = item as Listing;
  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'group relative bg-white rounded-sm border border-sand hover:border-brick overflow-hidden transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between shadow-xs cursor-pointer',
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-light">
        <Image
          src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
          alt={prop.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-black/10" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {prop.badge && (
            <Badge variant="brick" className="bg-white/95 text-brick backdrop-blur-xs font-semibold">
              {prop.badge}
            </Badge>
          )}
          {prop.isReadyToMove && (
            <Badge variant="success" className="bg-white/95 text-success backdrop-blur-xs font-semibold">
              Ready to Move
            </Badge>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 shadow-sm focus:outline-none z-10',
            wishlisted
              ? 'bg-brick text-white'
              : 'bg-white/90 text-ink/80 hover:bg-white hover:text-brick hover:scale-110'
          )}
          aria-label={wishlisted ? 'Remove from shortlist' : 'Add to shortlist'}
        >
          <Heart className={cn('w-4 h-4', wishlisted && 'fill-white')} />
        </button>

        {/* Price and BHK Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white flex items-baseline justify-between">
          <div>
            <span className="font-montreal font-bold text-lg sm:text-xl text-cream tracking-tight">
              {formatPrice(prop.price)}
            </span>
            {prop.pricePerSqFt && (
              <span className="text-[11px] text-sand ml-1.5">
                (₹{prop.pricePerSqFt.toLocaleString('en-IN')}/sq.ft)
              </span>
            )}
          </div>
          <span className="text-xs font-semibold bg-dark/70 px-2 py-0.5 rounded-sm text-sand border border-white/10">
            {prop.bhk > 0 ? `${prop.bhk} BHK` : prop.propertyType}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-montreal font-bold text-base text-ink group-hover:text-brick transition-colors line-clamp-1">
            {prop.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-ink/70">
            <MapPin className="w-3.5 h-3.5 text-brick shrink-0" />
            <span className="truncate">{prop.locality}, {prop.city}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-ink/70 border-t border-sand/60">
            <div>
              <span className="text-[10px] uppercase text-ink/40 block">Super Area</span>
              <span className="font-medium text-ink">{formatArea(prop.areaSqFt)}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-ink/40 block">Status</span>
              <span className="font-medium text-ink">{prop.possessionDate}</span>
            </div>
          </div>
        </div>

        {/* Amenities / Builder Footer */}
        <div className="pt-3 border-t border-sand flex items-center justify-between text-xs">
          <span className="text-[11px] text-ink/60 font-medium truncate max-w-[170px]">
            By {prop.builderName}
          </span>

          <Link
            href={`/property/${prop.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-brick hover:underline group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
