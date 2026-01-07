import type { CSSProperties } from 'react';

export interface ThermometerIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ThermometerIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ThermometerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M14 14.76V3.5C14 2.83696 13.7366 2.20107 13.2678 1.73223C12.7989 1.26339 12.163 1 11.5 1C10.837 1 10.2011 1.26339 9.73223 1.73223C9.26339 2.20107 9 2.83696 9 3.5V14.76C8.19728 15.2963 7.58832 16.0766 7.26191 16.9849C6.9355 17.8932 6.90901 18.8806 7.18621 19.8045C7.4634 20.7284 8.02887 21.5388 8.80154 22.1161C9.57422 22.6934 10.5118 23.0052 11.475 23.0052C12.4382 23.0052 13.3758 22.6934 14.1485 22.1161C14.9211 21.5388 15.4866 20.7284 15.7638 19.8045C16.041 18.8806 16.0145 17.8932 15.6881 16.9849C15.3617 16.0766 14.7527 15.2963 13.95 14.76" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
