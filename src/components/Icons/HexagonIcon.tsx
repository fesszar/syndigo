import type { CSSProperties } from 'react';

export interface HexagonIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function HexagonIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: HexagonIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M21 16V8C20.9996 7.6493 20.9071 7.3048 20.7315 7.00017C20.556 6.69555 20.3037 6.44159 20 6.26L13 2.26C12.696 2.07877 12.3511 1.98327 12 1.98327C11.6489 1.98327 11.304 2.07877 11 2.26L4 6.26C3.69626 6.44159 3.44398 6.69555 3.26846 7.00017C3.09294 7.3048 3.00036 7.6493 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9998C3.44398 17.3045 3.69626 17.5584 4 17.74L11 21.74C11.304 21.9212 11.6489 22.0167 12 22.0167C12.3511 22.0167 12.696 21.9212 13 21.74L20 17.74C20.3037 17.5584 20.556 17.3045 20.7315 16.9998C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
