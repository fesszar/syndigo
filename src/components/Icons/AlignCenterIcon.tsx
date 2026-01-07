import type { CSSProperties } from 'react';

export interface AlignCenterIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AlignCenterIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: AlignCenterIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M18 10H6M21 6H3M21 14H3M18 18H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
