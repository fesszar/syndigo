import type { CSSProperties } from 'react';

export interface CheckDone02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CheckDone02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CheckDone02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18 6L7 17L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10L11 21L9 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
