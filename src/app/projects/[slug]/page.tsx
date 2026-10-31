'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useProjectDetail } from '@/features/listings/hooks/useListings';
import { useUiStore } from '@/lib/ui-store';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  ShieldCheck,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Share2,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const { data: project, isLoading, isError } = useProjectDetail(slug);
  const { openBrochureModal } = useUiStore();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-brick border-t-transparent animate-spin mx-auto" />
        <h2 className="font-montreal font-semibold text-lg text-ink">
          Retrieving master township plans &amp; RERA documentation...
        </h2>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-montreal font-bold text-2xl text-ink">Project Not Found</h2>
        <p className="text-sm text-ink/70">
          The development project you requested could not be located.
        </p>
        <Link href="/projects">
          <Button variant="default">Explore All Projects</Button>
        </Link>
      </div>
    );
  }

  const gallery = [project.heroImage, ...(project.galleryImages || [])];

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink/60 border-b border-sand pb-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-brick flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brick">
              Projects
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-md">
              {project.name}
            </span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: project.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Project link copied to clipboard!');
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-sand hover:border-brick text-ink text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Project</span>
          </button>
        </div>

        {/* Top Header: Title, Price, Developer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white p-6 rounded-sm border border-sand shadow-xs">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="brick" className="text-xs font-semibold">
                New Launch Development
              </Badge>
              {project.isReraVerified && (
                <Badge variant="success" className="text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RERA Approved: {project.reraId}</span>
                </Badge>
              )}
              {project.highlightTag && (
                <Badge variant="dark" className="text-xs">
                  {project.highlightTag}
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montreal tracking-tight text-ink">
              {project.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-ink/70">
              <MapPin className="w-4 h-4 text-brick shrink-0" />
              <span>{project.locality}, {project.city}</span>
              <span>&bull;</span>
              <span className="font-semibold text-ink">By {project.builderName}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="lg:text-right space-y-1">
            <div className="text-xs uppercase tracking-wider text-ink/60 font-semibold">
              Price Range
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-montreal text-brick tracking-tight">
              {formatPrice(project.priceMin, true)} &ndash; {formatPrice(project.priceMax, false)}
            </div>
            <div className="text-xs text-ink/60">
              <span>Possession Date: <strong>{project.possessionDate}</strong></span>
            </div>
          </div>
        </div>

        {/* Big Hero Banner */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden bg-sand-light border border-sand shadow-sm">
            <Image
              src={gallery[activeImageIdx] || gallery[0]}
              alt={project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-all duration-300"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-28 h-20 rounded-sm overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIdx === i ? 'border-brick ring-2 ring-brick/20' : 'border-sand opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill sizes="112px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Project Overview */}
            <div className="bg-white rounded-sm border border-sand p-6 shadow-xs space-y-4">
              <h3 className="font-montreal font-bold text-lg text-ink">
                Master Development Overview
              </h3>
              <p className="text-sm text-ink/75 leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-sand/60 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">High-Rise Towers</span>
                  <span className="font-bold text-sm text-ink">{project.totalTowers || 6} Towers</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Residential Units</span>
                  <span className="font-bold text-sm text-ink">{project.totalUnits || 850}+ Residences</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Launch Timeline</span>
                  <span className="font-bold text-sm text-ink">Year {project.launchYear}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Target Handover</span>
                  <span className="font-bold text-sm text-ink">{project.possessionDate}</span>
                </div>
              </div>
            </div>

            {/* Configurations & Pricing */}
            <div className="bg-white rounded-sm border border-sand p-6 shadow-xs space-y-4">
              <h3 className="font-montreal font-bold text-lg text-ink">
                Unit Configurations &amp; Floor Areas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.configurations.map((cfg) => (
                  <div
                    key={cfg.bhk}
                    className="p-4 rounded-sm bg-cream/70 border border-sand space-y-2 hover:border-brick transition-colors"
                  >
                    <span className="font-montreal font-bold text-base text-ink block">
                      {cfg.bhk}
                    </span>
                    <span className="text-xs text-ink/70 block">
                      Super Built-Up: <strong>{cfg.area}</strong>
                    </span>
                    <span className="font-montreal font-bold text-base text-brick block">
                      {cfg.price}
                    </span>
                    <Button
                      onClick={() => openBrochureModal(project)}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-semibold mt-2"
                    >
                      Get Floor Plan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-sm border border-sand p-6 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-sand">
                <div className="w-10 h-10 rounded-sm bg-sand-light border border-sand flex items-center justify-center text-brick font-montreal font-bold text-sm">
                  {project.builderName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-montreal font-bold text-sm text-ink">
                    {project.builderName}
                  </h4>
                  <p className="text-[11px] text-success font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Sales Lounge</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => openBrochureModal(project)}
                  variant="default"
                  size="lg"
                  className="w-full font-semibold gap-2 shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Digital Brochure (PDF)</span>
                </Button>

                <a
                  href={`https://wa.me/919876543210?text=Hello,%20I%20am%20inquiring%20about%20pre-launch%20allotment%20for%20${encodeURIComponent(project.name)}%20on%20BrickAura.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-sm border border-sand bg-cream hover:bg-white hover:border-brick text-ink text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-brick" />
                  <span>Request Priority Callback</span>
                </a>
              </div>

              <div className="pt-3 border-t border-sand text-[11px] text-ink/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>Pre-launch guaranteed pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>RERA compliance audit verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

