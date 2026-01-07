import type { CSSProperties } from 'react';

export interface RewindIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function RewindIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: RewindIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M11 19L2 12L11 5V19ZM22 19L13 12L22 5V19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
