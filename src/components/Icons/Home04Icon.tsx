import type { CSSProperties } from 'react';

export interface Home04IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Home04Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Home04IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM12 15V21M21 12L19.3 10.2C18.7 9.6 18.4 9.3 18.05 9.1C17.74 8.92 17.4 8.8 17.04 8.74C16.64 8.68 16.22 8.74 15.38 8.88L3 11M12 3L3 11V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V11L12 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
