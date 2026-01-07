import type { CSSProperties } from 'react';

export interface CloudSnowIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudSnowIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudSnowIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 17.58C21.22 16.93 22 15.61 22 14.13C22 12.03 20.21 10.33 18 10.33H17.32C16.61 6.51 13.11 3.67 9 3.67C4.03 3.67 0 7.66 0 12.58C0 15.98 1.93 18.94 4.77 20.4M8 16H8.01M8 20H8.01M12 18H12.01M12 22H12.01M16 16H16.01M16 20H16.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
