import type { CSSProperties } from 'react';

export interface ClockRefreshIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Clock with refresh arrow icon
 * Used in: BackgroundTasksCard (queued/workflow tasks)
 */
export function ClockRefreshIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ClockRefreshIconProps) {
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
      <path d="M20 12C20 7.58 16.42 4 12 4C9.5 4 7.27 5.12 5.75 6.88" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4V8H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
