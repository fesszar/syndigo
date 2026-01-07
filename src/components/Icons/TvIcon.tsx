import type { CSSProperties } from 'react';

export interface TvIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TvIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TvIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="2" y="7" width="20" height="15" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 2L12 7L7 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
