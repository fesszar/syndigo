import type { CSSProperties } from 'react';

export interface CheckDone01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CheckDone01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CheckDone01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 6L9 17L4 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12L9 23L4 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
