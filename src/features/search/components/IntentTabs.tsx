'use client';

import React from 'react';
import { useSearchStore } from '../store';
import { IntentType } from '../types';
import { cn } from '@/lib/utils';
import { Home, Key, Sparkles, Briefcase, Landmark, Building2 } from 'lucide-react';

interface IntentTabOption {
  label: string;
  value: IntentType;
  icon: React.ElementType;
}

const INTENT_TABS: IntentTabOption[] = [
  { label: 'Buy Properties', value: 'buy', icon: Home },
  { label: 'Rent Homes', value: 'rent', icon: Key },
  { label: 'New Launch', value: 'new-launch', icon: Sparkles },
  { label: 'Commercial', value: 'commercial', icon: Briefcase },
  { label: 'Plots / Land', value: 'plots', icon: Landmark },
  { label: 'Township Projects', value: 'projects', icon: Building2 },
];

export function IntentTabs() {
  const { intent, setIntent } = useSearchStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {INTENT_TABS.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = intent === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => setIntent(tab.value)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap border select-none',
              isActive
                ? 'bg-brick text-white border-brick shadow-xs'
                : 'bg-white text-ink border-sand hover:border-brick hover:bg-cream'
            )}
          >
            <IconComponent className={cn('w-4 h-4', isActive ? 'text-white' : 'text-brick')} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

