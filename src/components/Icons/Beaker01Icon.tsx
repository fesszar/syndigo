import type { CSSProperties } from 'react';

export interface Beaker01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Beaker01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Beaker01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M9 3H15M9 3V9L4 18C3.5 19 4.2 20 5.5 20H18.5C19.8 20 20.5 19 20 18L15 9V3M9 3H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
