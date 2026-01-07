import type { CSSProperties } from 'react';

export interface BarChartIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function BarChartIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: BarChartIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 20V10M18 20V4M6 20V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
