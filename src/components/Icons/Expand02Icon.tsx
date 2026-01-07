import type { CSSProperties } from 'react';

export interface Expand02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Expand02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Expand02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 21V16M3 21H8M3 21L10 14M21 3V8M21 3H16M21 3L14 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
