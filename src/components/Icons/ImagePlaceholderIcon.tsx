import type { CSSProperties } from 'react';

export interface ImagePlaceholderIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Image placeholder icon (mountain/landscape icon)
 * Used in: Thumbnail (placeholder state)
 */
export function ImagePlaceholderIcon({
  size = 24,
  color = '#91a0b3',
  className,
  style,
}: ImagePlaceholderIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M3 16L8 11L13 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L17 11L21 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
        fill={color}
      />
    </svg>
  );
}
