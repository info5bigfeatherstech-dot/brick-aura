export interface Locality {
  id: string;
  name: string;
  cityId: string;
  cityName: string;
  avgPricePerSqFt: number;
  priceChangePercent: number;
  isPositiveTrend: boolean;
  image: string;
  countListings: number;
  highlightTag: string;
}

export interface CitySummary {
  id: string;
  name: string;
  state: string;
  tagline: string;
  activeListingsCount: number;
  avgPrice: string;
  lat: number;
  lng: number;
}

