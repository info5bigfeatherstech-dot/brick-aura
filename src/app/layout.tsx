import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/components/shared/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { siteConfig } from '@/config/site';

// Google Font: Poppins for body and UI
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Local Font: PP Neue Montreal for headings with fallback
const montreal = localFont({
  src: [
    {
      path: '../../public/fonts/PPNeueMontreal-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-montreal',
  display: 'swap',
  fallback: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    'Real Estate India',
    'Flats in Gurgaon',
    'Apartments in Bangalore',
    'Mumbai Penthouses',
    'RERA Verified Projects',
    'DLF Luxury Homes',
    'Zero Brokerage Properties',
    'BrickAura',
  ],
  authors: [{ name: 'BrickAura Properties Technologies' }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.headline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'BrickAura Architectural Real Estate Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization JSON-LD
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    telephone: siteConfig.contact.tollFree,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${poppins.variable} ${montreal.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brick selection:text-white">
        <Providers>
          {/* Desktop Two-Tier Header + Mobile Top Navigation */}
          <Header />

          {/* Home Page Content */}
          {children}

          {/* Section 15: Newsletter + Footer */}
          <Footer />

          {/* Mobile Sticky Bottom Tab Bar */}
          <BottomTabBar />
        </Providers>
      </body>
    </html>
  );
}
