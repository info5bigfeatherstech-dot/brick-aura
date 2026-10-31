import apiClient from '@/lib/http';
import { isMockMode } from '@/lib/env';
import { Article, Testimonial, FaqItem } from '../types';
import mockArticlesData from '@/mocks/articles.json';
import mockTestimonialsData from '@/mocks/testimonials.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'RERA Compliance',
    question: 'How does BrickAura verify RERA registration numbers for listed projects?',
    answer:
      'Every new project or builder floor listed on BrickAura undergoes automated cross-verification with state Real Estate Regulatory Authority portals (such as MahaRERA, HRERA, and Karnataka RERA). We check developer registration, litigation records, sanctioned floor plans, and quarterly progress reports before awarding the "RERA Verified" shield.',
  },
  {
    id: 'faq-2',
    category: 'Brokerage & Fees',
    question: 'Is there any brokerage charged when contacting property owners or builders?',
    answer:
      'Zero. BrickAura does not charge buyers or tenants any commission or brokerage for connecting with verified property owners or official builder sales suites. Owners also enjoy 100% free basic property posting in 3 simple steps.',
  },
  {
    id: 'faq-3',
    category: 'Listing Verification',
    question: 'What ensures listings on BrickAura are genuine and free of duplicates?',
    answer:
      'Our proprietary AuraCheck verification engine checks title document ownership, geo-tagged coordinates, utility bills, and algorithmic deduplication to eliminate dummy or unavailable listings. High-priority properties are physically visited by field executives for video and geo-stamp verification.',
  },
  {
    id: 'faq-4',
    category: 'Home Loans & Affordability',
    question: 'Can I check home loan eligibility and compare bank interest rates on BrickAura?',
    answer:
      'Yes. Our integrated EMI Calculator and Affordability Engine calculates your estimated monthly instalments based on RBI benchmark lending rates. We partner with leading Tier-1 public and private banks (SBI, HDFC, ICICI, Axis) to offer in-principle sanctions with exclusive zero-processing-fee offers.',
  },
  {
    id: 'faq-5',
    category: 'Posting a Property',
    question: 'How do I post my residential flat, villa, or commercial space for sale or rent?',
    answer:
      'Simply click the "Post Property" button in the navigation header. Select your property type, enter the locality and super-area specifications, upload 3 or more photos, and set your expected price. Your listing is verified and live within 30 minutes, visible to over 2.4 Lakh active seekers.',
  },
  {
    id: 'faq-6',
    category: 'New Launch Bookings',
    question: 'How do new launch bookings and expression of interest (EOI) work?',
    answer:
      'For newly launched townships and spotlight towers, you can request digital architectural brochures, floor-plan PDFs, and book an official site visit with builder representatives. Priority window allotments and pre-launch pricing guarantees are facilitated directly with developer management.',
  },
];

export async function fetchArticles(): Promise<Article[]> {
  if (isMockMode()) {
    await delay(120);
    return mockArticlesData as Article[];
  }
  const { data } = await apiClient.get<Article[]>('/content/articles');
  return data;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (isMockMode()) {
    await delay(120);
    return mockTestimonialsData as Testimonial[];
  }
  const { data } = await apiClient.get<Testimonial[]>('/content/testimonials');
  return data;
}

export async function fetchFaqs(): Promise<FaqItem[]> {
  if (isMockMode()) {
    await delay(80);
    return DEFAULT_FAQS;
  }
  const { data } = await apiClient.get<FaqItem[]>('/content/faqs');
  return data;
}

