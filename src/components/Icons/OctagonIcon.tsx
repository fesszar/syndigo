import type { CSSProperties } from 'react';

export interface OctagonIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function OctagonIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: OctagonIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
