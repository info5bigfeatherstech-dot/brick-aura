'use client';

import React from 'react';
import { SectionShell } from '@/components/shared/SectionShell';
import { Search, SlidersHorizontal, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Search & Discover',
      description:
        'Explore 2.4L+ hand-verified residences, high-yield plots, and commercial floors with verified RERA documentation and clear price benchmarks.',
      icon: Search,
      highlight: 'Zero Fake Listings',
    },
    {
      step: '02',
      title: 'Shortlist & Compare',
      description:
        'Compare configurations, price per square foot, carpet area loading, and possession dates side-by-side with our interactive tools.',
      icon: SlidersHorizontal,
      highlight: 'Mathematical Clarity',
    },
    {
      step: '03',
      title: 'Connect & Visit',
      description:
        'Connect directly with genuine property owners or certified builder sales lounges without paying brokerage or intermediary commissions.',
      icon: Users,
      highlight: '100% Free Handover',
    },
  ];

  return (
    <SectionShell
      id="how-it-works"
      eyebrow="The BrickAura Protocol"
      title="How BrickAura Works"
      subtitle="A transparent, data-first real estate journey designed to eliminate broker friction and verify every square foot before booking."
      variant="dark"
    >
      <div className="relative pt-4">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden md:block absolute top-[68px] left-[15%] right-[15%] h-px bg-stone-700 -z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="group relative bg-[#22262A] rounded-sm border border-stone-800 p-6 sm:p-8 flex flex-col justify-between hover:border-brick transition-all duration-200 hover:-translate-y-1 shadow-md"
              >
                <div>
                  {/* Step Number + Icon Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-sm bg-stone-900 border border-stone-700 flex items-center justify-center text-brick group-hover:bg-brick group-hover:text-white transition-colors duration-200 shadow-sm">
                      <IconComp className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="font-montreal font-bold text-3xl text-sand/30 group-hover:text-sand/70 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sand block mb-1">
                    {item.highlight}
                  </span>
                  <h3 className="font-montreal font-bold text-xl text-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-800/80 flex items-center justify-between text-xs text-sand">
                  <span>Step {index + 1} of 3</span>
                  <ArrowRight className="w-4 h-4 text-brick group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-sm bg-[#16181A] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="font-montreal font-semibold text-base text-cream">
              Ready to begin your property search with zero brokerage?
            </h4>
            <p className="text-xs text-cream/60">
              Browse thousands of RERA verified listings across India&apos;s fastest growing micro-markets.
            </p>
          </div>
          <Link href="/buy">
            <Button variant="default" size="default" className="shrink-0 font-semibold shadow-xs">
              Explore Available Properties &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

