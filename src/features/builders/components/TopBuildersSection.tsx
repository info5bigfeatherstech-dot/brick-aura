'use client';

import React from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { BuilderCard } from './BuilderCard';
import { BuilderMarquee } from './BuilderMarquee';
import { useBuilders } from '../hooks/useBuilders';
import { SkeletonGrid } from '@/components/shared/SkeletonGrid';
import { ErrorState } from '@/components/shared/ErrorState';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TopBuildersSection() {
  const { data: builders, isLoading, isError, refetch } = useBuilders();

  const builderList = builders || [];

  return (
    <SectionShell
      id="top-builders"
      eyebrow="Institutional Heritage"
      title="Top Builders & Developers"
      subtitle="India's most trusted real estate developers with audited track records, on-time delivery metrics, and RERA verified credentials."
      actions={
        <Link href="/projects">
          <Button variant="outline" size="sm" className="gap-2">
            <span>Explore All Developers</span>
            <ArrowRight className="w-3.5 h-3.5 text-brick" />
          </Button>
        </Link>
      }
      variant="white"
    >
      <div className="space-y-10">
        {/* Builders Grid (8 builders) */}
        {isLoading && <SkeletonGrid count={8} columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />}

        {isError && (
          <ErrorState
            message="Failed to load developer profiles. Please retry."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {builderList.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        )}

        {/* Infinite Builder Logo Marquee */}
        {builderList.length > 0 && <BuilderMarquee builders={builderList} />}
      </div>
    </SectionShell>
  );
}

