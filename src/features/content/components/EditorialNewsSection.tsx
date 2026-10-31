'use client';

import React from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { ArticleCard } from './ArticleCard';
import { useArticles } from '../hooks/useContent';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EditorialNewsSection() {
  const { data: articles, isLoading, isError, refetch } = useArticles();

  const largeArticle = articles && articles.length > 0 ? articles[0] : null;
  const smallArticles = articles && articles.length > 1 ? articles.slice(1, 4) : [];

  return (
    <SectionShell
      id="editorial-news"
      eyebrow="Marketplace Research"
      title="Neighbourhood Guides & News"
      subtitle="Institutional research papers, RERA legal breakdowns, and micro-market appreciation studies authored by urban planners."
      actions={
        <Link href="/articles">
          <Button variant="outline" size="sm" className="gap-2">
            <span>All Research Articles</span>
            <ArrowRight className="w-3.5 h-3.5 text-brick" />
          </Button>
        </Link>
      }
      variant="white"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 h-96">
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <Skeleton className="w-full h-28 rounded-sm" />
            <Skeleton className="w-full h-28 rounded-sm" />
            <Skeleton className="w-full h-28 rounded-sm" />
          </div>
        </div>
      ) : isError ? (
        <ErrorState
          message="Failed to load editorial articles. Please retry."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Large Article (7 columns) */}
          {largeArticle && (
            <div className="lg:col-span-7">
              <ArticleCard article={largeArticle} isLarge={true} />
            </div>
          )}

          {/* Three Small Articles (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {smallArticles.map((art) => (
              <ArticleCard key={art.id} article={art} isLarge={false} />
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}

