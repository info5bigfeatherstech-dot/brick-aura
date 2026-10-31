import apiClient from '@/lib/http';
import { isMockMode } from '@/lib/env';
import { Locality } from '../types';
import mockLocalitiesData from '@/mocks/localities.json';
import { CITIES, CityConfig } from '@/config/navigation';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCities(): Promise<CityConfig[]> {
  if (isMockMode()) {
    await delay(100);
    return CITIES;
  }
  const { data } = await apiClient.get<CityConfig[]>('/locations/cities');
  return data;
}

export async function fetchLocalities(cityId = 'delhi-ncr'): Promise<Locality[]> {
  if (isMockMode()) {
    await delay(150);
    const localities = (mockLocalitiesData as Locality[]).filter(
      (loc) => loc.cityId.toLowerCase() === cityId.toLowerCase()
    );
    return localities.length > 0 ? localities : (mockLocalitiesData as Locality[]).slice(0, 8);
  }

  const { data } = await apiClient.get<Locality[]>(`/locations/${cityId}/localities`);
  return data;
}

