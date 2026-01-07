import type { CSSProperties } from 'react';

export interface TrendingDownIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TrendingDownIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TrendingDownIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M23 18L13.5 8.5L8.5 13.5L1 6M23 18H17M23 18V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
