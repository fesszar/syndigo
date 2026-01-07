import type { CSSProperties } from 'react';

export interface ChromeIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ChromeIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ChromeIconProps) {
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
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.17 8H12M3.95 6.06L8.54 14M10.88 21.94L15.46 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
