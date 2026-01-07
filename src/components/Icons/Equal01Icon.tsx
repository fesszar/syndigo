import type { CSSProperties } from 'react';

export interface Equal01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Equal01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Equal01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 9H19M5 15H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
