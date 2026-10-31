'use client';

import React, { useState, useEffect } from 'react';
import { SectionShell } from '@/components/shared/SectionShell';
import { ListingCard } from './ListingCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { useRecentlyViewedStore, useWishlistStore } from '@/features/wishlist/store';
import { History, Heart, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentlyViewedSection() {
  const [activeTab, setActiveTab] = useState<'recent' | 'shortlist'>('recent');
  const [mounted, setMounted] = useState(false);

  const { items: recentItems, clearRecentlyViewed } = useRecentlyViewedStore();
  const { items: wishlistItems, clearWishlist } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = !mounted
    ? []
    : activeTab === 'recent'
    ? recentItems
    : wishlistItems;

  const handleClear = () => {
    if (activeTab === 'recent') {
      clearRecentlyViewed();
    } else {
      clearWishlist();
    }
  };

  return (
    <SectionShell
      id="recently-viewed"
      eyebrow="Personalized Activity"
      title="Recently Viewed & Saved"
      subtitle="Quickly return to property details you inspected earlier or view your curated investment shortlist."
      variant="cream"
      actions={
        mounted && items.length > 0 ? (
          <button
            onClick={handleClear}
            className="text-xs text-ink/60 hover:text-danger inline-flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear {activeTab === 'recent' ? 'history' : 'shortlist'}</span>
          </button>
        ) : null
      }
    >
      <div className="space-y-6">
        {/* Tab Toggle */}
        <div className="flex items-center gap-2 border-b border-sand pb-3">
          <button
            onClick={() => setActiveTab('recent')}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-semibold transition-colors border select-none',
              activeTab === 'recent'
                ? 'bg-brick text-white border-brick'
                : 'bg-white text-ink border-sand hover:bg-cream'
            )}
          >
            <History className="w-3.5 h-3.5" />
            <span>Recently Viewed ({mounted ? recentItems.length : 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('shortlist')}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-semibold transition-colors border select-none',
              activeTab === 'shortlist'
                ? 'bg-brick text-white border-brick'
                : 'bg-white text-ink border-sand hover:bg-cream'
            )}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Shortlisted ({mounted ? wishlistItems.length : 0})</span>
          </button>
        </div>

        {/* Content or Empty State */}
        {!mounted || items.length === 0 ? (
          <EmptyState
            title={
              activeTab === 'recent'
                ? 'No recently viewed properties yet'
                : 'No properties saved in your shortlist'
            }
            description={
              activeTab === 'recent'
                ? 'As you inspect residential apartments, luxury villas, or commercial listings, they will automatically appear here for easy comparison.'
                : 'Click the heart icon on any listing card or project feature to bookmark properties for your family discussions.'
            }
            actionLabel="Explore All Properties"
            onAction={() => {
              const el = document.getElementById('intent-switcher');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((listing) => (
              <ListingCard key={listing.id} item={listing} />
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}

