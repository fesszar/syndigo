import type { CSSProperties } from 'react';

export interface MonitorIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MonitorIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MonitorIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 21H16M12 17V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
