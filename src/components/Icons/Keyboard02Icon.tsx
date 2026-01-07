import type { CSSProperties } from 'react';

export interface Keyboard02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Keyboard02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Keyboard02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M6 10H6.01M10 10H10.01M14 10H14.01M18 10H18.01M6 14H6.01M10 14H10.01M14 14H14.01M18 14H18.01M8 18H16M5.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V5.2C22 4.07989 22 3.51984 21.782 3.09202C21.5903 2.71569 21.2843 2.40973 20.908 2.21799C20.4802 2 19.9201 2 18.8 2H5.2C4.07989 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
