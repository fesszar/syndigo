import type { CSSProperties } from 'react';

export interface HashtagIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function HashtagIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: HashtagIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9.49999 3L6.49999 21M17.5 3L14.5 21M20.5 8H3.5M19.5 16H2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
