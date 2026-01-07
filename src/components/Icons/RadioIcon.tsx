import type { CSSProperties } from 'react';

export interface RadioIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function RadioIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: RadioIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.24 7.76C16.7979 8.31504 17.2404 8.97528 17.5424 9.70315C17.8443 10.431 18 11.2116 18 12C18 12.7884 17.8443 13.569 17.5424 14.2969C17.2404 15.0247 16.7979 15.685 16.24 16.24M7.76 16.24C7.20214 15.685 6.75959 15.0247 6.45765 14.2969C6.1557 13.569 6 12.7884 6 12C6 11.2116 6.1557 10.431 6.45765 9.70315C6.75959 8.97528 7.20214 8.31504 7.76 7.76M19.07 4.93C21.9447 7.80528 21.9447 12.3747 19.07 15.25M4.93 19.07C2.05528 16.1947 2.05528 11.6253 4.93 8.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
