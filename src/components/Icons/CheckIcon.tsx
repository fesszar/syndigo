import type { CSSProperties } from 'react';

export interface CheckIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Checkmark icon
 * Used in: Stepper (completed state), SelectMenu, FilterDropdown
 */
export function CheckIcon({
  size = 13,
  color = 'white',
  className,
  style,
}: CheckIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M2.5 6.5L5.5 9.5L10.5 3.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
