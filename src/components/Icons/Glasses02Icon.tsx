import type { CSSProperties } from 'react';

export interface Glasses02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Glasses02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Glasses02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 14C8 15.6569 6.65685 17 5 17C3.34315 17 2 15.6569 2 14C2 12.3431 3.34315 11 5 11C6.65685 11 8 12.3431 8 14ZM8 14H16M16 14C16 15.6569 17.3431 17 19 17C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11C17.3431 11 16 12.3431 16 14ZM5 11L3 7M19 11L21 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
