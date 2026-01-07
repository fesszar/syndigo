import type { CSSProperties } from 'react';

export interface WifiOffIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function WifiOffIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: WifiOffIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M1 1L23 23M16.72 11.06C17.3949 11.3345 18.0255 11.709 18.59 12.17M5 12.55C5.96417 11.6167 7.09579 10.8804 8.33 10.38M10.71 5.05C14.5652 4.43655 18.5065 5.2094 21.64 7.18M8.41 9.12C8.35 9.16 8.29 9.2 8.23 9.24M1.42 9C2.45 8 3.61 7.14 4.87 6.43M12 20H12.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
