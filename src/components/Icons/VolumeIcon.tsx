import type { CSSProperties } from 'react';

export interface VolumeIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function VolumeIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: VolumeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
