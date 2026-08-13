'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20',
      gradient: 'bg-gradient-to-r from-primary via-indigo-600 to-accent text-white shadow-lg shadow-primary/25 hover:opacity-95 hover:shadow-primary/40',
      outline: 'border border-border/80 bg-background/50 hover:bg-muted text-foreground hover:border-primary/50',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-muted text-foreground hover:text-primary',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 text-sm rounded-lg',
      lg: 'h-12 px-6 text-base rounded-xl',
      icon: 'h-10 w-10 rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
