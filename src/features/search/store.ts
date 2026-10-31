import { create } from 'zustand';
import { IntentType } from './types';

export interface SearchState {
  intent: IntentType;
  city: string;
  localities: string[];
  propertyType: string;
  budgetMin: number;
  budgetMax: number;
  bhk: number[];

  // Actions
  setIntent: (intent: IntentType) => void;
  setCity: (city: string) => void;
  setLocalities: (localities: string[]) => void;
  toggleLocality: (locality: string) => void;
  setPropertyType: (type: string) => void;
  setBudget: (min: number, max: number) => void;
  toggleBhk: (bhkCount: number) => void;
  resetFilters: () => void;
}

const INITIAL_FILTERS = {
  intent: 'buy' as IntentType,
  city: 'delhi-ncr',
  localities: [] as string[],
  propertyType: 'all',
  budgetMin: 2000000, // 20 Lakhs
  budgetMax: 50000000, // 5 Crores
  bhk: [2, 3],
};

export const useSearchStore = create<SearchState>((set) => ({
  ...INITIAL_FILTERS,

  setIntent: (intent) => set({ intent }),
  setCity: (city) => set({ city, localities: [] }), // Reset localities when city changes
  setLocalities: (localities) => set({ localities }),
  toggleLocality: (locality) =>
    set((state) => ({
      localities: state.localities.includes(locality)
        ? state.localities.filter((l) => l !== locality)
        : [...state.localities, locality],
    })),
  setPropertyType: (propertyType) => set({ propertyType }),
  setBudget: (budgetMin, budgetMax) => set({ budgetMin, budgetMax }),
  toggleBhk: (bhkCount) =>
    set((state) => ({
      bhk: state.bhk.includes(bhkCount)
        ? state.bhk.filter((b) => b !== bhkCount)
        : [...state.bhk, bhkCount],
    })),
  resetFilters: () => set(INITIAL_FILTERS),
}));

