import type { CSSProperties } from 'react';

export interface XSquareIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function XSquareIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: XSquareIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9L15 15M15 9L9 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
