import type { CSSProperties } from 'react';

export interface EditIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Edit/Pencil icon
 * Used in: BackgroundTasksCard (bulk edit tasks)
 */
export function EditIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: EditIconProps) {
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
        d="M15 6L18 9M6 18L9 15L18 6L15 3L6 12L3 21L12 18L15 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
