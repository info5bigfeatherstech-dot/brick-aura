'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroMosaic() {
  return (
    <div className="relative w-full h-[540px] sm:h-[580px] lg:h-[620px] select-none">
      {/* Subtle decorative background glow */}
      <div className="absolute -inset-4 bg-sand/30 rounded-lg filter blur-2xl -z-10 pointer-events-none" />

      <div className="grid grid-cols-12 gap-3.5 h-full">
        {/* Tall Left Architectural Image (7 columns) */}
        <div className="col-span-7 relative h-full rounded-sm overflow-hidden border border-sand group shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            alt="The Arbour Luxury Residences Gurugram"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-black/10" />

          {/* Floating Tag: New Launch - Gurugram */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-sand px-3 py-1.5 rounded-sm shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brick animate-ping" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-brick">
                New Launch
              </span>
              <span className="block text-xs font-semibold text-ink">Gurugram - Golf Course Ext</span>
            </div>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-sm bg-dark/60 backdrop-blur-xs border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-sand font-medium">Spotlight Residence</span>
                <h4 className="font-montreal font-bold text-sm sm:text-base text-cream">
                  The Arbour Signature 4BHK
                </h4>
              </div>
              <span className="text-sm font-bold text-cream font-montreal">₹2.85 Cr</span>
            </div>
          </div>
        </div>

        {/* Two Stacked Images on Right (5 columns) */}
        <div className="col-span-5 flex flex-col gap-3.5 h-full">
          {/* Top Stacked Image */}
          <div className="relative flex-1 rounded-sm overflow-hidden border border-sand group shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
              alt="Prestige Marigold Green Villa"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />

            {/* Floating Tag: Ready to Move - Pune */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-sand px-2.5 py-1 rounded-sm shadow-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span className="text-[10px] font-semibold text-ink">Ready to Move &bull; Pune</span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <h5 className="font-montreal font-semibold text-xs sm:text-sm text-cream truncate">
                Prestige Marigold Villas
              </h5>
              <span className="text-[11px] text-sand">From ₹1.85 Cr</span>
            </div>
          </div>

          {/* Bottom Stacked Image */}
          <div className="relative flex-1 rounded-sm overflow-hidden border border-sand group shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
              alt="Godrej Bayview Penthouse"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />

            <div className="absolute top-3 left-3 bg-dark/90 text-cream border border-stone-700 px-2.5 py-1 rounded-sm shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-sand" />
              <span className="text-[10px] font-semibold">Sea Facing &bull; Mumbai</span>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <h5 className="font-montreal font-semibold text-xs sm:text-sm text-cream truncate">
                Godrej Bayview Worli
              </h5>
              <span className="text-[11px] text-sand">₹6.20 Cr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

