import type { CSSProperties } from 'react';

export interface ZoomOutIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ZoomOutIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ZoomOutIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 21L16.65 16.65M8 11H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
