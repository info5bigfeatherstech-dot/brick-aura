'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { LocalityTile } from './LocalityTile';
import { useLocalities } from '../hooks/useLocations';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const POPULAR_CITIES = [
  { id: 'delhi-ncr', label: 'Delhi NCR' },
  { id: 'mumbai', label: 'Mumbai' },
  { id: 'bengaluru', label: 'Bengaluru' },
  { id: 'pune', label: 'Pune' },
];

// Heights sequence to create a visual masonry rhythm
const HEIGHT_VARIANTS = [
  'h-72',
  'h-56',
  'h-80',
  'h-64',
  'h-60',
  'h-76',
  'h-64',
  'h-72',
];

export function PopularLocalitiesSection() {
  const [activeCityId, setActiveCityId] = useState('delhi-ncr');
  const { data: localities, isLoading, isError, refetch } = useLocalities(activeCityId);

  const activeCityName =
    POPULAR_CITIES.find((c) => c.id === activeCityId)?.label || 'Delhi NCR';

  return (
    <SectionShell
      id="popular-localities"
      eyebrow="Micro-Market Intelligence"
      title="Popular Localities"
      subtitle="Explore historical price per square-foot dynamics and annual appreciation trends across India's highest-yield neighborhood clusters."
      actions={
        <Link href={`/search?city=${activeCityId}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <span>All Localities in {activeCityName}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brick" />
          </Button>
        </Link>
      }
      variant="white"
    >
      <div className="space-y-6">
        {/* City Tabs Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {POPULAR_CITIES.map((c) => {
            const isActive = activeCityId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCityId(c.id)}
                className={cn(
                  'px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold transition-all duration-150 border select-none inline-flex items-center gap-1.5',
                  isActive
                    ? 'bg-brick text-white border-brick shadow-xs'
                    : 'bg-white text-ink border-sand hover:border-brick hover:bg-cream'
                )}
              >
                <MapPin className={cn('w-3.5 h-3.5', isActive ? 'text-white' : 'text-brick')} />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry-style Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={cn('w-full rounded-sm', HEIGHT_VARIANTS[i % 8])} />
            ))}
          </div>
        )}

        {isError && (
          <ErrorState
            message="Failed to load neighborhood metrics. Please retry."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && localities && (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {localities.map((loc, idx) => (
              <LocalityTile
                key={loc.id}
                locality={loc}
                heightClass={HEIGHT_VARIANTS[idx % HEIGHT_VARIANTS.length]}
              />
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}

