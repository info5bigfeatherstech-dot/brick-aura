'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { formatPrice } from '@/lib/format';

interface BudgetSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export function BudgetSlider({ min, max, onChange }: BudgetSliderProps) {
  // Slider uses steps in Lacs: 5L (500000) to 15Cr (150000000)
  const MIN_SLIDER = 500000;
  const MAX_SLIDER = 150000000;
  const STEP = 500000;

  const handleValueChange = (vals: number[]) => {
    if (vals.length >= 2) {
      onChange(vals[0], vals[1]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-ink/70">Budget Range</span>
        <span className="font-semibold text-brick font-montreal">
          {formatPrice(min, true)} &ndash; {max >= MAX_SLIDER ? '₹15 Cr+' : formatPrice(max, false)}
        </span>
      </div>

      <Slider
        min={MIN_SLIDER}
        max={MAX_SLIDER}
        step={STEP}
        value={[min, max]}
        onValueChange={handleValueChange}
        className="py-1"
      />

      <div className="flex justify-between text-[10px] text-ink/40 font-medium">
        <span>₹5 Lac</span>
        <span>₹2 Cr</span>
        <span>₹5 Cr</span>
        <span>₹15 Cr+</span>
      </div>
    </div>
  );
}

