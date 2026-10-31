export type ListingIntent = 'buy' | 'rent' | 'new-launch' | 'commercial' | 'plots' | 'projects';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  cardType: 'property' | 'project';
  intent: ListingIntent;
  propertyType: 'Flat' | 'Villa' | 'Plot' | 'Office' | 'Builder Floor' | 'Penthouse' | 'Shop';
  price: number;
  priceDisplay?: string;
  pricePerSqFt?: number;
  areaSqFt: number;
  bhk: number;
  bathrooms: number;
  locality: string;
  city: string;
  state: string;
  coordinates: Coordinates;
  possessionDate: string;
  isReadyToMove: boolean;
  isVerified: boolean;
  reraApproved: boolean;
  reraId?: string;
  images: string[];
  builderName: string;
  builderLogo?: string;
  amenities: string[];
  badge?: string;
  furnishingStatus?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
}

export interface ProjectConfiguration {
  bhk: string;
  area: string;
  price: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  builderName: string;
  builderLogo: string;
  locality: string;
  city: string;
  priceMin: number;
  priceMax: number;
  bhkOptions: string[];
  possessionDate: string;
  reraId: string;
  isReraVerified: boolean;
  heroImage: string;
  galleryImages: string[];
  description: string;
  configurations: ProjectConfiguration[];
  totalTowers?: number;
  totalUnits?: number;
  launchYear: number;
  brochureUrl?: string;
  coordinates: Coordinates;
  highlightTag?: string;
}

