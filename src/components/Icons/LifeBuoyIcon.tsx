import type { CSSProperties } from 'react';

export interface LifeBuoyIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function LifeBuoyIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: LifeBuoyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.93 4.93L9.17 9.17M14.83 14.83L19.07 19.07M19.07 4.93L14.83 9.17M9.17 14.83L4.93 19.07" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
