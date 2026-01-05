import type { CSSProperties } from 'react';

export interface ChevronRightIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Chevron right icon (for separators)
 * Used in: Stepper
 */
export function ChevronRightIcon({
  size = 11,
  color = '#718094',
  className,
  style,
}: ChevronRightIconProps) {
  const width = Math.round(size * 0.36); // 4/11 ratio
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 4 11"
      fill="none"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <path
        d="M1 1L3 5.5L1 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
