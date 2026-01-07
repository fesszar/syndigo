import type { CSSProperties } from 'react';

export interface CheckVerified02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CheckVerified02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CheckVerified02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 12L11 14L15 10M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
