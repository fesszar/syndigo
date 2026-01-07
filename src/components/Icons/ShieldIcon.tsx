import type { CSSProperties } from 'react';

export interface ShieldIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ShieldIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ShieldIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
