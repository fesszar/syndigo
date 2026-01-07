import type { CSSProperties } from 'react';

export interface WifiIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function WifiIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: WifiIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 12.55C6.97 10.59 9.41 9.5 12 9.5C14.59 9.5 17.03 10.59 19 12.55M8.53 16.11C9.48 15.15 10.72 14.64 12 14.64C13.28 14.64 14.52 15.15 15.47 16.11M1.42 9C4.34 6.11 8.09 4.5 12 4.5C15.91 4.5 19.66 6.11 22.58 9M12 20H12.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
