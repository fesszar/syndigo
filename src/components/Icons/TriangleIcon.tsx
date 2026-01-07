import type { CSSProperties } from 'react';

export interface TriangleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TriangleIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TriangleIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.66 1.55 19.02C1.55 19.38 1.65 19.73 1.82 20.04C2 20.35 2.25 20.61 2.55 20.79C2.86 20.97 3.2 21.07 3.56 21.07H20.49C20.85 21.07 21.2 20.97 21.5 20.79C21.8 20.61 22.05 20.35 22.23 20.04C22.41 19.73 22.5 19.38 22.5 19.02C22.5 18.66 22.4 18.31 22.22 18L13.75 3.86C13.57 3.55 13.31 3.29 13 3.11C12.69 2.93 12.35 2.83 12 2.83C11.65 2.83 11.31 2.93 11 3.11C10.69 3.29 10.44 3.55 10.29 3.86Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
