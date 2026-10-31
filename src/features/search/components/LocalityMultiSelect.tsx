'use client';

import React from 'react';
import { useLocalities } from '@/features/locations/hooks/useLocations';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocalityMultiSelectProps {
  cityId: string;
  selectedLocalities: string[];
  onToggle: (locality: string) => void;
}

export function LocalityMultiSelect({
  cityId,
  selectedLocalities,
  onToggle,
}: LocalityMultiSelectProps) {
  const { data: localities } = useLocalities(cityId);

  // Take top 6 popular localities for quick chips
  const popularLocalities = localities?.slice(0, 6) || [];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-ink/70">Popular Localities</span>
        {selectedLocalities.length > 0 && (
          <span className="text-[11px] text-brick font-medium">
            {selectedLocalities.length} selected
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 min-h-[32px]">
        {popularLocalities.map((loc) => {
          const isSelected = selectedLocalities.includes(loc.name);
          return (
            <button
              type="button"
              key={loc.id}
              onClick={() => onToggle(loc.name)}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-medium border transition-colors',
                isSelected
                  ? 'bg-brick text-white border-brick'
                  : 'bg-cream text-ink border-sand hover:border-sand-border hover:bg-sand-light'
              )}
            >
              <span>{loc.name}</span>
              {isSelected ? (
                <X className="w-3 h-3 text-white/80" />
              ) : (
                <Plus className="w-3 h-3 text-ink/40" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

