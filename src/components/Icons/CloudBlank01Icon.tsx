import type { CSSProperties } from 'react';

export interface CloudBlank01IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function CloudBlank01Icon({
  size = 24,
  color = '#718094',
  className,
  style,
}: CloudBlank01IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <path d="M18 10H16.74C16.3659 8.55183 15.5928 7.23825 14.5086 6.20678C13.4245 5.17532 12.0727 4.46957 10.6069 4.16918C9.14114 3.86879 7.62026 3.98567 6.21679 4.50693C4.81331 5.02819 3.58363 5.93236 2.66715 7.11727C1.75067 8.30217 1.18446 9.71973 1.03097 11.2082C0.877487 12.6967 1.14277 14.1979 1.79621 15.5452C2.44966 16.8926 3.46548 18.0339 4.72818 18.8405C5.99089 19.6472 7.45023 20.0862 8.94 20.11H18C19.3261 20.11 20.5979 19.5832 21.5355 18.6455C22.4732 17.7079 23 16.4361 23 15.11C23 13.7839 22.4732 12.5121 21.5355 11.5745C20.5979 10.6368 19.3261 10.11 18 10.11V10Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
