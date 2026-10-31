import React from 'react';
import { Eyebrow } from './Eyebrow';
import { cn } from '@/lib/utils';

export interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'white' | 'cream' | 'dark';
  withPattern?: boolean;
  className?: string;
  containerClassName?: string;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  actions,
  children,
  variant = 'white',
  withPattern = false,
  className,
  containerClassName,
}: SectionShellProps) {
  const isDark = variant === 'dark';
  const isCream = variant === 'cream';

  return (
    <section
      id={id}
      className={cn(
        'relative py-14 sm:py-20 border-b border-sand transition-colors',
        isDark && 'bg-dark text-dark-text border-stone-800',
        isCream && 'bg-cream text-ink',
        variant === 'white' && 'bg-white text-ink',
        withPattern && 'bg-brick-pattern',
        className
      )}
    >
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {(eyebrow || title || subtitle || actions) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div className="space-y-2 max-w-2xl">
              {eyebrow && (
                <Eyebrow variant={isDark ? 'sand' : 'brick'}>{eyebrow}</Eyebrow>
              )}
              {title && (
                <h2
                  className={cn(
                    'text-2xl sm:text-3xl lg:text-4xl font-bold font-montreal tracking-[-0.02em]',
                    isDark ? 'text-cream' : 'text-ink'
                  )}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={cn(
                    'text-sm sm:text-base leading-relaxed',
                    isDark ? 'text-cream/70' : 'text-ink/70'
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>

            {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

