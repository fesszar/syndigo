import type { CSSProperties } from 'react';

export interface SkipBackIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SkipBackIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SkipBackIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M19 20L9 12L19 4V20ZM5 19V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
