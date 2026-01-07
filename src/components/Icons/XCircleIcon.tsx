import type { CSSProperties } from 'react';

export interface XCircleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function XCircleIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: XCircleIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 9L9 15M9 9L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
