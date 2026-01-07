import type { CSSProperties } from 'react';

export interface Expand05IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Expand05Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Expand05IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 14V20M4 20H10M4 20L10 14M20 10V4M20 4H14M20 4L14 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
