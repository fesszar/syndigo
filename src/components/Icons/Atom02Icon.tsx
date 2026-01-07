import type { CSSProperties } from 'react';

export interface Atom02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Atom02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Atom02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
