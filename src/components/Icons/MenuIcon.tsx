import type { CSSProperties } from 'react';

export interface MenuIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MenuIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MenuIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 12H21M3 6H21M3 18H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
