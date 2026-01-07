import type { CSSProperties } from 'react';

export interface AnchorIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AnchorIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: AnchorIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="5" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 22V8M5 12H2C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
