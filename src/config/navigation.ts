export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  iconName: string;
  count: string;
}

export interface CityConfig {
  id: string;
  name: string;
  state: string;
  activeCount: string;
  lat: number;
  lng: number;
}

export const CITIES: CityConfig[] = [
  { id: 'delhi-ncr', name: 'Delhi NCR', state: 'Delhi & Haryana', activeCount: '48,000+ properties', lat: 28.4595, lng: 77.0266 },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', activeCount: '62,000+ properties', lat: 19.076, lng: 72.8777 },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', activeCount: '54,000+ properties', lat: 12.9716, lng: 77.5946 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', activeCount: '31,000+ properties', lat: 18.5204, lng: 73.8567 },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', activeCount: '27,000+ properties', lat: 17.385, lng: 78.4867 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', activeCount: '19,000+ properties', lat: 13.0827, lng: 80.2707 },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', activeCount: '16,000+ properties', lat: 22.5726, lng: 88.3639 },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', activeCount: '21,000+ properties', lat: 23.0225, lng: 72.5714 },
];

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Buy', href: '/buy' },
  { label: 'Rent', href: '/rent' },
  { label: 'New Launch', href: '/new-launch', badge: 'Hot' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Plots/Land', href: '/plots-land' },
  { label: 'Projects', href: '/projects' },
];

export const RESIDENTIAL_MEGA_MENU: MegaMenuItem[] = [
  {
    title: 'Flats & Apartments',
    description: 'High-rise gated societies, multi-storey towers with modern amenities',
    href: '/residential?type=flats',
    iconName: 'Building2',
    count: '98,000+ Listings',
  },
  {
    title: 'Independent Houses',
    description: 'Standalone residences with independent ownership and private gardens',
    href: '/residential?type=independent-houses',
    iconName: 'Home',
    count: '14,000+ Listings',
  },
  {
    title: 'Luxury Villas',
    description: 'Exclusive gated communities, private pools, and bespoke architecture',
    href: '/residential?type=villas',
    iconName: 'Castle',
    count: '8,400+ Listings',
  },
  {
    title: 'Builder Floors',
    description: 'Low-rise boutique apartments with dedicated parking and terrace rights',
    href: '/residential?type=builder-floors',
    iconName: 'Layers',
    count: '22,000+ Listings',
  },
  {
    title: 'Studio Apartments',
    description: 'Compact 1RK/1BHK layouts ideal for young professionals and students',
    href: '/residential?type=studios',
    iconName: 'LayoutGrid',
    count: '6,200+ Listings',
  },
  {
    title: 'Serviced Apartments',
    description: 'Furnished residences with housekeeping, gym, and concierge services',
    href: '/residential?type=serviced',
    iconName: 'Sparkles',
    count: '3,800+ Listings',
  },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Properties in India',
    links: [
      { label: 'Property in Gurugram', href: '/search?city=delhi-ncr&locality=Gurugram' },
      { label: 'Property in Mumbai', href: '/search?city=mumbai' },
      { label: 'Property in Bengaluru', href: '/search?city=bengaluru' },
      { label: 'Property in Pune', href: '/search?city=pune' },
      { label: 'Property in Noida', href: '/search?city=delhi-ncr&locality=Noida' },
      { label: 'Flats for Sale in Whitefield', href: '/search?city=bengaluru&locality=Whitefield' },
      { label: 'Villas in Golf Course Ext Rd', href: '/search?city=delhi-ncr&type=villas' },
    ],
  },
  {
    title: 'Top Cities',
    links: [
      { label: 'Real Estate in Delhi NCR', href: '/search?city=delhi-ncr' },
      { label: 'Real Estate in Mumbai', href: '/search?city=mumbai' },
      { label: 'Real Estate in Bengaluru', href: '/search?city=bengaluru' },
      { label: 'Real Estate in Pune', href: '/search?city=pune' },
      { label: 'Real Estate in Hyderabad', href: '/search?city=hyderabad' },
      { label: 'Real Estate in Chennai', href: '/search?city=chennai' },
      { label: 'Real Estate in Kolkata', href: '/search?city=kolkata' },
    ],
  },
  {
    title: 'Company & Insights',
    links: [
      { label: 'About BrickAura', href: '/about' },
      { label: 'Careers & Culture', href: '/careers' },
      { label: 'Editorial & News', href: '/articles' },
      { label: 'Research Reports 2024', href: '/research' },
      { label: 'Brand & Press Kit', href: '/press' },
      { label: 'RERA Compliance Policy', href: '/rera-policy' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
  {
    title: 'Support & Tools',
    links: [
      { label: 'Home Loan EMI Calculator', href: '#emi-calculator' },
      { label: 'Affordability Estimator', href: '#emi-calculator' },
      { label: 'Post Property (Free)', href: '/post-property' },
      { label: 'Agent & Builder Portal', href: '/partner' },
      { label: 'Report Fraud / Duplicate', href: '/report' },
      { label: 'Customer Care & Help', href: '/help' },
      { label: 'Terms & Privacy Policy', href: '/terms' },
    ],
  },
];

export const POPULAR_SEARCH_TAGS = [
  'Flats in Gurugram under 1.5 Cr',
  'Ready to move 3BHK in Bangalore',
  'Plots near Devanahalli Airport',
  'Sea-view apartments in Worli',
  '2BHK in Baner Pune under 80 Lakhs',
  'Commercial IT offices Cyber City',
  'Prestige projects in Bangalore',
  'DLF luxury penthouses',
  'Villas in North Bangalore',
  'RERA verified flats Noida Sector 150',
];

