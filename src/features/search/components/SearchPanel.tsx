'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '../store';
import { IntentType } from '../types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BudgetSlider } from './BudgetSlider';
import { BhkChips } from './BhkChips';
import { LocalityMultiSelect } from './LocalityMultiSelect';
import { CITIES } from '@/config/navigation';
import { Search } from 'lucide-react';

export function SearchPanel() {
  const router = useRouter();
  const {
    intent,
    city,
    localities,
    propertyType,
    budgetMin,
    budgetMax,
    bhk,
    setIntent,
    setCity,
    toggleLocality,
    setPropertyType,
    setBudget,
    toggleBhk,
  } = useSearchStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('intent', intent);
    params.set('city', city);
    if (localities.length > 0) params.set('localities', localities.join(','));
    if (propertyType && propertyType !== 'all') params.set('type', propertyType);
    params.set('minPrice', budgetMin.toString());
    params.set('maxPrice', budgetMax.toString());
    if (bhk.length > 0) params.set('bhk', bhk.join(','));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-sm border border-sand shadow-lg p-5 sm:p-6 space-y-5 transition-all">
      {/* 1. Segmented ToggleGroup (Buy / Rent / Commercial / Plots/Land) */}
      <div className="w-full">
        <ToggleGroup
          type="single"
          value={intent}
          onValueChange={(val) => val && setIntent(val as IntentType)}
          className="w-full grid grid-cols-4 p-1 bg-cream border border-sand"
        >
          <ToggleGroupItem value="buy" className="text-xs font-semibold py-2">
            Buy
          </ToggleGroupItem>
          <ToggleGroupItem value="rent" className="text-xs font-semibold py-2">
            Rent
          </ToggleGroupItem>
          <ToggleGroupItem value="commercial" className="text-xs font-semibold py-2">
            Commercial
          </ToggleGroupItem>
          <ToggleGroupItem value="plots" className="text-xs font-semibold py-2">
            Plots/Land
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* City and Property Type Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/70">City / Region</label>
            <Select value={city} onValueChange={(val) => setCity(val)}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/70">Property Type</label>
            <Select value={propertyType} onValueChange={(val) => setPropertyType(val)}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Property Types</SelectItem>
                <SelectItem value="Flat">Apartments & Flats</SelectItem>
                <SelectItem value="Villa">Independent Villas</SelectItem>
                <SelectItem value="Plot">Plots & Land</SelectItem>
                <SelectItem value="Office">Commercial Offices</SelectItem>
                <SelectItem value="Penthouse">Penthouses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Locality Multi-Select Chips */}
        <LocalityMultiSelect
          cityId={city}
          selectedLocalities={localities}
          onToggle={toggleLocality}
        />

        {/* Budget Slider with Lac / Cr labels */}
        <div className="pt-2 border-t border-sand">
          <BudgetSlider
            min={budgetMin}
            max={budgetMax}
            onChange={(min, max) => setBudget(min, max)}
          />
        </div>

        {/* BHK Chip Row (only shown if not Plots or Commercial) */}
        {intent !== 'plots' && intent !== 'commercial' && (
          <div className="pt-2 border-t border-sand">
            <BhkChips selectedBhks={bhk} onToggle={toggleBhk} />
          </div>
        )}

        {/* Full-width Search CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full gap-2 text-base font-semibold shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>Search Verified Properties</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

