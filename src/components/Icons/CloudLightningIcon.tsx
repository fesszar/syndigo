import type { CSSProperties } from 'react';

export interface CloudLightningIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudLightningIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudLightningIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M19 16.9C20.2 16.67 21.14 15.68 21.14 14.47C21.14 13.11 20.03 12 18.67 12H17.84C17.29 9.27 14.89 7.25 12 7.25C8.69 7.25 6 9.94 6 13.25C6 13.67 6.04 14.08 6.12 14.47" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 12L9 18H15L11 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
