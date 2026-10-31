'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BhkChipsProps {
  selectedBhks: number[];
  onToggle: (bhk: number) => void;
}

const BHK_OPTIONS = [
  { label: '1 BHK', value: 1 },
  { label: '2 BHK', value: 2 },
  { label: '3 BHK', value: 3 },
  { label: '4+ BHK', value: 4 },
];

export function BhkChips({ selectedBhks, onToggle }: BhkChipsProps) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-ink/70">Bedrooms (BHK)</span>
      <div className="flex flex-wrap gap-2">
        {BHK_OPTIONS.map((opt) => {
          const isSelected = selectedBhks.includes(opt.value);
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onToggle(opt.value)}
              className={cn(
                'px-3 py-1.5 rounded-sm text-xs font-semibold border transition-all duration-150 select-none',
                isSelected
                  ? 'bg-brick text-white border-brick shadow-xs'
                  : 'bg-white text-ink border-sand hover:border-brick hover:bg-cream'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

