import type { CSSProperties } from 'react';

export interface AtSignIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AtSignIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: AtSignIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8V13C16 13.7956 16.3161 14.5587 16.8787 15.1213C17.4413 15.6839 18.2044 16 19 16C19.7956 16 20.5587 15.6839 21.1213 15.1213C21.6839 14.5587 22 13.7956 22 13V12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22C13.6168 22.0005 15.2053 21.5765 16.6115 20.7684C18.0177 19.9603 19.1936 18.7952 20.015 17.397" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
