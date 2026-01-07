import type { CSSProperties } from 'react';

export interface CompassIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CompassIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CompassIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
