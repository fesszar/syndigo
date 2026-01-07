import type { CSSProperties } from 'react';

export interface Copy04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Copy04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Copy04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 9V4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21071 18.5304 2 18 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H9M15 22H20C20.5523 22 21 21.5523 21 21V15M18 12L12 18M12 18H18M12 18V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
