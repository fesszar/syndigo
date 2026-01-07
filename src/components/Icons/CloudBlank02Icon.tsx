import type { CSSProperties } from 'react';

export interface CloudBlank02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudBlank02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudBlank02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.0147 4.01472 10 6.5 10C6.67236 10 6.84305 10.0077 7.01165 10.0229C7.17175 7.19353 9.50253 5 12.4 5C14.5647 5 16.4263 6.22768 17.2977 8.02489C17.3641 8.00844 17.4318 8.00013 17.5 8C19.9853 8 22 10.0147 22 12.5C22 14.9853 19.9853 17 17.5 17H6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
