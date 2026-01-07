import type { CSSProperties } from 'react';

export interface Volume1IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Volume1Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Volume1IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
