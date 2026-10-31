'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Key, Plus, Building, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomTabBar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Buy', href: '/buy', icon: Home },
    { label: 'Rent', href: '/rent', icon: Key },
    { label: 'Post', href: '/post-property', isCenter: true },
    { label: 'Projects', href: '/projects', icon: Building },
    { label: 'Account', href: '/login', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-sand shadow-[0_-2px_10px_rgba(0,0,0,0.05)] safe-area-bottom"
    >
      <div className="grid grid-cols-5 h-16 items-center px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <div key={item.label} className="relative flex justify-center items-center">
                <Link
                  href={item.href}
                  className="absolute -top-5 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-brick text-white shadow-lg hover:bg-brick-hover transition-transform duration-150 active:scale-95 border-2 border-white focus:outline-none focus:ring-2 focus:ring-brick"
                  aria-label="Post Property Free"
                >
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </Link>
                <span className="text-[10px] font-semibold text-brick mt-6">Post FREE</span>
              </div>
            );
          }

          const IconComponent = item.icon!;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 transition-colors select-none',
                isActive ? 'text-brick' : 'text-ink/70 hover:text-brick'
              )}
            >
              <IconComponent className={cn('w-5 h-5 mb-0.5', isActive ? 'stroke-[2.2]' : 'stroke-[1.6]')} />
              <span className={cn('text-[10px] tracking-tight', isActive ? 'font-semibold' : 'font-medium')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

