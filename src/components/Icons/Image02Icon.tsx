import type { CSSProperties } from 'react';

export interface Image02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Image02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Image02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 16L8.58579 11.4142C8.96086 11.0391 9.46957 10.8284 10 10.8284C10.5304 10.8284 11.0391 11.0391 11.4142 11.4142L16 16M14 14L15.5858 12.4142C15.9609 12.0391 16.4696 11.8284 17 11.8284C17.5304 11.8284 18.0391 12.0391 18.4142 12.4142L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
