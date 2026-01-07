import type { CSSProperties } from 'react';

export interface MoreVerticalIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MoreVerticalIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MoreVerticalIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="5" r="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="19" r="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
