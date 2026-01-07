import type { CSSProperties } from 'react';

export interface ActivityIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ActivityIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ActivityIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M22 12H18L15 21L9 3L6 12H2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
