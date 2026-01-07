import type { CSSProperties } from 'react';

export interface PackageXIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Package with X icon
 * Used in: BackgroundTasksCard (failed states)
 */
export function PackageXIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PackageXIconProps) {
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
      <path d="M9 11L15 17M15 11L9 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
