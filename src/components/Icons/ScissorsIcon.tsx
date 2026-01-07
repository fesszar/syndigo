import type { CSSProperties } from 'react';

export interface ScissorsIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ScissorsIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ScissorsIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
