import type { CSSProperties } from 'react';

export interface ArrowRightIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ArrowRightIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ArrowRightIconProps) {
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
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
