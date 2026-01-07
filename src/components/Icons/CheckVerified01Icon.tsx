import type { CSSProperties } from 'react';

export interface CheckVerified01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CheckVerified01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CheckVerified01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 12L11 14L15 10M12 3L14.5 5.5L18 5L18.5 8.5L22 10L20.5 13L22 16L18.5 17.5L18 21L14.5 20.5L12 23L9.5 20.5L6 21L5.5 17.5L2 16L3.5 13L2 10L5.5 8.5L6 5L9.5 5.5L12 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
