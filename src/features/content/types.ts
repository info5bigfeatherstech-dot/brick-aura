export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'Market Trends' | 'Buyer Guides' | 'Legal & Tax' | 'Locality Insights' | 'Architecture';
  readTime: string;
  publishedDate: string;
  image: string;
  author: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  city: string;
  dealType: 'Bought in Gurgaon' | 'Bought in Whitefield' | 'Sold in Mumbai' | 'Rented in Pune' | 'Bought in Noida' | 'Rented in Indiranagar';
  avatar: string;
  quote: string;
  rating: number;
  propertyTitle: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

