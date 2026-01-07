import type { CSSProperties } from 'react';

export interface CloudOffIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudOffIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudOffIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M22.61 16.95C22.85 16.5 23 16 23 15.45C23 13.35 21.21 11.65 19 11.65H18.32C17.95 9.96 17.04 8.44 15.76 7.34M6.59 6.59C3.99 7.84 2.26 10.56 2.26 13.65C2.26 17.97 5.76 21.47 10.08 21.47H17.73C18.39 21.47 19.03 21.37 19.64 21.17M1 1L23 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
