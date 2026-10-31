'use client';

import React, { useState } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CITIES } from '@/config/navigation';
import { useSearchStore } from '@/features/search/store';
import { cn } from '@/lib/utils';

interface CitySelectorProps {
  className?: string;
}

export function CitySelector({ className }: CitySelectorProps) {
  const [open, setOpen] = useState(false);
  const { city, setCity } = useSearchStore();

  const currentCityObj = CITIES.find((c) => c.id === city) || CITIES[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-sand bg-white hover:border-brick hover:bg-cream text-xs xl:text-sm font-medium text-ink transition-colors focus:outline-none focus:ring-1 focus:ring-brick whitespace-nowrap shrink-0',
            className
          )}
          aria-expanded={open}
        >
          <MapPin className="w-3.5 h-3.5 text-brick shrink-0" />
          <span className="max-w-[100px] truncate">{currentCityObj.name}</span>
          <ChevronDown className="w-3 h-3 text-ink/50 shrink-0" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0" align="end">
        <Command>
          <CommandInput placeholder="Search city or metro..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup heading="Major Real Estate Markets">
              {CITIES.map((c) => {
                const isSelected = c.id === city;
                return (
                  <CommandItem
                    key={c.id}
                    value={c.name}
                    onSelect={() => {
                      setCity(c.id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-ink">{c.name}</div>
                      <div className="text-[11px] text-ink/50">{c.activeCount}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brick" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

