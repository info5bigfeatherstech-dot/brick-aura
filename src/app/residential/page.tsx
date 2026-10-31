'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { Button } from '@/components/ui/button';
import { useListings } from '@/features/listings/hooks/useListings';
import { ListingCard } from '@/features/listings/components/ListingCard';
import { SkeletonGrid } from '@/components/shared/SkeletonGrid';
import { ArrowLeft } from 'lucide-react';

function ResidentialContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'All';

  const { data: listings, isLoading } = useListings();

  return (
    <SectionShell
      eyebrow="Residential Index"
      title={`Residential Spaces: ${type.toUpperCase()}`}
      subtitle="Architectural apartments, duplex penthouses, standalone builder floors, and gated villas across India."
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

export default function ResidentialPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading residential properties...</div>}>
      <ResidentialContent />
    </Suspense>
  );
}

