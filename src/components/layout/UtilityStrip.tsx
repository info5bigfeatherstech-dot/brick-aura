'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Smartphone, Globe, User } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function UtilityStrip() {
  return (
    <div className="hidden lg:block bg-cream border-b border-sand py-1.5 text-xs text-ink/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Support Phone + App Download */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.contact.tollFree}`}
            className="inline-flex items-center gap-1.5 hover:text-brick transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brick" />
            <span className="font-medium">Toll Free:</span>
            <span>{siteConfig.contact.tollFree}</span>
            <span className="text-[10px] text-ink/50">({siteConfig.contact.hours})</span>
          </a>

          <Link
            href="/download-app"
            className="inline-flex items-center gap-1.5 hover:text-brick transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-brick" />
            <span>Download Mobile App</span>
          </Link>
        </div>

        {/* Right: Language + Login/Register */}
        <div className="flex items-center gap-6">
          <div className="inline-flex items-center gap-1.5 cursor-pointer hover:text-brick transition-colors">
            <Globe className="w-3.5 h-3.5 text-ink/60" />
            <span>English (IN)</span>
          </div>

          <div className="h-3 w-px bg-sand-border" />

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-medium hover:text-brick transition-colors"
            >
              <User className="w-3.5 h-3.5 text-ink/60" />
              <span>Login</span>
            </Link>
            <span className="text-ink/40">/</span>
            <Link
              href="/register"
              className="font-medium hover:text-brick transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

