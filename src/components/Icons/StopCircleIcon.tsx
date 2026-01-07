import type { CSSProperties } from 'react';

export interface StopCircleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function StopCircleIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: StopCircleIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="9" width="6" height="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
