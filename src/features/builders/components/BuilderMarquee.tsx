'use client';

import React from 'react';
import { Builder } from '../types';

interface BuilderMarqueeProps {
  builders: Builder[];
}

export function BuilderMarquee({ builders }: BuilderMarqueeProps) {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...builders, ...builders];

  return (
    <div className="relative w-full overflow-hidden border-y border-sand bg-cream py-4 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((b, idx) => (
          <div
            key={`${b.id}-${idx}`}
            className="flex items-center gap-3 mx-6 sm:mx-10 shrink-0 text-ink/75 hover:text-brick transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-sm bg-white border border-sand flex items-center justify-center text-brick font-montreal font-bold text-xs shrink-0">
              {b.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 3)}
            </div>
            <div>
              <span className="font-montreal font-semibold text-xs sm:text-sm whitespace-nowrap block">
                {b.name}
              </span>
              <span className="text-[10px] text-ink/40 block">
                {b.experienceYears} Years of Trust
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

