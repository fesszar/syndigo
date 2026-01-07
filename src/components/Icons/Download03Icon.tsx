import type { CSSProperties } from 'react';

export interface Download03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Download03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Download03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 12L12 16M12 16L16 12M12 16V4M6 20H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
