import type { CSSProperties } from 'react';

export interface PlayIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PlayIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PlayIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 3L19 12L5 21V3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
