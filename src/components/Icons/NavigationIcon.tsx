import type { CSSProperties } from 'react';

export interface NavigationIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function NavigationIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: NavigationIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 11L22 2L13 21L11 13L3 11Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
