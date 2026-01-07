import type { CSSProperties } from 'react';

export interface Copy06IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Copy06Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Copy06IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8 16V8H16M8 16H16V8M8 16V20C8 20.5304 8.21071 21.0391 8.58579 21.4142C8.96086 21.7893 9.46957 22 10 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V10C22 9.46957 21.7893 8.96086 21.4142 8.58579C21.0391 8.21071 20.5304 8 20 8H16M8 8V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V8M2 14C2 13.4696 2.21071 12.9609 2.58579 12.5858C2.96086 12.2107 3.46957 12 4 12H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
