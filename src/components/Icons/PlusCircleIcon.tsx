import type { CSSProperties } from 'react';

export interface PlusCircleIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PlusCircleIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PlusCircleIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8V16M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
