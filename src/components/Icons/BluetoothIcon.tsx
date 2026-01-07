import type { CSSProperties } from 'react';

export interface BluetoothIconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function BluetoothIcon({
  size = 24,
  color = '#718094',
  className,
  style,
}: BluetoothIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path d="M6.5 6.5L17.5 17.5L12 23V1L17.5 6.5L6.5 17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
