import type { CSSProperties } from 'react';

export interface CloudRaining05IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudRaining05Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudRaining05IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M4 14.899C2.21539 14.1838 1 12.4577 1 10.5C1 7.46243 3.46243 5 6.5 5C6.51269 5 6.52536 5.00003 6.53802 5.0001C7.52868 2.6646 9.89972 1 12.6667 1C16.1642 1 19 3.8358 19 7.33333C19 7.50347 18.9915 7.67174 18.9749 7.83766C21.3181 8.52833 23 10.6954 23 13.25C23 16.4256 20.4256 19 17.25 19H6.5M8 15L6 19M16 15L14 19M12 17L10 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
