import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium transition-colors border',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-ink text-white',
        brick: 'border-brick/30 bg-brick/10 text-brick font-semibold',
        secondary: 'border-sand bg-sand-light text-ink',
        outline: 'border-sand text-ink bg-white',
        success: 'border-success/30 bg-success/10 text-success font-semibold',
        danger: 'border-danger/30 bg-danger/10 text-danger font-semibold',
        dark: 'border-stone-700 bg-dark text-cream',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

