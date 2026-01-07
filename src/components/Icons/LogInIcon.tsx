import type { CSSProperties } from 'react';

export interface LogInIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function LogInIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: LogInIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12L10 7M15 12H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
