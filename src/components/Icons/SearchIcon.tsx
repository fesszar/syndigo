import type { CSSProperties } from 'react';

export interface SearchIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Search/Magnifying glass icon
 * Used in: SearchField, TopNavigation
 */
export function SearchIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.5" />
      <path d="M21 21L16.5 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
