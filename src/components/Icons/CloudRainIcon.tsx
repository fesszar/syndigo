import type { CSSProperties } from 'react';

export interface CloudRainIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudRainIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudRainIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16 13V21M8 13V21M12 15V23M20 16.58C21.22 15.93 22 14.61 22 13.13C22 11.03 20.21 9.33 18 9.33H17.32C16.61 5.51 13.11 2.67 9 2.67C4.03 2.67 0 6.66 0 11.58C0 14.98 1.93 17.94 4.77 19.4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
