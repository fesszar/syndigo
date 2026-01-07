import type { CSSProperties } from 'react';

export interface FilmIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FilmIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FilmIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="2" y="2" width="20" height="20" rx="2.18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 2V22M17 2V22M2 12H22M2 7H7M2 17H7M17 17H22M17 7H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
