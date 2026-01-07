import type { CSSProperties } from 'react';

export interface LifeBuoy02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function LifeBuoy02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: LifeBuoy02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M8.46445 8.46448L4.92893 4.92896M4.92893 19.0711L8.46448 15.5355M15.5355 15.5355L19.0711 19.0711M19.0711 4.92896L15.5355 8.46451M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
