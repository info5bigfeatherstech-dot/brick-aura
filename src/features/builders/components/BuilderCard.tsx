'use client';

import React from 'react';
import Link from 'next/link';
import { Builder } from '../types';
import { Star, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuilderCardProps {
  builder: Builder;
  className?: string;
}

export function BuilderCard({ builder, className }: BuilderCardProps) {
  return (
    <div
      className={cn(
        'group bg-white rounded-sm border border-sand hover:border-brick p-5 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between shadow-xs',
        className
      )}
    >
      <div>
        {/* Header: Builder Logo Monogram + Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-sm bg-sand-light border border-sand flex items-center justify-center font-montreal font-bold text-lg text-brick group-hover:bg-brick group-hover:text-white transition-colors duration-200">
            {builder.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 3)}
          </div>

          <div className="flex items-center gap-1 bg-cream px-2 py-0.5 rounded-sm border border-sand text-xs font-semibold text-ink">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{builder.rating}</span>
          </div>
        </div>

        {/* Builder Title & Legacy */}
        <h3 className="font-montreal font-bold text-base text-ink group-hover:text-brick transition-colors">
          {builder.name}
        </h3>
        {builder.featuredTag && (
          <span className="text-[11px] text-brick font-medium block mt-0.5">
            {builder.featuredTag}
          </span>
        )}

        {/* Experience and Active Projects Stats */}
        <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-sand text-xs text-ink/70">
          <div>
            <span className="text-[10px] uppercase text-ink/40 block">Experience</span>
            <span className="font-montreal font-bold text-sm text-ink">
              {builder.experienceYears} Years
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-ink/40 block">Active Projects</span>
            <span className="font-montreal font-bold text-sm text-ink">
              {builder.activeProjects} Ongoing
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 mt-4 border-t border-sand flex items-center justify-between text-xs">
        <span className="text-[11px] text-ink/50 truncate max-w-[130px]">
          {builder.cities.join(', ')}
        </span>

        <Link
          href={`/projects?builder=${encodeURIComponent(builder.name)}`}
          className="inline-flex items-center gap-1 font-semibold text-brick hover:underline group-hover:translate-x-0.5 transition-transform"
        >
          <span>View projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

