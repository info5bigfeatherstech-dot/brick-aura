/**
 * Validated Environment Variables Access
 */

export type DataMode = 'mock' | 'live';

export interface AppEnv {
  dataMode: DataMode;
  apiBaseUrl: string;
}

export const env: AppEnv = {
  dataMode: (process.env.NEXT_PUBLIC_DATA_MODE as DataMode) || 'mock',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.brickaura.com/v1',
};

export const isMockMode = (): boolean => env.dataMode === 'mock';

