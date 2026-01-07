import type { CSSProperties } from 'react';

export interface ListIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ListIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ListIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
