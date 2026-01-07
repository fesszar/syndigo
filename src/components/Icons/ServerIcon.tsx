import type { CSSProperties } from 'react';

export interface ServerIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ServerIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ServerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="2" y="2" width="20" height="8" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="14" width="20" height="8" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6H6.01M6 18H6.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
