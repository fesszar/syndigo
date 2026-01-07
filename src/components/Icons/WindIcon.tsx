import type { CSSProperties } from 'react';

export interface WindIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function WindIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: WindIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9.59 4.59C9.97 3.66 10.89 3 12 3C13.5 3 14.72 4.22 14.72 5.72C14.72 7.22 13.5 8.44 12 8.44H2M12.59 19.41C12.97 20.34 13.89 21 15 21C16.5 21 17.72 19.78 17.72 18.28C17.72 16.78 16.5 15.56 15 15.56H2M17.73 7.73C18.11 6.8 19.03 6.14 20.14 6.14C21.64 6.14 22.86 7.36 22.86 8.86C22.86 10.36 21.64 11.58 20.14 11.58H2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
