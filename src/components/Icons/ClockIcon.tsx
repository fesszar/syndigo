import type { CSSProperties } from 'react';

export interface ClockIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Clock icon
 * Used in: BackgroundTasksCard
 */
export function ClockIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ClockIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 6V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
