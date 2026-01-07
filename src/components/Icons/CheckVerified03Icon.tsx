import type { CSSProperties } from 'react';

export interface CheckVerified03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CheckVerified03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CheckVerified03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 12L11 14L15 10M12 2L14.4 4.4L17.6 3.6L18.4 6.8L21.6 7.6L20.8 10.8L23.2 13.2L20.8 15.6L21.6 18.8L18.4 19.6L17.6 22.8L14.4 22L12 24.4L9.6 22L6.4 22.8L5.6 19.6L2.4 18.8L3.2 15.6L0.8 13.2L3.2 10.8L2.4 7.6L5.6 6.8L6.4 3.6L9.6 4.4L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
