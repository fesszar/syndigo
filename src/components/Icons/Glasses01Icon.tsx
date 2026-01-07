import type { CSSProperties } from 'react';

export interface Glasses01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Glasses01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Glasses01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M10 14.5C10 15.8807 8.88071 17 7.5 17C6.11929 17 5 15.8807 5 14.5C5 13.1193 6.11929 12 7.5 12C8.88071 12 10 13.1193 10 14.5ZM10 14.5H14M14 14.5C14 15.8807 15.1193 17 16.5 17C17.8807 17 19 15.8807 19 14.5C19 13.1193 17.8807 12 16.5 12C15.1193 12 14 13.1193 14 14.5ZM5 14.5L2 9M19 14.5L22 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
