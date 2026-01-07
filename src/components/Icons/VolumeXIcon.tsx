import type { CSSProperties } from 'react';

export interface VolumeXIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function VolumeXIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: VolumeXIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M11 5L6 9H2V15H6L11 19V5ZM23 9L17 15M17 9L23 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
