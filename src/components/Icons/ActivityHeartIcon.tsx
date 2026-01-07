import type { CSSProperties } from 'react';

export interface ActivityHeartIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ActivityHeartIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ActivityHeartIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12H7L10 9L14 15L17 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
