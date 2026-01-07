import type { CSSProperties } from 'react';

export interface UploadIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Upload icon (arrow pointing up)
 * Used in: BackgroundTasksCard, Upload
 */
export function UploadIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: UploadIconProps) {
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
        d="M12 16V4M12 4L8 8M12 4L16 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
