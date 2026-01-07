import type { CSSProperties } from 'react';

export interface CloudSun01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudSun01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudSun01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2V4M4.93 4.93L6.34 6.34M2 12H4M4.93 19.07L6.34 17.66M12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 15.7614 9.23858 18 12 18ZM12 22V20M19.07 19.07L17.66 17.66M22 12H20M19.07 4.93L17.66 6.34" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
