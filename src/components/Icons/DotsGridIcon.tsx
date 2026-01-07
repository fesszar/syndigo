import type { CSSProperties } from 'react';

export interface DotsGridIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function DotsGridIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: DotsGridIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="4" cy="4" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="4" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="4" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="4" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="4" cy="20" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="20" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
