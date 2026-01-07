import type { CSSProperties } from 'react';

export interface SidebarIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function SidebarIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: SidebarIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
