import React from 'react';
import { SplitHeroSection } from '@/features/search/components/SplitHeroSection';
import { IntentSwitcherSection } from '@/features/listings/components/IntentSwitcherSection';
import { BentoBrowseSection } from '@/features/search/components/BentoBrowseSection';
import { MapExplore } from '@/features/listings/components/MapExplore';
import { ProjectFeature } from '@/features/listings/components/ProjectFeature';
import { EmiAffordabilitySection } from '@/features/tools/components/EmiAffordabilitySection';
import { PopularLocalitiesSection } from '@/features/locations/components/PopularLocalitiesSection';
import { HowItWorksSection } from '@/features/content/components/HowItWorksSection';
import { TopBuildersSection } from '@/features/builders/components/TopBuildersSection';
import { RecentlyViewedSection } from '@/features/listings/components/RecentlyViewedSection';
import { PostPropertyBand } from '@/features/listings/components/PostPropertyBand';
import { EditorialNewsSection } from '@/features/content/components/EditorialNewsSection';
import { TestimonialsSection } from '@/features/content/components/TestimonialsSection';
import { FaqSection } from '@/features/content/components/FaqSection';
import { BrochureModal } from '@/features/listings/components/BrochureModal';

export default function HomePage() {
  return (
    <main className="min-h-screen pb-16 lg:pb-0">
      {/* 1. SPLIT HERO */}
      <SplitHeroSection />

      {/* 2. INTENT SWITCHER */}
      <IntentSwitcherSection />

      {/* 3. BENTO: BROWSE YOUR WAY */}
      <BentoBrowseSection />

      {/* 4. MAP EXPLORE */}
      <MapExplore />

      {/* 5. NEW LAUNCH SPOTLIGHT */}
      <ProjectFeature />

      {/* 6. EMI AND AFFORDABILITY TOOLS */}
      <EmiAffordabilitySection />

      {/* 7. POPULAR LOCALITIES (masonry-style grid) */}
      <PopularLocalitiesSection />

      {/* 8. HOW BRICKAURA WORKS */}
      <HowItWorksSection />

      {/* 9. TOP BUILDERS */}
      <TopBuildersSection />

      {/* 10. RECENTLY VIEWED + SHORTLIST */}
      <RecentlyViewedSection />

      {/* 11. OWNER VS DEALER: POST PROPERTY BAND */}
      <PostPropertyBand />

      {/* 12. NEIGHBOURHOOD GUIDES AND NEWS */}
      <EditorialNewsSection />

      {/* 13. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 14. FAQ */}
      <FaqSection />

      {/* Global Interactive Dialogs */}
      <BrochureModal />
    </main>
  );
}
