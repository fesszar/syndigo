import type { CSSProperties } from 'react';

export interface SlidersIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SlidersIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SlidersIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14H7M9 8H15M17 16H23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
