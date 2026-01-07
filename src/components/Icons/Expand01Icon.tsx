import type { CSSProperties } from 'react';

export interface Expand01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Expand01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Expand01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M14 10L21 3M21 3H15M21 3V9M10 14L3 21M3 21H9M3 21V15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
