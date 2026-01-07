import type { CSSProperties } from 'react';

export interface ItalicIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ItalicIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ItalicIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M19 4H10M14 20H5M15 4L9 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
