import type { CSSProperties } from 'react';

export interface Droplets03IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Droplets03Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Droplets03IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 21.5C16.1421 21.5 19.5 18.1421 19.5 14C19.5 9.85786 12 2.5 12 2.5C12 2.5 4.5 9.85786 4.5 14C4.5 18.1421 7.85786 21.5 12 21.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
