'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '../hooks/useListings';
import { useUiStore } from '@/lib/ui-store';
import { formatPrice } from '@/lib/format';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FileText,
  ShieldCheck,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

export function ProjectFeature() {
  const { data: projects, isLoading } = useProjects();
  const { openBrochureModal } = useUiStore();

  const featured = projects && projects.length > 0 ? projects[0] : null;
  const sideProjects = projects && projects.length > 1 ? projects.slice(1, 5) : [];

  return (
    <SectionShell
      id="new-launch"
      eyebrow="Curated Developments"
      title="New Launch Spotlight"
      subtitle="Upcoming master-planned communities, high-rise architectural landmarks, and greenfield developments with pre-launch pricing."
      actions={
        <Link href="/projects">
          <Button variant="outline" size="sm" className="gap-2">
            <span>Explore All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-brick" />
          </Button>
        </Link>
      }
      variant="cream"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-[500px]">
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <Skeleton className="w-full h-24 rounded-sm" />
            <Skeleton className="w-full h-24 rounded-sm" />
            <Skeleton className="w-full h-24 rounded-sm" />
            <Skeleton className="w-full h-24 rounded-sm" />
          </div>
        </div>
      ) : featured ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Large Featured Project on the Left (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-sand shadow-md overflow-hidden flex flex-col justify-between group">
            {/* Big Hero Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-light">
              <Image
                src={featured.heroImage}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-black/20" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="brick" className="bg-white/95 text-brick backdrop-blur-xs font-bold text-xs">
                  Spotlight Project
                </Badge>
                <Badge variant="success" className="bg-white/95 text-success backdrop-blur-xs font-semibold text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RERA Verified</span>
                </Badge>
              </div>

              {/* Price Range Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sand block">
                    {featured.builderName}
                  </span>
                  <h3 className="font-montreal font-bold text-xl sm:text-2xl text-cream leading-tight">
                    {featured.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/70 block uppercase">Price Range</span>
                  <span className="font-montreal font-bold text-lg sm:text-xl text-sand">
                    {formatPrice(featured.priceMin, true)} &ndash; {formatPrice(featured.priceMax, false)}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Project Body Details */}
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink/70 pb-3 border-b border-sand">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brick shrink-0" />
                  <span className="font-medium text-ink">{featured.locality}, {featured.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brick shrink-0" />
                  <span>Possession: <strong className="text-ink">{featured.possessionDate}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brick shrink-0" />
                  <span>{featured.totalTowers} High-Rise Towers</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                {featured.description}
              </p>

              {/* Configurations List */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-ink uppercase tracking-wider block">
                  Available Configurations & Pricing
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {featured.configurations.map((cfg) => (
                    <div
                      key={cfg.bhk}
                      className="p-2.5 rounded-sm bg-cream/70 border border-sand space-y-0.5"
                    >
                      <span className="font-montreal font-semibold text-xs text-ink block">
                        {cfg.bhk}
                      </span>
                      <span className="text-[11px] text-ink/60 block">{cfg.area}</span>
                      <span className="font-montreal font-bold text-xs text-brick block">
                        {cfg.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Get Brochure + View Details */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={() => openBrochureModal(featured)}
                  variant="default"
                  size="default"
                  className="w-full sm:w-auto gap-2 font-semibold shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Architectural Brochure</span>
                </Button>

                <Link
                  href={`/projects/${featured.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold text-brick hover:underline py-2"
                >
                  <span>Explore Master Layout &rarr;</span>
                </Link>

                <div className="sm:ml-auto text-[11px] text-ink/50">
                  RERA: {featured.reraId}
                </div>
              </div>
            </div>
          </div>

          {/* Vertical List of 4 Smaller Projects on the Right (5 columns) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-sand">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/70">
                Trending Launches
              </span>
              <span className="text-xs text-brick font-semibold">4 New Additions</span>
            </div>

            {sideProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative bg-white rounded-sm border border-sand hover:border-brick p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex gap-3.5 shadow-xs"
              >
                <div className="relative w-28 h-24 rounded-sm overflow-hidden bg-sand-light shrink-0">
                  <Image
                    src={proj.heroImage}
                    alt={proj.name}
                    fill
                    sizes="112px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {proj.highlightTag && (
                    <span className="absolute top-1 left-1 text-[8px] bg-dark/90 text-sand px-1 rounded-xs font-semibold">
                      {proj.highlightTag}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-ink/50 uppercase font-medium truncate block">
                      {proj.builderName}
                    </span>
                    <h4 className="font-montreal font-semibold text-sm text-ink truncate group-hover:text-brick transition-colors">
                      {proj.name}
                    </h4>
                    <p className="text-[11px] text-ink/60 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brick shrink-0" />
                      <span>{proj.locality}, {proj.city}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-sand/50 flex items-center justify-between">
                    <span className="font-montreal font-bold text-xs sm:text-sm text-brick">
                      {formatPrice(proj.priceMin, true)} - {formatPrice(proj.priceMax, true)}
                    </span>

                    <button
                      onClick={() => openBrochureModal(proj)}
                      className="text-[11px] font-semibold text-ink hover:text-brick inline-flex items-center gap-0.5"
                    >
                      <span>Brochure</span>
                      <ArrowRight className="w-3 h-3 text-brick" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}

