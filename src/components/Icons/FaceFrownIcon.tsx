import type { CSSProperties } from 'react';

export interface FaceFrownIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FaceFrownIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FaceFrownIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16C15.5 14.5 14 13 12 13C10 13 8.5 14.5 8 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9H9.01M15 9H15.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
