import type { CSSProperties } from 'react';

export interface FilterIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FilterIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FilterIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
