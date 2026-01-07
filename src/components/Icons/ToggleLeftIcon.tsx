import type { CSSProperties } from 'react';

export interface ToggleLeftIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ToggleLeftIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ToggleLeftIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="1" y="5" width="22" height="14" rx="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
