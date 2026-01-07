import type { CSSProperties } from 'react';

export interface RotateCwIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function RotateCwIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: RotateCwIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M23 4V10H17M1 20V14H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 9C4.01717 7.56678 4.87913 6.28516 6.01547 5.27542C7.1518 4.26567 8.52547 3.56079 10.0083 3.22637C11.4911 2.89195 13.0348 2.93879 14.4952 3.36262C15.9556 3.78645 17.2853 4.57376 18.36 5.64L23 10M1 14L5.64 18.36C6.71475 19.4262 8.04437 20.2135 9.50481 20.6374C10.9652 21.0612 12.5089 21.1081 13.9917 20.7736C15.4745 20.4392 16.8482 19.7343 17.9845 18.7246C19.1209 17.7148 19.9828 16.4332 20.49 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
