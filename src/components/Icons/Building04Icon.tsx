import type { CSSProperties } from 'react';

export interface Building04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Building04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Building04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 21H21M6 21V8L12 3L18 8V21M10 21V15H14V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
