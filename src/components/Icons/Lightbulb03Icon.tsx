import type { CSSProperties } from 'react';

export interface Lightbulb03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Lightbulb03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Lightbulb03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9.5 22H14.5M9.5 18H14.5C14.5 18 16 16.5 16 13.5C16 10.5 14 9 12 9C10 9 8 10.5 8 13.5C8 16.5 9.5 18 9.5 18ZM12 2V5M19 5L17 7M22 12H19M5 5L7 7M2 12H5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
