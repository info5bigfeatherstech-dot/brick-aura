'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionShell } from '@/components/shared/SectionShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle2, ShieldCheck, Upload } from 'lucide-react';

export default function PostPropertyPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SectionShell
      eyebrow="Owner & Builder Desk"
      title="Post Property for Free"
      subtitle="Reach 2.4 Lakh+ verified home buyers and tenants without brokerage commissions."
      actions={
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Button>
        </Link>
      }
      variant="cream"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-sm border border-sand p-6 sm:p-10 shadow-md">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto text-success">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-montreal font-bold text-2xl text-ink">
              Property Submitted Successfully!
            </h3>
            <p className="text-sm text-ink/70 max-w-md mx-auto">
              Our compliance team will verify your property credentials and activate the listing on BrickAura within 30 minutes.
            </p>
            <Link href="/" className="inline-block pt-4">
              <Button variant="default">Return to Home Page</Button>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink/80">Property Title</label>
              <Input placeholder="e.g. 3BHK Corner Apartment with Park View" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink/80">City</label>
                <Input placeholder="e.g. Gurugram" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink/80">Locality</label>
                <Input placeholder="e.g. Golf Course Extension" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink/80">Expected Price (in ₹)</label>
                <Input type="number" placeholder="e.g. 15000000" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink/80">Super Area (sq.ft)</label>
                <Input type="number" placeholder="e.g. 1850" required />
              </div>
            </div>

            <div className="p-6 border border-dashed border-sand rounded-sm bg-cream/30 text-center space-y-2 cursor-pointer hover:border-brick transition-colors">
              <Upload className="w-8 h-8 text-brick mx-auto" />
              <div className="text-xs font-medium text-ink">Drag and drop high-resolution photos here</div>
              <div className="text-[10px] text-ink/50">PNG, JPG up to 10MB each</div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="default" size="lg" className="w-full font-semibold">
                Submit Property for Free Verification
              </Button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-ink/60 justify-center">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>100% Free. No hidden platform charges or brokerage.</span>
            </div>
          </form>
        )}
      </div>
    </SectionShell>
  );
}

