import type { CSSProperties } from 'react';

export interface Beaker02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Beaker02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Beaker02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 3H16M8 3V10L3 19C2.5 20 3.2 21 4.5 21H19.5C20.8 21 21.5 20 21 19L16 10V3M8 3H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
