import type { CSSProperties } from 'react';

export interface FrownIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FrownIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FrownIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16C15.5 15.3 14.07 14 12 14C9.93 14 8.5 15.3 8 16M9 9H9.01M15 9H15.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
