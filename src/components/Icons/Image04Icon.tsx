import type { CSSProperties } from 'react';

export interface Image04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Image04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Image04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 22H20C21.1046 22 22 21.1046 22 20V8L17 2H7C5.89543 2 5 2.89543 5 4M5 4V13M5 4H1V20C1 21.1046 1.89543 22 3 22H6M17 22V10C17 8.89543 16.1046 8 15 8H9C7.89543 8 7 8.89543 7 10V22M12 12H11M12 16H11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
