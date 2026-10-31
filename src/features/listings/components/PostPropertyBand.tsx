'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileEdit,
  Camera,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export function PostPropertyBand() {
  const steps = [
    {
      step: 'Step 1',
      title: 'Enter Property Details',
      desc: 'Location, super-area & pricing',
      icon: FileEdit,
    },
    {
      step: 'Step 2',
      title: 'Upload High-Res Photos',
      desc: 'Showcase rooms & natural lighting',
      icon: Camera,
    },
    {
      step: 'Step 3',
      title: 'Publish & Connect',
      desc: 'Receive direct buyer calls with zero commission',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-cream border-b border-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border border-sand p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (6 cols): Value proposition & CTA */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="brick" className="text-xs font-bold uppercase tracking-wider">
                  Owner &amp; Builder Portal
                </Badge>
                <span className="text-xs text-ink/60 font-medium">100% Free Listing</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montreal tracking-tight text-ink leading-tight">
                Selling or renting?{' '}
                <span className="text-brick">Post free in 3 steps.</span>
              </h2>

              <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                Connect directly with 2.4 Lakh+ verified home seekers, NRI investors, and high-net-worth buyers across India. Zero broker commission, zero listing charges.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link href="/post-property">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto gap-2 font-semibold shadow-xs"
                  >
                    <span>Post Your Property (FREE)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-ink/60 px-2 py-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Goes live in under 30 minutes</span>
                </div>
              </div>
            </div>

            {/* Right Column (6 cols): Tiny Stepper Preview (details -> photos -> publish) */}
            <div className="lg:col-span-6 bg-cream/70 rounded-sm border border-sand p-5 sm:p-6 space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50 block">
                How It Works for Owners:
              </span>

              <div className="space-y-3 relative">
                {/* Stepper items joined by line */}
                {steps.map((s) => {
                  const IconComp = s.icon;
                  return (
                    <div
                      key={s.step}
                      className="flex items-start gap-3.5 bg-white p-3.5 rounded-sm border border-sand/80 shadow-2xs relative"
                    >
                      <div className="w-9 h-9 rounded-sm bg-sand-light border border-sand flex items-center justify-center text-brick shrink-0 font-montreal font-bold text-xs">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-montreal font-semibold text-xs sm:text-sm text-ink">
                            {s.title}
                          </span>
                          <span className="text-[10px] font-bold text-brick uppercase tracking-wider">
                            {s.step}
                          </span>
                        </div>
                        <p className="text-[11px] text-ink/60 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-ink/60 border-t border-sand/60">
                <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                <span>Your contact details are encrypted and shared only with verified OTP leads.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

