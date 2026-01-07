import type { CSSProperties } from 'react';

export interface Download02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Download02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Download02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21 21H3M18 11L12 17M12 17L6 11M12 17V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
