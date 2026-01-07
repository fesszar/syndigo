import type { CSSProperties } from 'react';

export interface ChevronLeftIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ChevronLeftIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ChevronLeftIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
