import type { CSSProperties } from 'react';

export interface FaceContentIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FaceContentIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FaceContentIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14C8.5 15.5 10 17 12 17C14 17 15.5 15.5 16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9H9.01M15 9H15.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
