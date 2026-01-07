import type { CSSProperties } from 'react';

export interface BookmarkIconProps {
  size?: number;
  color?: string;
  fill?: string;
  className?: string;
  style?: CSSProperties;
}

export function BookmarkIcon({
  size = 24,
  color = '#718094',
  fill = 'none',
  className,
  style,
}: BookmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      style={style}
    >
      <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
