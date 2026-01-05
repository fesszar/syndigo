import type { CSSProperties } from 'react';

export interface LayoutIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Layout/panel icon
 * Used in: TabHeader (trailing action)
 */
export function LayoutIcon({
  size = 20,
  color = '#718094',
  className,
  style,
}: LayoutIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="12.5" y="2.5" width="5" height="15" fill={color} />
      <rect
        x="2.5"
        y="2.5"
        width="15"
        height="15"
        stroke={color}
        strokeWidth="1.5"
        rx="1"
        fill="none"
      />
    </svg>
  );
}
