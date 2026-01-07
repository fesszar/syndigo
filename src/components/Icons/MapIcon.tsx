import type { CSSProperties } from 'react';

export interface MapIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MapIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MapIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 2V18M16 6V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
