import type { CSSProperties } from 'react';

export interface AlignRightIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AlignRightIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: AlignRightIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M21 10H7M21 6H3M21 14H3M21 18H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
