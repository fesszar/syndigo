import type { CSSProperties } from 'react';

export interface ImageIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ImageIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ImageIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 15L16 10L5 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
