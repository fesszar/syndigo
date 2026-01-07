import type { CSSProperties } from 'react';

export interface PlusIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Plus/Add icon
 * Used in: Various add buttons
 */
export function PlusIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PlusIconProps) {
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
        d="M12 5V19M5 12H19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
