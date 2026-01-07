import type { CSSProperties } from 'react';

export interface CropIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CropIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CropIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M6.13 1L6 16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H23M1 6.13L16 6C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
