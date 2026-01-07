import type { CSSProperties } from 'react';

export interface ShuffleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ShuffleIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ShuffleIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16 3H21V8M4 20L21 3M21 16V21H16M15 15L21 21M4 4L9 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
