import type { CSSProperties } from 'react';

export interface PocketIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function PocketIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: PocketIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 3C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V11C2 13.6522 3.05357 16.1957 4.92893 18.0711C6.8043 19.9464 9.34784 21 12 21C14.6522 21 17.1957 19.9464 19.0711 18.0711C20.9464 16.1957 22 13.6522 22 11V5C22 4.46957 21.7893 3.96086 21.4142 3.58579C21.0391 3.21071 20.5304 3 20 3H4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10L12 14L16 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
