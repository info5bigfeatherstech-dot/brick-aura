'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { calculateEmiBreakdown } from '../lib/emi';
import { formatPrice } from '@/lib/format';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(6000000); // 60 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  const breakdown = calculateEmiBreakdown(loanAmount, interestRate, tenureYears);

  return (
    <div className="bg-white rounded-sm border border-sand p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-sand">
        <div className="w-8 h-8 rounded-sm bg-sand-light border border-sand flex items-center justify-center text-brick">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-montreal font-bold text-base text-ink">
            Home Loan EMI Calculator
          </h3>
          <p className="text-xs text-ink/60">
            Real-time monthly repayment and amortisation estimates
          </p>
        </div>
      </div>

      {/* Sliders Area */}
      <div className="space-y-5">
        {/* Loan Amount Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink/70">Loan Amount</span>
            <span className="font-montreal font-bold text-sm text-brick">
              {formatPrice(loanAmount)}
            </span>
          </div>
          <Slider
            min={500000}
            max={50000000}
            step={500000}
            value={[loanAmount]}
            onValueChange={(vals) => setLoanAmount(vals[0])}
          />
          <div className="flex justify-between text-[10px] text-ink/40">
            <span>₹5 Lac</span>
            <span>₹2.5 Cr</span>
            <span>₹5 Cr</span>
          </div>
        </div>

        {/* Interest Rate Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink/70">Interest Rate (p.a.)</span>
            <span className="font-montreal font-bold text-sm text-ink">
              {interestRate.toFixed(1)}%
            </span>
          </div>
          <Slider
            min={6.5}
            max={15.0}
            step={0.1}
            value={[interestRate]}
            onValueChange={(vals) => setInterestRate(vals[0])}
          />
          <div className="flex justify-between text-[10px] text-ink/40">
            <span>6.5%</span>
            <span>10.5%</span>
            <span>15.0%</span>
          </div>
        </div>

        {/* Tenure Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink/70">Loan Tenure</span>
            <span className="font-montreal font-bold text-sm text-ink">
              {tenureYears} Years ({tenureYears * 12} Months)
            </span>
          </div>
          <Slider
            min={1}
            max={30}
            step={1}
            value={[tenureYears]}
            onValueChange={(vals) => setTenureYears(vals[0])}
          />
          <div className="flex justify-between text-[10px] text-ink/40">
            <span>1 Year</span>
            <span>15 Years</span>
            <span>30 Years</span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="p-4 rounded-sm bg-cream border border-sand space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs uppercase font-semibold tracking-wider text-ink/70">
            Estimated Monthly EMI
          </span>
          <span className="font-montreal font-bold text-2xl text-brick">
            ₹{breakdown.monthlyEmi.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-ink/60">/mo</span>
          </span>
        </div>

        {/* Principal vs Interest Visual Bar */}
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-sm overflow-hidden flex bg-sand">
            <div
              className="bg-brick transition-all duration-300"
              style={{ width: `${breakdown.principalPercentage}%` }}
              title={`Principal: ${breakdown.principalPercentage}%`}
            />
            <div
              className="bg-ink transition-all duration-300"
              style={{ width: `${breakdown.interestPercentage}%` }}
              title={`Interest: ${breakdown.interestPercentage}%`}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-ink/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-brick" />
              <span>Principal: <strong>{formatPrice(breakdown.principal)}</strong> ({breakdown.principalPercentage}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-ink" />
              <span>Interest: <strong>{formatPrice(breakdown.totalInterest)}</strong> ({breakdown.interestPercentage}%)</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-sand/60 flex items-center justify-between text-xs text-ink/70">
          <span>Total Payable Amount:</span>
          <span className="font-montreal font-bold text-ink">
            {formatPrice(breakdown.totalPayment)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-1 text-[11px] text-ink/60">
          <ShieldCheck className="w-3.5 h-3.5 text-success" />
          <span>Rates benchmarked against RBI Repo Linked Lending Rate (RLLR)</span>
        </div>
      </div>
    </div>
  );
}

