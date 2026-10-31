import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { fetchBuilders } from '../api/builders.api';
import { Builder } from '../types';

export function useBuilders() {
  return useQuery<Builder[], Error>({
    queryKey: queryKeys.builders.list(),
    queryFn: () => fetchBuilders(),
  });
}

