import type { CSSProperties } from 'react';

export interface ArchiveIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ArchiveIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ArchiveIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M21 8V21H3V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 3H1V8H23V3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
