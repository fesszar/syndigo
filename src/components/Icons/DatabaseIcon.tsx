import type { CSSProperties } from 'react';

export interface DatabaseIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function DatabaseIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: DatabaseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12C21 13.66 17 15 12 15C7 15 3 13.66 3 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 5V19C3 20.66 7 22 12 22C17 22 21 20.66 21 19V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
