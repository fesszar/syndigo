import type { CSSProperties } from 'react';

export interface Droplets01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Droplets01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Droplets01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 2.69L17.66 8.35C18.7342 9.42608 19.4803 10.7854 19.8116 12.2654C20.1428 13.7453 20.0454 15.2877 19.5306 16.7145C19.0157 18.1413 18.1037 19.3968 16.9008 20.3309C15.698 21.265 14.2536 21.8399 12.7384 21.9888C11.2232 22.1378 9.69758 21.8547 8.34116 21.1728C6.98473 20.4908 5.8537 19.4385 5.07555 18.1365C4.2974 16.8345 3.90448 15.3372 3.94206 13.8172C3.97964 12.2972 4.44599 10.8203 5.28999 9.55671L12 2.69Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
