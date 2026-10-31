import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ className, variant = 'light', size = 'md' }: BrandLogoProps) {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const subtextSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.24em]',
    lg: 'text-[12px] tracking-[0.26em]',
  };

  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-2.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick rounded-sm shrink-0',
        className
      )}
      aria-label="BrickAura Properties - Home"
    >
      {/* Minimal Architectural Brick-Stack Arch Icon */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-sm transition-transform duration-200 group-hover:scale-105',
          iconSizes[size]
        )}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Foundation Brick */}
          <rect x="2" y="24" width="32" height="8" rx="1.5" fill="#A8432A" />
          {/* Middle Dual Bricks */}
          <rect x="4" y="13" width="13" height="8" rx="1.5" fill={isDark ? '#FAF4EC' : '#1F2326'} />
          <rect x="19" y="13" width="13" height="8" rx="1.5" fill={isDark ? '#FAF4EC' : '#1F2326'} />
          {/* Keystone Arch Top */}
          <path
            d="M10 9C10 4.58172 13.5817 1 18 1C22.4183 1 26 4.58172 26 9H10Z"
            fill="#A8432A"
          />
          {/* Subtle Arch Cutout */}
          <circle cx="18" cy="9" r="3" fill={isDark ? '#1A1D1F' : '#FFFFFF'} />
        </svg>
      </div>

      {/* Typography: "BrickAura" + "PROPERTIES" */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-montreal font-bold tracking-[-0.03em] transition-colors',
            textSizes[size],
            isDark ? 'text-cream group-hover:text-white' : 'text-ink group-hover:text-brick'
          )}
        >
          Brick<span className="text-brick">Aura</span>
        </span>
        <span
          className={cn(
            'font-poppins uppercase font-medium mt-0.5',
            subtextSizes[size],
            isDark ? 'text-sand/70' : 'text-ink/60'
          )}
        >
          Properties
        </span>
      </div>
    </Link>
  );
}

