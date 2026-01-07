import type { CSSProperties } from 'react';

export interface ArrowLeftIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ArrowLeftIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ArrowLeftIconProps) {
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
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
