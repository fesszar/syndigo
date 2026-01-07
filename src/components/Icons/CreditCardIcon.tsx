import type { CSSProperties } from 'react';

export interface CreditCardIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CreditCardIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CreditCardIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="1" y="4" width="22" height="16" rx="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 10H23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
