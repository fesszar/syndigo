import type { CSSProperties } from 'react';

export interface Hexagon02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Hexagon02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Hexagon02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21.5 8.5V15.5L17 19L7 19L2.5 15.5V8.5L7 5H17L21.5 8.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
