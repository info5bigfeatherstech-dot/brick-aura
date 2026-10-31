'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUiStore } from '@/lib/ui-store';
import { FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export function BrochureModal() {
  const { brochureModalProject, closeBrochureModal } = useUiStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isOpen = !!brochureModalProject;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      closeBrochureModal();
    }, 2500);
  };

  if (!brochureModalProject) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBrochureModal()}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="space-y-1">
          <div className="w-10 h-10 rounded-sm bg-sand-light border border-sand flex items-center justify-center text-brick mb-2">
            <FileText className="w-5 h-5" />
          </div>
          <DialogTitle className="text-xl">Request Architectural Brochure</DialogTitle>
          <DialogDescription>
            {brochureModalProject.name} &bull; {brochureModalProject.builderName}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto text-success">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-montreal font-bold text-lg text-ink">
              Brochure Dispatched!
            </h4>
            <p className="text-xs text-ink/70 max-w-xs mx-auto">
              The complete floor plans, master layout, and pricing schedule have been sent to your WhatsApp and email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink/70">Full Name</label>
              <Input
                placeholder="e.g. Aditya Verma"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink/70">Mobile Number (WhatsApp)</label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink/70">Email Address</label>
              <Input
                type="email"
                placeholder="aditya@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="default" className="w-full h-11 font-semibold">
                Download PDF Brochure (Instant)
              </Button>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-ink/50 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-brick" />
              <span>Direct builder copy. Zero spam policy.</span>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

