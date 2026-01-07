import type { CSSProperties } from 'react';

export interface CircleIconProps {
  size?: number;
  color?: string;
  fill?: string;
  className?: string;
  style?: CSSProperties;
}

export function CircleIcon({
  size = 24,
  color = '#718094',
  fill = 'none',
  className,
  style,
}: CircleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
