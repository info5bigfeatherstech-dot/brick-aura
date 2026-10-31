'use client';

import React from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { IntentTabs } from '@/features/search/components/IntentTabs';
import { ListingCard } from './ListingCard';
import { SkeletonGrid } from '@/components/shared/SkeletonGrid';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useListings, useProjects } from '../hooks/useListings';
import { useSearchStore } from '@/features/search/store';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function IntentSwitcherSection() {
  const { intent, city } = useSearchStore();

  const isProjectsIntent = intent === 'projects';
  const isNewLaunch = intent === 'new-launch';

  // React Query Hook for filtered listings
  const {
    data: listings,
    isLoading: isListingsLoading,
    isError: isListingsError,
    refetch: refetchListings,
  } = useListings({
    intent: isNewLaunch ? undefined : intent,
    city,
    limit: 6,
  });

  // React Query Hook for projects
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    refetch: refetchProjects,
  } = useProjects();

  const isLoading = isProjectsIntent ? isProjectsLoading : isListingsLoading;
  const isError = isProjectsIntent ? isProjectsError : isListingsError;
  const refetch = isProjectsIntent ? refetchProjects : refetchListings;

  let displayItems = [];
  if (isProjectsIntent) {
    displayItems = (projects || []).slice(0, 6);
  } else if (isNewLaunch) {
    // Show a mix of new projects and new launch properties
    const projMix = (projects || []).slice(0, 3);
    const listMix = (listings || []).slice(0, 3);
    displayItems = [...projMix, ...listMix];
  } else {
    displayItems = (listings || []).slice(0, 6);
  }

  return (
    <SectionShell
      id="intent-switcher"
      eyebrow="Marketplace Navigation"
      title="What are you looking for?"
      subtitle="Hand-verified properties and RERA registered projects tailored to your lifestyle and financial goals."
      actions={
        <Link href={`/search?intent=${intent}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <span>View all in {intent.toUpperCase()}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brick" />
          </Button>
        </Link>
      }
      variant="white"
    >
      <div className="space-y-6">
        {/* Intent Pills / Tabs */}
        <IntentTabs />

        {/* Content Area with smooth transition */}
        <div className="transition-opacity duration-200">
          {isLoading && <SkeletonGrid count={6} />}

          {isError && (
            <ErrorState
              message="Failed to fetch properties for this category. Please try refreshing."
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && displayItems.length === 0 && (
            <EmptyState
              title={`No properties found for ${intent}`}
              description="No listings match your current criteria. Try selecting another city or reset your search filters."
            />
          )}

          {!isLoading && !isError && displayItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

