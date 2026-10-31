# BrickAura Properties

An architectural, high-performance real estate marketplace built for the Indian market. BrickAura Properties features a completely original layout, confident architectural design system (sharper 4–8px corners, 1px solid borders, bento grids, and subtle brick patterns), and strict feature-based modularity.

---

## 1. Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables Design System
- **UI Primitives**: Radix UI (accessible Dialog, Sheet, Select, Tabs, ToggleGroup, Slider, Popover, Accordion, Tooltip) + cmdk
- **State Management**: TanStack Query (server state & caching) + Zustand (client state with localStorage persistence)
- **HTTP Client**: Axios with centralized request/response interceptors & custom timeout handling
- **Interactive Maps**: `react-leaflet` + OpenStreetMap tiles (loaded dynamically with `ssr: false`, zero layout shift)
- **Testing**: Vitest for fast unit testing of pure formatters and financial mathematics

---

## 2. Project Architecture & Folder Structure

```
d:/brickaura/
├── public/
│   └── fonts/                      # Font files directory (PP Neue Montreal fallback/production)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (Fonts, SEO JSON-LD, ReactQueryProvider, Header, Footer)
│   │   ├── page.tsx                # Home Page (assemblies all 15 sections in strict sequential order)
│   │   ├── globals.css             # Design tokens, CSS variables, Leaflet markers, brick SVG patterns
│   │   ├── search/page.tsx         # Search results page with filter query params
│   │   ├── buy/page.tsx            # Buy properties placeholder route
│   │   ├── rent/page.tsx           # Rental residences placeholder route
│   │   ├── new-launch/page.tsx     # New launch developments route
│   │   ├── commercial/page.tsx     # Commercial office/retail route
│   │   ├── plots-land/page.tsx     # Plotted communities route
│   │   ├── projects/page.tsx       # Master township projects route
│   │   ├── post-property/page.tsx  # Free property posting route
│   │   └── residential/page.tsx    # Residential categories route
│   ├── components/
│   │   ├── layout/                 # Two-Tier Header, MainNav, UtilityStrip, MegaMenu, BottomTabBar, Footer
│   │   ├── shared/                 # SectionShell, Eyebrow, PriceLabel, EmptyState, ErrorState, SkeletonGrid, BrandLogo
│   │   └── ui/                     # Accessible shadcn / Radix UI primitives
│   ├── config/
│   │   ├── navigation.ts           # Nav links, mega-menu configurations, city coordinates, footer links
│   │   └── site.ts                 # Brand identity, toll-free contact numbers, social handles, stats
│   ├── features/
│   │   ├── search/                 # SearchPanel, IntentTabs, BudgetSlider, BhkChips, LocalityMultiSelect, store
│   │   ├── listings/               # Polymorphic ListingCard, ProjectFeature, MapExplore, LeafletMapInner, api, hooks
│   │   ├── locations/              # LocalityTile, PopularLocalitiesSection, api, hooks
│   │   ├── builders/               # BuilderCard, BuilderMarquee, TopBuildersSection, api, hooks
│   │   ├── content/                # ArticleCard, Testimonials, FaqSection (with FAQPage JSON-LD), api, hooks
│   │   ├── tools/                  # EmiCalculator, AffordabilityCard, pure typed emi.ts & unit tests
│   │   └── wishlist/               # Persisted Zustand useWishlistStore & useRecentlyViewedStore
│   ├── lib/
│   │   ├── env.ts                  # Safe environment variable parsing & data mode toggles
│   │   ├── http.ts                 # Configured Axios instance with interceptors
│   │   ├── query-client.ts         # TanStack Query Client configuration
│   │   ├── query-keys.ts           # Centralized query key factory
│   │   ├── format.ts               # Price (Lac/Cr), sq.ft, date & Indian counting formatters
│   │   └── format.test.ts          # Unit tests for formatters
│   └── mocks/                      # Realistic Indian real-estate JSON fixtures
│       ├── listings.json           # 12 listings with coordinates across NCR, Mumbai, Bangalore, Pune
│       ├── projects.json           # 6 major township developments
│       ├── localities.json         # 32 localities (8 per city for 4 major metros)
│       ├── builders.json           # 8 top developers (DLF, Godrej, Prestige, Sobha, etc.)
│       ├── articles.json           # 6 editorial research articles
│       └── testimonials.json       # 6 verified client deal testimonials
├── .env.example                    # Environment variable template
├── package.json
└── tailwind.config.ts              # Extended colors, font family tokens, marquee keyframes
```

---

## 3. How to Switch Between Mock and Live API Data Mode

The application implements a zero-component-change data toggle. In `.env.local` (or environment variables):

