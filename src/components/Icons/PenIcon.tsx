import type { CSSProperties } from 'react';

export interface PenIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PenIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PenIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2L9.586 9.586" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="11" r="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
