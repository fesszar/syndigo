import type { CSSProperties } from 'react';

export interface VideoOffIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function VideoOffIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: VideoOffIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16 16V12L23 17V7L16 12M1 1L23 23M3.27 3.27C2.79 3.66 2.5 4.29 2.5 5V17C2.5 17.5304 2.71071 18.0391 3.08579 18.4142C3.46086 18.7893 3.96957 19 4.5 19H17C17.71 19 18.35 18.64 18.73 18.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
