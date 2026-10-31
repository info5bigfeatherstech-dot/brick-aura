'use client';

import React from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { Button } from '@/components/ui/button';
import { useListings } from '@/features/listings/hooks/useListings';
import { ListingCard } from '@/features/listings/components/ListingCard';
import { SkeletonGrid } from '@/components/shared/SkeletonGrid';
import { ArrowLeft } from 'lucide-react';

export default function PlotsLandPage() {
  const { data: listings, isLoading } = useListings({ intent: 'plots' });

  return (
    <SectionShell
      eyebrow="Plotted Communities"
      title="Plots & Land for Sale"
      subtitle="RERA approved plotted developments with asphalt roads, underground cabling, and title deeds."
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

