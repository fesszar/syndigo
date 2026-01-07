import type { CSSProperties } from 'react';

export interface SendIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Send/Paper plane icon
 * Used in: BackgroundTasksCard (bulk publish)
 */
export function SendIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SendIconProps) {
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
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
