import type { CSSProperties } from 'react';

export interface HourglassIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function HourglassIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: HourglassIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M12 12L7.22728 7.22727C6.44233 6.44233 6.05 6.05 5.83346 5.5814C5.64 5.16309 5.54 4.708 5.54 4.247V3M12 12L16.7727 7.22727C17.5577 6.44233 17.95 6.05 18.1665 5.5814C18.36 5.16309 18.46 4.708 18.46 4.247V3M12 12L7.22728 16.7727C6.44233 17.5577 6.05 17.95 5.83346 18.4186C5.64 18.8369 5.54 19.292 5.54 19.753V21M12 12L16.7727 16.7727C17.5577 17.5577 17.95 17.95 18.1665 18.4186C18.36 18.8369 18.46 19.292 18.46 19.753V21M5 21H19M5 3H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
