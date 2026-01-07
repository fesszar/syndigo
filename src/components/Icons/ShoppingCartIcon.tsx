import type { CSSProperties } from 'react';

export interface ShoppingCartIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ShoppingCartIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ShoppingCartIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M1 1H5L7.68 14.39C7.77 14.87 8.02 15.3 8.38 15.63C8.74 15.96 9.21 16.15 9.69 16.17H19.5C19.98 16.15 20.45 15.96 20.81 15.63C21.17 15.3 21.42 14.87 21.51 14.39L23 6H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="21" r="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="21" r="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
