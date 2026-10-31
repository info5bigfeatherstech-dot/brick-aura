import apiClient from '@/lib/http';
import { isMockMode } from '@/lib/env';
import { Listing, Project, ListingIntent } from '../types';
import mockListingsData from '@/mocks/listings.json';
import mockProjectsData from '@/mocks/projects.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ListingFilterParams {
  intent?: ListingIntent | string;
  city?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bhk?: number[];
  limit?: number;
}

export async function fetchListings(params?: ListingFilterParams): Promise<Listing[]> {
  if (isMockMode()) {
    await delay(180);
    let results = [...(mockListingsData as Listing[])];

    if (params?.intent && params.intent !== 'projects' && params.intent !== 'new-launch') {
      results = results.filter((item) => item.intent === params.intent);
    }

    if (params?.city) {
      const cityLower = params.city.toLowerCase();
      results = results.filter(
        (item) =>
          item.city.toLowerCase().includes(cityLower) ||
          cityLower.includes(item.city.toLowerCase()) ||
          (params.city === 'delhi-ncr' && (item.city === 'Gurugram' || item.city === 'Noida' || item.city === 'Delhi'))
      );
    }

    if (params?.propertyType && params.propertyType !== 'all') {
      results = results.filter(
        (item) => item.propertyType.toLowerCase() === params.propertyType?.toLowerCase()
      );
    }

    if (params?.minPrice !== undefined) {
      results = results.filter((item) => item.price >= params.minPrice!);
    }

    if (params?.maxPrice !== undefined && params.maxPrice > 0) {
      results = results.filter((item) => item.price <= params.maxPrice!);
    }

    if (params?.bhk && params.bhk.length > 0) {
      results = results.filter((item) => params.bhk!.includes(item.bhk));
    }

    if (params?.limit && params.limit > 0) {
      results = results.slice(0, params.limit);
    }

    return results;
  }

  const { data } = await apiClient.get<Listing[]>('/listings', { params });
  return data;
}

export async function fetchListingById(id: string): Promise<Listing | null> {
  if (isMockMode()) {
    await delay(120);
    const item = (mockListingsData as Listing[]).find((l) => l.id === id);
    return item || null;
  }

  const { data } = await apiClient.get<Listing>(`/listings/${id}`);
  return data;
}

export async function fetchProjects(): Promise<Project[]> {
  if (isMockMode()) {
    await delay(180);
    return mockProjectsData as Project[];
  }

  const { data } = await apiClient.get<Project[]>('/projects');
  return data;
}

export async function fetchFeaturedProject(): Promise<Project> {
  if (isMockMode()) {
    await delay(120);
    return (mockProjectsData as Project[])[0];
  }

  const { data } = await apiClient.get<Project>('/projects/spotlight');
  return data;
}

