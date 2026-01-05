import type { CSSProperties } from 'react';

export interface WarningCircleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Warning circle icon (filled circle with "!")
 * Used in: Toast (critical type)
 */
export function WarningCircleIcon({
  size = 24,
  color = '#db3a3a',
  className,
  style,
}: WarningCircleIconProps) {
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
        d="M12 8V12M12 16H12.01"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
