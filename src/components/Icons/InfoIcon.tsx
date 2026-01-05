import type { CSSProperties } from 'react';

export interface InfoIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Info icon (filled circle with "i")
 * Used in: Toast (info type)
 */
export function InfoIcon({
  size = 24,
  color = '#2d75e2',
  className,
  style,
}: InfoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="9.5" fill={color} />
      <path
        d="M12 16V12M12 8H12.01"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
