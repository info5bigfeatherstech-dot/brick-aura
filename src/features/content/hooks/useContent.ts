import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { fetchArticles, fetchTestimonials, fetchFaqs } from '../api/content.api';
import { Article, Testimonial, FaqItem } from '../types';

export function useArticles() {
  return useQuery<Article[], Error>({
    queryKey: queryKeys.content.articles(),
    queryFn: () => fetchArticles(),
  });
}

export function useTestimonials() {
  return useQuery<Testimonial[], Error>({
    queryKey: queryKeys.content.testimonials(),
    queryFn: () => fetchTestimonials(),
  });
}

export function useFaqs() {
  return useQuery<FaqItem[], Error>({
    queryKey: queryKeys.content.faqs(),
    queryFn: () => fetchFaqs(),
  });
}

