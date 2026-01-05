import type { CSSProperties } from 'react';

export interface WarningTriangleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Warning triangle icon (filled triangle with "!")
 * Used in: Toast (warning type)
 */
export function WarningTriangleIcon({
  size = 24,
  color = '#f58319',
  className,
  style,
}: WarningTriangleIconProps) {
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
        d="M12 2.25L2.25 21H21.75L12 2.25Z"
        fill={color}
      />
      <path
        d="M12 9V13M12 17H12.01"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
