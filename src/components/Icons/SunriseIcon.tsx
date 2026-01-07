import type { CSSProperties } from 'react';

export interface SunriseIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SunriseIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SunriseIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M17 18C17 16.6739 16.4732 15.4021 15.5355 14.4645C14.5979 13.5268 13.3261 13 12 13C10.6739 13 9.40215 13.5268 8.46447 14.4645C7.52678 15.4021 7 16.6739 7 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2V9M4.22 10.22L5.64 11.64M1 18H3M21 18H23M18.36 11.64L19.78 10.22M23 22H1M8 6L12 2L16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
