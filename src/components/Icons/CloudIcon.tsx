import type { CSSProperties } from 'react';

export interface CloudIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M18 10H16.74C16.3659 8.55183 15.5928 7.23825 14.5086 6.20478C13.4245 5.17131 12.0727 4.46233 10.6069 4.15899C9.14106 3.85565 7.61953 3.97041 6.21668 4.48953C4.81382 5.00864 3.58537 5.91085 2.67057 7.09219C1.75578 8.27353 1.19203 9.68609 1.04133 11.1727C0.890623 12.6593 1.15927 14.1604 1.81659 15.5061C2.4739 16.8519 3.49359 17.9887 4.76131 18.7885C6.02902 19.5883 7.49396 20.0196 8.99 20.02H18C19.3261 20.02 20.5979 19.4932 21.5355 18.5555C22.4732 17.6179 23 16.3461 23 15.02C23 13.6939 22.4732 12.4221 21.5355 11.4845C20.5979 10.5468 19.3261 10.02 18 10.02V10Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
