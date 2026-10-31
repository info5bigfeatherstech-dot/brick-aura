'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { Button } from '@/components/ui/button';
import { useListings } from '@/features/listings/hooks/useListings';
import { ListingCard } from '@/features/listings/components/ListingCard';
import { SkeletonGrid } from '@/components/shared/SkeletonGrid';
import { ArrowLeft, Filter } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent') || 'buy';
  const city = searchParams.get('city') || 'delhi-ncr';
  const type = searchParams.get('type') || undefined;

  const { data: listings, isLoading } = useListings({
    intent,
    city,
    propertyType: type,
  });

  return (
    <SectionShell
      eyebrow="Search Results"
      title={`Properties for ${intent.toUpperCase()} in ${city.replace('-', ' ').toUpperCase()}`}
      subtitle="Refined results matching your criteria. This page connects directly to the real estate filter engine."
      actions={
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-cream rounded-sm border border-sand text-xs">
          <span className="font-semibold text-ink flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-brick" />
            <span>Active Criteria:</span>
          </span>
          <span className="bg-white border border-sand px-2 py-0.5 rounded-sm">
            Intent: <strong>{intent}</strong>
          </span>
          <span className="bg-white border border-sand px-2 py-0.5 rounded-sm">
            City: <strong>{city}</strong>
          </span>
          {type && (
            <span className="bg-white border border-sand px-2 py-0.5 rounded-sm">
              Type: <strong>{type}</strong>
            </span>
          )}
        </div>

        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(listings || []).map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}

