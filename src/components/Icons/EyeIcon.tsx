import type { CSSProperties } from 'react';

export interface EyeIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function EyeIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: EyeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
