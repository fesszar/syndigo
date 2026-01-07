import type { CSSProperties } from 'react';

export interface Expand06IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Expand06Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Expand06IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M15 4H20M20 4V9M20 4L13 11M9 20H4M4 20V15M4 20L11 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
