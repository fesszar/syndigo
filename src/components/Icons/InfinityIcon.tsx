import type { CSSProperties } from 'react';

export interface InfinityIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function InfinityIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: InfinityIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18.1777 8C23.2737 8 23.2737 16 18.1777 16C13.0817 16 10.0367 8 5.82269 8C0.726687 8 0.726687 16 5.82269 16C10.0367 16 13.0817 8 18.1777 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
