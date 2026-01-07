import type { CSSProperties } from 'react';

export interface Award05IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Award05Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Award05IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8.67 14H4C3.45 14 3 13.55 3 13V4C3 3.45 3.45 3 4 3H20C20.55 3 21 3.45 21 4V13C21 13.55 20.55 14 20 14H15.33" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 21L16 14H8L12 21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
