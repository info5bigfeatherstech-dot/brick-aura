export const queryKeys = {
  listings: {
    all: ['listings'] as const,
    list: (filters?: Record<string, unknown>) => ['listings', 'list', filters] as const,
    featured: () => ['listings', 'featured'] as const,
    detail: (id: string) => ['listings', 'detail', id] as const,
  },
  projects: {
    all: ['projects'] as const,
    spotlight: () => ['projects', 'spotlight'] as const,
    list: (filters?: Record<string, unknown>) => ['projects', 'list', filters] as const,
  },
  locations: {
    all: ['locations'] as const,
    cities: () => ['locations', 'cities'] as const,
    localities: (city: string) => ['locations', 'localities', city] as const,
  },
  builders: {
    all: ['builders'] as const,
    list: () => ['builders', 'list'] as const,
  },
  content: {
    articles: () => ['content', 'articles'] as const,
    testimonials: () => ['content', 'testimonials'] as const,
    faqs: () => ['content', 'faqs'] as const,
  },
};

