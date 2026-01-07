import type { CSSProperties } from 'react';

export interface ChevronDownIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ChevronDownIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ChevronDownIconProps) {
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
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
