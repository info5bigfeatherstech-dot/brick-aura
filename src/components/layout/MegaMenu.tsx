'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RESIDENTIAL_MEGA_MENU } from '@/config/navigation';
import { ChevronDown, Building2, Home, Castle, Layers, LayoutGrid, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Building2,
  Home,
  Castle,
  Layers,
  LayoutGrid,
  Sparkles,
};

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center gap-1 text-sm font-medium transition-colors py-2 focus:outline-none',
          isOpen ? 'text-brick' : 'text-ink hover:text-brick'
        )}
        aria-expanded={isOpen}
      >
        <span>All Residential</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-200',
            isOpen && 'rotate-180 text-brick'
          )}
        />
      </button>

      {/* Mega Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[680px] animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="bg-white rounded-sm border border-sand shadow-xl p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-3">
              {RESIDENTIAL_MEGA_MENU.map((item) => {
                const IconComponent = iconMap[item.iconName as keyof typeof iconMap] || Building2;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-start gap-3.5 p-3 rounded-sm border border-transparent hover:border-sand hover:bg-cream/60 transition-all duration-150"
                  >
                    <div className="w-9 h-9 rounded-sm bg-sand-light border border-sand flex items-center justify-center shrink-0 group-hover:bg-brick group-hover:text-white group-hover:border-brick transition-colors text-brick">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ink group-hover:text-brick transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] bg-sand/60 px-1.5 py-0.2 rounded-sm text-ink/70">
                          {item.count}
                        </span>
                      </div>
                      <p className="text-xs text-ink/60 line-clamp-1 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
