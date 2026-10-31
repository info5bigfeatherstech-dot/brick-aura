import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { fetchCities, fetchLocalities } from '../api/locations.api';
import { Locality } from '../types';
import { CityConfig } from '@/config/navigation';

export function useCities() {
  return useQuery<CityConfig[], Error>({
    queryKey: queryKeys.locations.cities(),
    queryFn: () => fetchCities(),
  });
}

export function useLocalities(cityId = 'delhi-ncr') {
  return useQuery<Locality[], Error>({
    queryKey: queryKeys.locations.localities(cityId),
    queryFn: () => fetchLocalities(cityId),
  });
}

