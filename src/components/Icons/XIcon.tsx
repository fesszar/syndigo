import type { CSSProperties } from 'react';

export interface XIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function XIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: XIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
