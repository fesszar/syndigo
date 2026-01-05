import type { CSSProperties } from 'react';
import type { StatusIndicatorProps, StatusIndicatorType } from './types';

/**
 * Status color mapping from Design System
 * DO NOT modify or add new colors without DS approval
 */
const statusColors: Record<StatusIndicatorType, string> = {
  default: '#2d75e2',
  neutral: '#718094',
  warning: '#f58319',
  critical: '#db3a3a',
  success: '#0e8662',
};

/**
 * StatusIndicator component
 * 
 * A pill-shaped status indicator with colored dot and label.
 * Status types are defined by the Design System.
 */
export function StatusIndicator({
  type = 'default',
  label,
  hideLabel = false,
  className,
  style,
}: StatusIndicatorProps) {
  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '5px 10px',
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '24px',
    ...style,
  };

  const dotStyle: CSSProperties = {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: statusColors[type],
    flexShrink: 0,
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-secondary, #4d5c6e)',
    whiteSpace: 'nowrap',
  };

  return (
    <span className={className} style={containerStyle} role="status">
      <span style={dotStyle} aria-hidden="true" />
      {!hideLabel && <span style={labelStyle}>{label}</span>}
    </span>
  );
}
