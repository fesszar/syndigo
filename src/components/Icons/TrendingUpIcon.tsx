import type { CSSProperties } from 'react';

export interface TrendingUpIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TrendingUpIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TrendingUpIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
