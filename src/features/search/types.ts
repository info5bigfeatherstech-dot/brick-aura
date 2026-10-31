export type IntentType = 'buy' | 'rent' | 'new-launch' | 'commercial' | 'plots' | 'projects';

export type PropertyCategory = 'flats' | 'villas' | 'plots' | 'offices' | 'shops' | 'floors';

export interface SearchFilters {
  intent: IntentType;
  city: string;
  localities: string[];
  propertyType: string;
  budgetMin: number; // in Rupees
  budgetMax: number; // in Rupees
  bhk: number[];
}

export interface CityOption {
  id: string;
  name: string;
  state: string;
  popularLocalities: string[];
  lat: number;
  lng: number;
}

