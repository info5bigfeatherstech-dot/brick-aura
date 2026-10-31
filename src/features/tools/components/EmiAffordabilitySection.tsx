'use client';

import React from 'react';
import { SectionShell } from '@/components/shared/SectionShell';
import { EmiCalculator } from './EmiCalculator';
import { AffordabilityCard } from './AffordabilityCard';

export function EmiAffordabilitySection() {
  return (
    <SectionShell
      id="emi-tools"
      eyebrow="Financial Intelligence"
      title="EMI & Affordability Simulator"
      subtitle="Model real-world monthly instalments, interest payouts, and borrowing capacity with complete transparency before initiating site visits."
      variant="cream"
      withPattern
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive EMI Calculator (7 cols) */}
        <div className="lg:col-span-7">
          <EmiCalculator />
        </div>

        {/* Right: How Much Home Can I Afford? (5 cols) */}
        <div className="lg:col-span-5">
          <AffordabilityCard />
        </div>
      </div>
    </SectionShell>
  );
}

