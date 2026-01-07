import type { CSSProperties } from 'react';

export interface ZapIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ZapIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ZapIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
