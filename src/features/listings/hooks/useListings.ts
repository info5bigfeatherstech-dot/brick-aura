import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  fetchListings,
  fetchProjects,
  fetchListingBySlug,
  fetchProjectBySlug,
  ListingFilterParams,
} from '../api/listings.api';
import { Listing, Project } from '../types';

export function useListings(params?: ListingFilterParams) {
  return useQuery<Listing[], Error>({
    queryKey: queryKeys.listings.list(params as Record<string, unknown>),
    queryFn: () => fetchListings(params),
  });
}

export function useListingDetail(slug: string) {
  return useQuery<Listing | null, Error>({
    queryKey: queryKeys.listings.detail(slug),
    queryFn: () => fetchListingBySlug(slug),
    enabled: !!slug,
  });
}

export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: queryKeys.projects.list(),
    queryFn: () => fetchProjects(),
  });
}

export function useProjectDetail(slug: string) {
  return useQuery<Project | null, Error>({
    queryKey: ['projects', 'detail', slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: !!slug,
  });
}
