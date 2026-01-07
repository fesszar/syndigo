import type { CSSProperties } from 'react';

export interface ShieldOffIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ShieldOffIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ShieldOffIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M19.69 14C20.22 12.5 20.5 10.8 20.5 9V4L12 1L7.5 2.75M1 1L23 23M4.73 8.11V12C4.73 18 12 22 12 22C14 20.75 16.25 18.5 17.75 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
