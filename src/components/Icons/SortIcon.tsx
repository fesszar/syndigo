import type { CSSProperties } from 'react';

export interface SortIconProps {
  size?: number;
  color?: string;
  direction?: 'asc' | 'desc' | null;
  className?: string;
  style?: CSSProperties;
}

/**
 * Sort icon (up/down arrows)
 * Used in: Table (sortable columns)
 */
export function SortIcon({
  size = 14,
  color = '#718094',
  direction = null,
  className,
  style,
}: SortIconProps) {
  const upColor = direction === 'asc' ? 'var(--color-blue-500, #2d75e2)' : color;
  const downColor = direction === 'desc' ? 'var(--color-blue-500, #2d75e2)' : color;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M7 2L10 5H4L7 2Z" fill={upColor} />
      <path d="M7 12L4 9H10L7 12Z" fill={downColor} />
    </svg>
  );
}
