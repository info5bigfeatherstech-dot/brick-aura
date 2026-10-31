'use client';

import React from 'react';
import { SectionShell } from '@/components/shared/SectionShell';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFaqs } from '../hooks/useContent';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FaqSection() {
  const { data: faqs } = useFaqs();

  const faqItems = faqs || [];

  // Generate Google Schema JSON-LD for FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <SectionShell
      id="faq"
      eyebrow="Clear Clarifications"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about RERA safeguards, zero brokerage policies, listing validation, and home loans on BrickAura."
      variant="white"
    >
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <Accordion type="single" collapsible defaultValue="faq-1" className="w-full">
          {faqItems.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-sand py-1">
              <AccordionTrigger className="text-sm sm:text-base font-montreal font-semibold text-ink hover:text-brick py-4">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-[10px] font-bold text-brick bg-brick/10 px-2 py-0.5 rounded-xs uppercase tracking-wider shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-ink/75 leading-relaxed pl-1 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still have questions block */}
        <div className="p-6 rounded-sm bg-cream border border-sand flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white border border-sand flex items-center justify-center text-brick shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-montreal font-bold text-sm text-ink">
                Have a specific question about property titles or stamp duty?
              </h4>
              <p className="text-xs text-ink/60">
                Our property compliance desk is available Monday through Sunday.
              </p>
            </div>
          </div>

          <Link href="/help">
            <Button variant="outline" size="sm" className="shrink-0 font-medium">
              Contact Compliance Desk
            </Button>
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

