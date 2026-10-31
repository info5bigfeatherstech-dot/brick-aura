import apiClient from '@/lib/http';
import { isMockMode } from '@/lib/env';
import { Builder } from '../types';
import mockBuildersData from '@/mocks/builders.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchBuilders(): Promise<Builder[]> {
  if (isMockMode()) {
    await delay(150);
    return mockBuildersData as Builder[];
  }
  const { data } = await apiClient.get<Builder[]>('/builders');
  return data;
}

