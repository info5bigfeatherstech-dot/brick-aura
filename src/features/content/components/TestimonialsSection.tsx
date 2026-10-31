'use client';

import React from 'react';
import Image from 'next/image';
import { SectionShell } from '@/components/shared/SectionShell';
import { useTestimonials } from '../hooks/useContent';
import { Star, Quote } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useTestimonials();

  const list = testimonials || [];

  return (
    <SectionShell
      id="testimonials"
      eyebrow="Verified Experiences"
      title="Voices from Real Addresses"
      subtitle="Hear directly from families, executives, and owners who bought, sold, or leased certified homes through BrickAura."
      variant="cream"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-sm border border-sand p-6 flex flex-col justify-between shadow-xs hover:border-brick transition-colors"
            >
              <div className="space-y-4">
                {/* Header: Deal Badge + Star Rating */}
                <div className="flex items-center justify-between">
                  <Badge variant="brick" className="text-[10px] font-semibold">
                    {item.dealType}
                  </Badge>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-sand/70 mb-1" />
                  <p className="text-xs sm:text-sm text-ink/80 italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author & Property Footer */}
              <div className="pt-4 mt-6 border-t border-sand flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-sand-light shrink-0 border border-sand">
                  <Image
                    src={item.avatar}
                    alt={item.authorName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-montreal font-semibold text-xs sm:text-sm text-ink truncate">
                    {item.authorName}
                  </h4>
                  <p className="text-[11px] text-ink/60 truncate">
                    {item.authorRole} &bull; {item.city}
                  </p>
                  <p className="text-[10px] text-brick font-medium truncate mt-0.5">
                    {item.propertyTitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

