import type { CSSProperties } from 'react';

export interface AwardIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AwardIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: AwardIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="8" r="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
