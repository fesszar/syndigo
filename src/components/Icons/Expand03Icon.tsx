import type { CSSProperties } from 'react';

export interface Expand03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Expand03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Expand03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3H8M3 3V8M16 16L21 21M21 21H16M21 21V16M8 16L3 21M3 21H8M3 21V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
