import type { CSSProperties } from 'react';

export interface TypeIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function TypeIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: TypeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 7V4H20V7M9 20H15M12 4V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
