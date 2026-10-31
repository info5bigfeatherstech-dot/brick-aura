import React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'brick' | 'ink' | 'cream' | 'sand';
}

export function Eyebrow({ children, className, variant = 'brick' }: EyebrowProps) {
  const variantStyles = {
    brick: 'text-brick',
    ink: 'text-ink/70',
    cream: 'text-cream/80',
    sand: 'text-sand',
  };

  return (
    <span
      className={cn(
        'inline-block text-[11px] font-semibold uppercase tracking-[0.12em] select-none',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

