import type { CSSProperties } from 'react';

export interface SkipForwardIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SkipForwardIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SkipForwardIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 4L15 12L5 20V4ZM19 5V19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
