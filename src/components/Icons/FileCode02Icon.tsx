import type { CSSProperties } from 'react';

export interface FileCode02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function FileCode02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: FileCode02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M5 18.5C5 18.9644 5 19.1966 5.02567 19.3916C5.2029 20.7378 6.26222 21.7971 7.60842 21.9743C7.80337 22 8.03558 22 8.5 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V9.98822C20 9.25445 20 8.88757 19.9171 8.5423C19.8436 8.2362 19.7224 7.94356 19.5579 7.67515C19.3724 7.3724 19.113 7.11296 18.5941 6.59411L15.4059 3.40589C14.887 2.88703 14.6276 2.6276 14.3249 2.44208C14.0564 2.27759 13.7638 2.15638 13.4577 2.08289C13.1124 2 12.7455 2 12.0118 2H8.5C8.03558 2 7.80337 2 7.60842 2.02567C6.26222 2.2029 5.2029 3.26222 5.02567 4.60842C5 4.80337 5 5.03558 5 5.5M9 14.5L7 16.5L9 18.5M15 14.5L17 16.5L15 18.5M13 13L11 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
