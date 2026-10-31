'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { SectionShell } from '@/components/shared/SectionShell';
import { ListingMiniCard } from './ListingMiniCard';
import { BudgetSlider } from '@/features/search/components/BudgetSlider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useListings } from '../hooks/useListings';
import { CITIES } from '@/config/navigation';
import { Listing } from '../types';
import { Map, RotateCcw } from 'lucide-react';

// Dynamically load LeafletMapInner with SSR disabled to prevent window is undefined errors
const LeafletMap = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-sm bg-sand-light border border-sand flex flex-col items-center justify-center p-6 text-center space-y-3">
      <div className="w-10 h-10 rounded-full border-2 border-brick border-t-transparent animate-spin" />
      <span className="text-xs font-semibold text-ink/70">
        Loading Interactive Cartographic Engine...
      </span>
    </div>
  ),
});

export function MapExplore() {
  const [selectedCity, setSelectedCity] = useState('delhi-ncr');
  const [propertyType, setPropertyType] = useState('all');
  const [budgetMin, setBudgetMin] = useState(2000000); // 20L
  const [budgetMax, setBudgetMax] = useState(100000000); // 10Cr
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Fetch listings for map
  const { data: listings } = useListings({
    city: selectedCity,
    propertyType: propertyType === 'all' ? undefined : propertyType,
    minPrice: budgetMin,
    maxPrice: budgetMax,
  });

  const cityObj = CITIES.find((c) => c.id === selectedCity) || CITIES[0];
  const centerCoords: [number, number] = [cityObj.lat, cityObj.lng];

  const mapListings = listings || [];

  const handleResetFilters = () => {
    setBudgetMin(2000000);
    setBudgetMax(100000000);
    setPropertyType('all');
  };

  return (
    <SectionShell
      id="map-explore"
      eyebrow="Geographic Intelligence"
      title="Map Explore"
      subtitle="Examine price points, micro-market densities, and metro corridors with interactive geo-referenced pins."
      variant="white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Column (4 cols) */}
        <div className="lg:col-span-4 bg-cream rounded-sm border border-sand p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-sand">
            <div className="flex items-center gap-2 text-ink">
              <Map className="w-4 h-4 text-brick" />
              <h3 className="font-montreal font-semibold text-sm">Map Filters</h3>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-ink/60 hover:text-brick inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* City Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-ink/70">Metro / City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name} ({c.activeCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Property Type Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-ink/70">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="Flat">Flats & Apartments</SelectItem>
                <SelectItem value="Villa">Villas & Houses</SelectItem>
                <SelectItem value="Plot">Plots & Land</SelectItem>
                <SelectItem value="Office">Commercial Offices</SelectItem>
                <SelectItem value="Penthouse">Penthouses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range Slider */}
          <div className="pt-2 border-t border-sand">
            <BudgetSlider
              min={budgetMin}
              max={budgetMax}
              onChange={(min, max) => {
                setBudgetMin(min);
                setBudgetMax(max);
              }}
            />
          </div>

          {/* Results Summary Box */}
          <div className="pt-3 border-t border-sand text-xs text-ink/70 space-y-1">
            <div className="flex justify-between font-medium">
              <span>Map Markers:</span>
              <span className="text-brick font-semibold">{mapListings.length} properties</span>
            </div>
            <p className="text-[11px] text-ink/50 leading-normal">
              Click any price pin on the canvas to inspect floor specifications and pricing.
            </p>
          </div>
        </div>

        {/* Right Column: Leaflet Map (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <LeafletMap
            listings={mapListings}
            center={centerCoords}
            zoom={11}
            selectedId={selectedListing?.id}
            onSelectListing={(listing) => setSelectedListing(listing)}
          />

          {/* Mobile Horizontal Scrollable List */}
          <div className="lg:hidden pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink/70 mb-2">
              Pins on Map ({mapListings.length}):
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 snap-x">
              {mapListings.map((item) => (
                <div key={item.id} className="min-w-[280px] snap-center">
                  <ListingMiniCard
                    listing={item}
                    isSelected={selectedListing?.id === item.id}
                    onSelect={() => setSelectedListing(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

