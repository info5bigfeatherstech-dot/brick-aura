import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { fetchFeaturedProject } from '../api/listings.api';
import { Project } from '../types';

export function useFeaturedProject() {
  return useQuery<Project, Error>({
    queryKey: queryKeys.projects.spotlight(),
    queryFn: () => fetchFeaturedProject(),
  });
}

