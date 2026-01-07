import type { CSSProperties } from 'react';

export interface PackagePlusIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Package with plus icon
 * Used in: BackgroundTasksCard (upload tasks)
 */
export function PackagePlusIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PackagePlusIconProps) {
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
        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12V21M12 12L4 7.5M12 12L20 7.5" stroke={color} strokeWidth="1.5" />
      <path d="M16 5.25L8 9.75" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
