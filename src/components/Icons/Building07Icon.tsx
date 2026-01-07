import type { CSSProperties } from 'react';

export interface Building07IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Building07Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Building07IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M2 21H22M6 21V11L12 6L18 11V21M10 21V17H14V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
