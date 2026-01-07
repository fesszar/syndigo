import type { CSSProperties } from 'react';

export interface Home03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Home03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Home03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 21V12H15V21M3 10L12 3L21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V10Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
