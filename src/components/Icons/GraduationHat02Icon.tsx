import type { CSSProperties } from 'react';

export interface GraduationHat02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function GraduationHat02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: GraduationHat02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 10V16.2C4 16.48 4 16.62 4.05 16.74C4.09 16.85 4.16 16.94 4.25 17.01C4.35 17.09 4.48 17.13 4.75 17.19L11.25 18.8C11.54 18.87 11.68 18.9 11.82 18.92C11.94 18.94 12.06 18.94 12.18 18.92C12.32 18.9 12.46 18.87 12.75 18.8L19.25 17.19C19.52 17.13 19.65 17.09 19.75 17.01C19.84 16.94 19.91 16.85 19.95 16.74C20 16.62 20 16.48 20 16.2V10M22 20V8.5L12.56 4.2C12.35 4.11 12.24 4.07 12.13 4.05C12.04 4.04 11.96 4.04 11.87 4.05C11.76 4.07 11.65 4.11 11.44 4.2L2 8.5L11.44 12.8C11.65 12.89 11.76 12.93 11.87 12.95C11.96 12.96 12.04 12.96 12.13 12.95C12.24 12.93 12.35 12.89 12.56 12.8L22 8.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
