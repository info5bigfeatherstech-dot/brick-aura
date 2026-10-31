'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FOOTER_COLUMNS, POPULAR_SEARCH_TAGS } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { Send, CheckCircle2, ShieldCheck, Phone, Mail } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-dark text-cream border-t border-stone-800 transition-colors">
      {/* 1. Newsletter Strip */}
      <div className="border-b border-stone-800 bg-[#16181A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sand">
                Marketplace Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-montreal text-cream">
                Curated real estate intelligence, weekly.
              </h3>
              <p className="text-xs sm:text-sm text-cream/70">
                Join 85,000+ investors receiving price-trend analyses, RERA quarterly audits, and pre-launch notifications.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-success/15 border border-success/30 rounded-sm text-xs text-white">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  <span>Thank you for subscribing! Your weekly market digest is on its way.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate or personal email..."
                    required
                    className="bg-stone-900 border-stone-700 text-cream placeholder:text-stone-500 focus-visible:border-brick"
                  />
                  <Button type="submit" variant="default" className="shrink-0 gap-1.5 px-5">
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              )}
              <div className="flex items-center gap-2 mt-2 text-[11px] text-cream/50">
                <ShieldCheck className="w-3.5 h-3.5 text-sand" />
                <span>Zero spam. Strict adherence to Indian digital data protection standards.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body: Brand Block + 4 Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Info (2 columns span on large screens) */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="dark" size="lg" />
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed max-w-sm">
              BrickAura Properties is India&apos;s architectural property ecosystem, delivering verified residential developments, Grade-A commercial workplaces, and certified plotted investments.
            </p>

            <div className="space-y-2 text-xs text-cream/70">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brick shrink-0" />
                <span>Support: {siteConfig.contact.tollFree}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brick shrink-0" />
                <span>Email: {siteConfig.contact.supportEmail}</span>
              </div>
            </div>

            {/* Social Icons (Clean SVG Monograms) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-cream/80 hover:text-white hover:border-brick transition-colors"
                aria-label="X Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-cream/80 hover:text-white hover:border-brick transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-cream/80 hover:text-white hover:border-brick transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-sm bg-stone-900 border border-stone-800 flex items-center justify-center text-cream/80 hover:text-white hover:border-brick transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 4 Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-sand">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-cream/70 hover:text-sand transition-colors block leading-normal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Popular Searches SEO Link Band */}
        <div className="mt-14 pt-8 border-t border-stone-800 space-y-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-sand">
            Popular Real Estate Searches in India:
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-[11px] text-cream/60 hover:text-cream bg-stone-900 hover:bg-stone-800 border border-stone-800 px-2.5 py-1 rounded-sm transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* 4. Legal / Copyright Row */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-cream/50">
          <div>
            &copy; {new Date().getFullYear()} BrickAura Properties Technologies Private Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms of Use</Link>
            <Link href="/rera-disclaimer" className="hover:text-cream transition-colors">RERA Compliance Disclaimer</Link>
            <Link href="/security" className="hover:text-cream transition-colors">Security Audit</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
