import type { CSSProperties } from 'react';

export interface Expand04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Expand04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Expand04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 14V20M20 20H14M20 20L14 14M4 10V4M4 4H10M4 4L10 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
