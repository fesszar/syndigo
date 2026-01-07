import type { CSSProperties } from 'react';

export interface ChevronUpIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ChevronUpIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ChevronUpIconProps) {
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
        d="M18 15L12 9L6 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
