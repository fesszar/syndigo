import type { CSSProperties } from 'react';

export interface VideoIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function VideoIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: VideoIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M23 7L16 12L23 17V7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1" y="5" width="15" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
