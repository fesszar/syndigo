import type { CSSProperties } from 'react';

export interface FileQuestion01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FileQuestion01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FileQuestion01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M17 19.5V19.51M17 16.5C17.5 15.5 19 15 19 13.5C19 12 18 11 16.5 11C15 11 14.5 12 14.5 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
