import type { CSSProperties } from 'react';

export interface PauseIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PauseIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PauseIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="6" y="4" width="4" height="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="4" width="4" height="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
