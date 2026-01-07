import type { CSSProperties } from 'react';

export interface Lightbulb04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Lightbulb04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Lightbulb04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9.5 22H14.5M9.5 18H14.5M15 14H9C9 14 9 13 10 11.5C11 10 12 9 12 9C12 9 13 10 14 11.5C15 13 15 14 15 14ZM12 2V5M19 5L17 7M22 12H19M5 5L7 7M2 12H5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
