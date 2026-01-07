import type { CSSProperties } from 'react';

export interface GraduationHat01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function GraduationHat01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: GraduationHat01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 10V16.2C5 16.48 5 16.62 5.05 16.74C5.09 16.85 5.16 16.94 5.25 17.01C5.35 17.09 5.48 17.13 5.75 17.19L11.25 18.5C11.54 18.57 11.68 18.6 11.82 18.62C11.94 18.64 12.06 18.64 12.18 18.62C12.32 18.6 12.46 18.57 12.75 18.5L18.25 17.19C18.52 17.13 18.65 17.09 18.75 17.01C18.84 16.94 18.91 16.85 18.95 16.74C19 16.62 19 16.48 19 16.2V10M2 8.5L11.44 4.2C11.65 4.11 11.76 4.07 11.87 4.05C11.96 4.04 12.04 4.04 12.13 4.05C12.24 4.07 12.35 4.11 12.56 4.2L22 8.5L12.56 12.8C12.35 12.89 12.24 12.93 12.13 12.95C12.04 12.96 11.96 12.96 11.87 12.95C11.76 12.93 11.65 12.89 11.44 12.8L2 8.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
