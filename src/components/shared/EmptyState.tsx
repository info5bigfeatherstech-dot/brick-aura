import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'No properties found',
  description = 'Try adjusting your budget filters, selecting more localities, or resetting the active criteria.',
  actionLabel = 'Reset All Filters',
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-sm border border-dashed border-sand bg-cream/40',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-sand/60 border border-sand flex items-center justify-center text-brick mb-4">
        <Home className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="font-montreal text-lg font-semibold text-ink mb-1">{title}</h3>
      <p className="text-sm text-ink/70 max-w-md mb-6 leading-relaxed">{description}</p>
      {onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

