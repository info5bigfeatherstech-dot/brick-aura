import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Listing } from '../listings/types';

interface WishlistState {
  items: Listing[];
  addItem: (listing: Listing) => void;
  removeItem: (id: string) => void;
  toggleWishlist: (listing: Listing) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (listing) =>
        set((state) => ({
          items: state.items.some((i) => i.id === listing.id)
            ? state.items
            : [listing, ...state.items],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      toggleWishlist: (listing) => {
        const { items, addItem, removeItem } = get();
        if (items.some((i) => i.id === listing.id)) {
          removeItem(listing.id);
        } else {
          addItem(listing);
        }
      },
      isWishlisted: (id) => get().items.some((i) => i.id === id),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'brickaura_wishlist',
    }
  )
);

interface RecentlyViewedState {
  items: Listing[];
  recordView: (listing: Listing) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      recordView: (listing) =>
        set((state) => {
          const filtered = state.items.filter((i) => i.id !== listing.id);
          // Prepend and cap at 10 items
          return {
            items: [listing, ...filtered].slice(0, 10),
          };
        }),
      clearRecentlyViewed: () => set({ items: [] }),
    }),
    {
      name: 'brickaura_recently_viewed',
    }
  )
);

