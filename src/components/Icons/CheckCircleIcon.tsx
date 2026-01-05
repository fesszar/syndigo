import type { CSSProperties } from 'react';

export interface CheckCircleIconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Check circle icon (filled circle with checkmark)
 * Used in: Toast (success type)
 */
export function CheckCircleIcon({
  size = 24,
  fillColor = '#e1fbf5',
  strokeColor = '#0e8662',
  className,
  style,
}: CheckCircleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="10" fill={fillColor} />
      <path
        d="M8 12L11 15L16 9"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
