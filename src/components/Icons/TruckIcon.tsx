import type { CSSProperties } from 'react';

export interface TruckIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TruckIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TruckIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16 3H1V16H16V3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8H20L23 11V16H16V8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
