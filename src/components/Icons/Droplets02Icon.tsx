import type { CSSProperties } from 'react';

export interface Droplets02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Droplets02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Droplets02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M7 16.3C7.53 17.2 8.27 17.93 9.16 18.43C10.05 18.93 11.06 19.2 12.1 19.2C13.14 19.2 14.15 18.93 15.04 18.43C15.93 17.93 16.67 17.2 17.2 16.3M12 2L6.65 9.35C5.9 10.42 5.49 11.7 5.49 13.02C5.49 14.34 5.9 15.62 6.65 16.69C7.4 17.76 8.46 18.57 9.68 19.02C10.9 19.47 12.23 19.54 13.49 19.23C14.75 18.92 15.89 18.23 16.77 17.26C17.65 16.29 18.22 15.08 18.42 13.8C18.62 12.52 18.44 11.2 17.91 10.03C17.38 8.86 16.52 7.89 15.45 7.24L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
