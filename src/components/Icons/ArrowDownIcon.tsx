import type { CSSProperties } from 'react';

export interface ArrowDownIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function ArrowDownIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: ArrowDownIconProps) {
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
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
