'use client';

import React from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { Button } from '@/components/ui/button';
import { useListings } from '@/features/listings/hooks/useListings';
import { ListingCard } from '@/features/listings/components/ListingCard';
import { SkeletonGrid } from '@/components/shared/SkeletonGrid';
import { ArrowLeft } from 'lucide-react';

export default function CommercialPage() {
  const { data: listings, isLoading } = useListings({ intent: 'commercial' });

  return (
    <SectionShell
      eyebrow="Commercial Index"
      title="Commercial Real Estate"
      subtitle="Grade-A office floors, IT parks, retail shops, and high-street corners across prime business hubs."
      actions={
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Button>
        </Link>
      }
    >
      {isLoading ? (
        <SkeletonGrid count={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(listings || []).map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </SectionShell>
  );
}

