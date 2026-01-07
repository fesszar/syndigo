import type { CSSProperties } from 'react';

export interface HashIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function HashIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: HashIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M4 9H20M4 15H20M10 3L8 21M16 3L14 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
