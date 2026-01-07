import type { CSSProperties } from 'react';

export interface DownloadIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Download icon (arrow pointing down)
 * Used in: BackgroundTasksCard, Upload
 */
export function DownloadIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: DownloadIconProps) {
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
        d="M12 4V16M12 16L8 12M12 16L16 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
