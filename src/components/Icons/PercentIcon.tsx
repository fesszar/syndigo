import type { CSSProperties } from 'react';

export interface PercentIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PercentIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PercentIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M19 5L5 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="6.5" r="2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.5" cy="17.5" r="2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
