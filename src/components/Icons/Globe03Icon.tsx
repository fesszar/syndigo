import type { CSSProperties } from 'react';

export interface Globe03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Globe03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Globe03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 2V22M2 12H22M19.0711 4.92893C16.9464 7.05357 14.5196 8.26416 12 8.5C9.48044 8.26416 7.05357 7.05357 4.92893 4.92893M4.92893 19.0711C7.05357 16.9464 9.48044 15.7358 12 15.5C14.5196 15.7358 16.9464 16.9464 19.0711 19.0711" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
