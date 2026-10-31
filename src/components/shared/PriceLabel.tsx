import React from 'react';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

interface PriceLabelProps {
  amount: number;
  compact?: boolean;
  className?: string;
  subtext?: string;
}

export function PriceLabel({ amount, compact = false, className, subtext }: PriceLabelProps) {
  const formatted = formatPrice(amount, compact);

  return (
    <div className={cn('inline-flex items-baseline gap-1', className)}>
      <span className="font-montreal font-bold tracking-tight text-ink">{formatted}</span>
      {subtext && <span className="text-xs text-ink/60 font-normal">{subtext}</span>}
    </div>
  );
}

