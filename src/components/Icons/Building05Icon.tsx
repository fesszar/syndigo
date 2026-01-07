import type { CSSProperties } from 'react';

export interface Building05IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Building05Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: Building05IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M2 21H22M14 21V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H5C4.73478 2 4.48043 2.10536 4.29289 2.29289C4.10536 2.48043 4 2.73478 4 3V21M20 21V9C20 8.73478 19.8946 8.48043 19.7071 8.29289C19.5196 8.10536 19.2652 8 19 8H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
