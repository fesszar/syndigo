import type { CSSProperties } from 'react';

export interface WatchIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function WatchIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: WatchIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9V12L13.5 13.5M16.51 17.35L16.16 21.18C16.11 21.73 15.62 22.14 15.06 22.14H8.94C8.38 22.14 7.89 21.73 7.84 21.18L7.49 17.35M7.49 6.65L7.84 2.82C7.89 2.27 8.38 1.86 8.94 1.86H15.06C15.62 1.86 16.11 2.27 16.16 2.82L16.51 6.65" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
