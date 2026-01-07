import type { CSSProperties } from 'react';

export interface BarChart2IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function BarChart2Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: BarChart2IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18 20V10M12 20V4M6 20V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
