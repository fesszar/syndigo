import type { CSSProperties } from 'react';

export interface UserXIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * User with X icon
 * Used in: BackgroundTasksCard (bulk edit partial fail states)
 */
export function UserXIcon({
  size = 20,
  color = '#718094',
  className,
  style,
}: UserXIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 10 12.5H5C4.11594 12.5 3.26809 12.8512 2.64298 13.4763C2.01786 14.1014 1.66666 14.9493 1.66666 15.8333V17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16666 3.99238 4.16666 5.83333C4.16666 7.67428 5.65905 9.16667 7.5 9.16667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5.83334L18.3333 9.16667M18.3333 5.83334L15 9.16667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
