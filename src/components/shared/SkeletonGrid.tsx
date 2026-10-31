import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonGridProps {
  count?: number;
  columns?: string;
  className?: string;
}

export function SkeletonGrid({
  count = 6,
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  className,
}: SkeletonGridProps) {
  return (
    <div className={cn('grid gap-6', columns, className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-sm border border-sand bg-white overflow-hidden p-4 space-y-3"
        >
          <Skeleton className="h-48 w-full rounded-sm" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="pt-4 border-t border-sand flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

