import type { CSSProperties } from 'react';

export interface StrikethroughIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function StrikethroughIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: StrikethroughIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M16 4H9C7.93913 4 6.92172 4.42143 6.17157 5.17157C5.42143 5.92172 5 6.93913 5 8C5 9.06087 5.42143 10.0783 6.17157 10.8284C6.92172 11.5786 7.93913 12 9 12H15C16.0609 12 17.0783 12.4214 17.8284 13.1716C18.5786 13.9217 19 14.9391 19 16C19 17.0609 18.5786 18.0783 17.8284 18.8284C17.0783 19.5786 16.0609 20 15 20H5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
