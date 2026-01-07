import type { CSSProperties } from 'react';

export interface Divide01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Divide01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Divide01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 12H20M12 6V6.01M12 18V18.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
