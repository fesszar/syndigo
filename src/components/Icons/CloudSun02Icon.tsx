import type { CSSProperties } from 'react';

export interface CloudSun02IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudSun02Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudSun02IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M6.34 9.66C5.14421 9.87917 4.0535 10.4878 3.23631 11.3908C2.41911 12.2938 1.92111 13.4405 1.82003 14.6545C1.71896 15.8685 2.02076 17.0813 2.67831 18.1041C3.33586 19.1269 4.31247 19.9026 5.45 20.31M17.66 9.66C18.8558 9.87917 19.9465 10.4878 20.7637 11.3908C21.5809 12.2938 22.0789 13.4405 22.18 14.6545C22.281 15.8685 21.9792 17.0813 21.3217 18.1041C20.6641 19.1269 19.6875 19.9026 18.55 20.31M12 4V2M18.36 5.64L19.78 4.22M5.64 5.64L4.22 4.22M12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 15.7614 9.23858 18 12 18Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
