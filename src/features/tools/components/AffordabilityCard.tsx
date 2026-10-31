'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { calculateAffordability } from '../lib/emi';
import { formatPrice } from '@/lib/format';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AffordabilityCard() {
  const [monthlyIncome, setMonthlyIncome] = useState(150000); // 1.5 Lakhs
  const [existingEmi, setExistingEmi] = useState(25000); // 25,000 existing EMI

  const affordability = calculateAffordability(monthlyIncome, existingEmi, 8.5, 20);

  return (
    <div className="bg-white rounded-sm border border-sand p-6 shadow-sm space-y-6 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-sand">
          <div className="w-8 h-8 rounded-sm bg-sand-light border border-sand flex items-center justify-center text-brick">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-montreal font-bold text-base text-ink">
              How Much Home Can I Afford?
            </h3>
            <p className="text-xs text-ink/60">
              Calculate maximum loan eligibility using standard bank FOIR ratios
            </p>
          </div>
        </div>

        {/* Income Sliders */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-ink/70">Net Monthly In-Hand Income</span>
              <span className="font-montreal font-bold text-sm text-ink">
                ₹{monthlyIncome.toLocaleString('en-IN')}/mo
              </span>
            </div>
            <Slider
              min={30000}
              max={1000000}
              step={10000}
              value={[monthlyIncome]}
              onValueChange={(vals) => setMonthlyIncome(vals[0])}
            />
            <div className="flex justify-between text-[10px] text-ink/40">
              <span>₹30k</span>
              <span>₹5 Lac</span>
              <span>₹10 Lac</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-ink/70">Existing Monthly EMIs / Liabilities</span>
              <span className="font-montreal font-bold text-sm text-ink">
                ₹{existingEmi.toLocaleString('en-IN')}/mo
              </span>
            </div>
            <Slider
              min={0}
              max={300000}
              step={5000}
              value={[existingEmi]}
              onValueChange={(vals) => setExistingEmi(vals[0])}
            />
            <div className="flex justify-between text-[10px] text-ink/40">
              <span>₹0</span>
              <span>₹1.5 Lac</span>
              <span>₹3 Lac</span>
            </div>
          </div>
        </div>

        {/* Output Metrics */}
        <div className="p-4 rounded-sm bg-cream border border-sand space-y-3">
          <div>
            <span className="text-[11px] uppercase font-semibold tracking-wider text-ink/60 block">
              Estimated Max Home Purchase Budget
            </span>
            <span className="font-montreal font-bold text-2xl text-brick block mt-0.5">
              {formatPrice(affordability.estimatedHomeBudget)}
            </span>
            <span className="text-[11px] text-ink/60">
              Assuming 80% bank loan + 20% down payment ({formatPrice(affordability.downPayment)})
            </span>
          </div>

          <div className="pt-2 border-t border-sand/60 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] uppercase text-ink/50 block">Eligible Loan Amount</span>
              <span className="font-montreal font-bold text-ink">
                {formatPrice(affordability.maxLoanAmount)}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-ink/50 block">Max Permissible EMI</span>
              <span className="font-montreal font-bold text-ink">
                ₹{affordability.maxAllowedEmi.toLocaleString('en-IN')}/mo
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 space-y-3">
        <Link
          href={`/search?maxPrice=${affordability.estimatedHomeBudget}`}
          className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 bg-brick text-white rounded-sm text-xs sm:text-sm font-semibold hover:bg-brick-hover transition-colors shadow-xs"
        >
          <span>Find Homes in this Budget</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex items-center gap-1.5 text-[10px] text-ink/60 justify-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span>Calculated at 50% FOIR with leading nationalized lenders</span>
        </div>
      </div>
    </div>
  );
}

