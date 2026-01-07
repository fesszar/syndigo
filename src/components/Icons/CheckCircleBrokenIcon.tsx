import type { CSSProperties } from 'react';

export interface CheckCircleBrokenIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CheckCircleBrokenIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CheckCircleBrokenIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
