import type { CSSProperties } from 'react';

export interface Asterisk02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Asterisk02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Asterisk02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 4V20M18 6L6 18M20 12H4M18 18L6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
