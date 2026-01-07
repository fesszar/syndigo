import type { CSSProperties } from 'react';

export interface MailIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function MailIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: MailIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M2 7L12 13L22 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
