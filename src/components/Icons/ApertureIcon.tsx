import type { CSSProperties } from 'react';

export interface ApertureIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ApertureIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ApertureIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.31 8L20.05 17.94M9.69 8H21.17M7.38 12L13.12 2.06M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12L10.88 21.94" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
