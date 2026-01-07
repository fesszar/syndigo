import type { CSSProperties } from 'react';

export interface ZapOffIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ZapOffIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ZapOffIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12.41 6.75L13 2L10.57 4.92M18.57 12.91L21 10H15.66M8 8L3 14H12L11 22L16 16M1 1L23 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
