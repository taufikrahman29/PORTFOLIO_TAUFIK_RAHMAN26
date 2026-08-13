'use client';

import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
  size?: number;
}

export function IconRenderer({ name, className = 'w-5 h-5', size = 20, ...props }: IconProps) {
  // @ts-ignore
  const LucideIcon = Icons[name] || Icons.Code;
  return <LucideIcon className={className} size={size} {...props} />;
}
