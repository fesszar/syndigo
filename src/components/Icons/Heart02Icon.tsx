import type { CSSProperties } from 'react';

export interface Heart02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Heart02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Heart02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
