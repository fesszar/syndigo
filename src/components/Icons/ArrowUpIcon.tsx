import type { CSSProperties } from 'react';

export interface ArrowUpIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ArrowUpIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ArrowUpIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
