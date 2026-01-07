import type { CSSProperties } from 'react';

export interface MinusIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MinusIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MinusIconProps) {
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
        d="M5 12H19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
