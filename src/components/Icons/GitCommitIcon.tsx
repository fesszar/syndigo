import type { CSSProperties } from 'react';

export interface GitCommitIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function GitCommitIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: GitCommitIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.05 12H8M16 12H22.96" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
