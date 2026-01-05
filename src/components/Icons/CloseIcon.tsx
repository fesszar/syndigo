import type { CSSProperties } from 'react';

export interface CloseIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Close/X icon
 * Used in: Tag, Pill, Dialog, Modal, RightPanel
 */
export function CloseIcon({
  size = 18,
  color = '#718094',
  className,
  style,
}: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M5.5 5.5L12.5 12.5M12.5 5.5L5.5 12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
