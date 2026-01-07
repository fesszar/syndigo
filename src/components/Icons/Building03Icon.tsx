import type { CSSProperties } from 'react';

export interface Building03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Building03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Building03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M3 21H21M4 21V6L12 2L20 6V21M9 21V12H15V21M9 6H15M9 9H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
