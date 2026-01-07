import type { CSSProperties } from 'react';

export interface Cloud03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Cloud03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Cloud03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18 10C19.6569 10 21 11.3431 21 13C21 14.6569 19.6569 16 18 16H6C4.34315 16 3 14.6569 3 13C3 11.3431 4.34315 10 6 10M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
