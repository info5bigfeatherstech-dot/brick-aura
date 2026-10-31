export interface Builder {
  id: string;
  name: string;
  logo: string;
  experienceYears: number;
  activeProjects: number;
  completedProjects: number;
  rating: number;
  cities: string[];
  featuredTag?: string;
  slug: string;
}

