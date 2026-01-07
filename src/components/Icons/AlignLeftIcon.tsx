import type { CSSProperties } from 'react';

export interface AlignLeftIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AlignLeftIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: AlignLeftIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M17 10H3M21 6H3M21 14H3M17 18H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
