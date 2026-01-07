import type { CSSProperties } from 'react';

export interface GitPullRequestIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function GitPullRequestIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: GitPullRequestIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="18" cy="18" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15M6 9V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
