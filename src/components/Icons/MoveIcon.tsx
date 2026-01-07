import type { CSSProperties } from 'react';

export interface MoveIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MoveIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MoveIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 9L2 12L5 15M9 5L12 2L15 5M15 19L12 22L9 19M19 9L22 12L19 15M2 12H22M12 2V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
