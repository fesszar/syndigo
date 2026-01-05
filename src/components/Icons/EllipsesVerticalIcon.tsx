import type { CSSProperties } from 'react';

export interface EllipsesVerticalIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Vertical ellipses (three dots) menu icon
 * Used in: Tab (menu action)
 */
export function EllipsesVerticalIcon({
  size = 16,
  color = '#718094',
  className,
  style,
}: EllipsesVerticalIconProps) {
  const dotRadius = size * 0.09375; // 1.5/16 ratio
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="8" cy="3" r={dotRadius} fill={color} />
      <circle cx="8" cy="8" r={dotRadius} fill={color} />
      <circle cx="8" cy="13" r={dotRadius} fill={color} />
    </svg>
  );
}