```bash
# Set DATA_MODE to 'mock' to load from local JSON fixtures with simulated async delay:
NEXT_PUBLIC_DATA_MODE=mock

# Set DATA_MODE to 'live' to proxy all requests to your backend service:
NEXT_PUBLIC_DATA_MODE=live
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/v1
```

- When `NEXT_PUBLIC_DATA_MODE=mock`, `src/features/*/api/*.api.ts` resolves mock data locally with realistic 100–200ms latency.
- When `NEXT_PUBLIC_DATA_MODE=live`, `apiClient` (Axios) makes real HTTP calls to `NEXT_PUBLIC_API_BASE_URL`.
- Because response TypeScript shapes are strictly identical, **zero UI components need modification** when switching between mock and live backend.

---

## 4. Where to Place PP Neue Montreal Font Files

The project loads **Poppins** via `next/font/google` and **PP Neue Montreal** via `next/font/local`.

The CSS font fallback chain is configured as:
```
PP Neue Montreal -> Poppins -> system-ui -> sans-serif
```

To use custom licensed PP Neue Montreal files:
1. Place your font files into `public/fonts/`:
   - `public/fonts/PPNeueMontreal-Medium.ttf` (or `.woff2`)
   - `public/fonts/PPNeueMontreal-Bold.ttf` (or `.woff2`)
2. The `src/app/layout.tsx` file is pre-configured to load these files with Next.js font optimization. If you use `.woff2`, update the extension in `layout.tsx`.

---

## 5. How to Add a New Section, Page, or Feature Module

### Adding a New Home Page Section:
1. Create your component in `src/features/<feature>/components/<SectionName>.tsx`.
2. Wrap it with `<SectionShell id="my-section" eyebrow="..." title="..." variant="white|cream|dark">`.
3. Import and place it in the desired order in `src/app/page.tsx`.

### Adding a New Feature Module:
1. Create `src/features/<new-feature>/`:
   - `types.ts`: Define domain models.
   - `api/<new-feature>.api.ts`: Define Axios calls with mock fallback.
   - `hooks/use<NewFeature>.ts`: TanStack Query hook using `queryKeys`.
   - `components/`: Pure presentational or interactive components.
2. Add corresponding query keys in `src/lib/query-keys.ts`.

---

## 6. Running Tests & Commands

```bash
# Run the Next.js development server
npm run dev

# Run all unit tests (formatters & financial math)
npm test

# Build production bundle (strictly typechecked & linted)
npm run build

# Start production server
npm start
```

---

## 7. Home Page Sections (Strict Sequential Order)

1. **Split Hero**: Search panel with Buy/Rent/Commercial/Plots segmented toggle, city, locality chips, budget slider, BHK chips, 3 trust stats, and 3-image architectural mosaic with floating tags.
2. **Intent Switcher ("What are you looking for?")**: Pill/tab row controlling 6 cross-faded polymorphic `ListingCard` items (Property & Project cards).
3. **Bento: Browse Your Way**: Bento grid shortcuts by Budget, by BHK, by Possession, and by Property Type.
4. **Map Explore**: Left filter column + dynamic Leaflet map with price-label pins (`₹1.2 Cr`) and popup mini cards (mobile responsive).
5. **New Launch Spotlight**: Large featured project with RERA badge, configurations, and "Get Brochure" modal + 4 stacked trending projects.
6. **EMI and Affordability Tools**: Interactive loan amount, interest rate, tenure sliders with live EMI and principal/interest breakdown bar, beside the "How much home can I afford?" calculator.
7. **Popular Localities**: City tabs (NCR, Mumbai, Bangalore, Pune) over a masonry-style grid with prices/sq.ft and YoY appreciation trend badges.
8. **How BrickAura Works**: Horizontal 3-step protocol (Search -> Shortlist & Compare -> Connect & Visit) on dark `#1A1D1F` section.
9. **Top Builders**: Developer profile cards with active project metrics + infinite scrolling logo marquee.
10. **Recently Viewed + Shortlist**: Persisted Zustand store integration with friendly empty state illustration.
11. **Owner vs Dealer: Post Property Band**: Split banner with 3-step stepper preview (details -> photos -> publish).
12. **Neighbourhood Guides & News**: 4-card editorial grid (1 large + 3 compact) with read times and tags.
13. **Testimonials**: 3-column verified quote wall with buyer/seller/renter deal labels.
14. **FAQ**: Accessible Accordion with 6 core questions + Google `FAQPage` JSON-LD schema.
15. **Newsletter & Footer**: Email dispatch subscription strip + 4-column link tree + SEO popular search tags.
