import type { CSSProperties } from 'react';

export interface CalendarIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CalendarIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CalendarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2V6M8 2V6M3 10H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
