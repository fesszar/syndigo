import type { CSSProperties } from 'react';

export interface RotateCcwIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function RotateCcwIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: RotateCcwIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M1 4V10H7M23 20V14H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 9C19.9828 7.56678 19.1209 6.28516 17.9845 5.27542C16.8482 4.26567 15.4745 3.56079 13.9917 3.22637C12.5089 2.89195 10.9652 2.93879 9.50481 3.36262C8.04437 3.78645 6.71475 4.57376 5.64 5.64L1 10M23 14L18.36 18.36C17.2853 19.4262 15.9556 20.2135 14.4952 20.6374C13.0348 21.0612 11.4911 21.1081 10.0083 20.7736C8.52547 20.4392 7.1518 19.7343 6.01547 18.7246C4.87913 17.7148 4.01717 16.4332 3.51 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
