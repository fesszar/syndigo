import * as React from 'react';
import type { CSSProperties } from 'react';
import type { InlineErrorProps, InlineErrorSeverity, InlineErrorSize } from './types';
import { Text } from '../Text';

// Container styles
const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-4, 4px)',
};

// Get color by severity
function getSeverityColor(severity: InlineErrorSeverity): string {
  switch (severity) {
    case 'error':
      return 'var(--color-system-critical, #db3a3a)';
    case 'warning':
      return 'var(--color-system-warning, #f5a623)';
    case 'info':
      return 'var(--color-system-info, #2d75e2)';
    default:
      return 'var(--color-system-critical, #db3a3a)';
  }
}

// Get icon size by size variant
function getIconSize(size: InlineErrorSize): number {
  switch (size) {
    case 'small':
      return 14;
    case 'medium':
    default:
      return 16;
  }
}

// Info Circle Icon
function InfoCircleIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="6" fill={color} fillOpacity="0.15" />
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
      <path
        d="M8 5.5V5.51M8 7V10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Warning Triangle Icon
function WarningIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M8 2L14 13H2L8 2Z"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V8.5M8 10.5V10.51"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Get default icon by severity
function getDefaultIcon(severity: InlineErrorSeverity, color: string, size: number): React.ReactNode {
  switch (severity) {
    case 'warning':
      return <WarningIcon color={color} size={size} />;
    case 'error':
    case 'info':
    default:
      return <InfoCircleIcon color={color} size={size} />;
  }
}

/**
 * InlineError component for displaying validation errors and messages
 * 
 * Typography: Inter Medium, 12px/14px (matches Body/12-medium token)
 * Spacing: 4px gap (matches --4 token)
 * Color: #db3a3a for error (matches system/critical token)
 */
export function InlineError({
  message,
  severity = 'error',
  size = 'medium',
  showIcon = true,
  icon,
  multiline = false,
  align = 'left',
  className,
  style,
}: InlineErrorProps) {
  const color = getSeverityColor(severity);
  const iconSize = getIconSize(size);

  const textStyle: CSSProperties = {
    color,
    textAlign: align,
    whiteSpace: multiline ? 'normal' : 'nowrap',
    margin: 0,
  };

  // Map size to Text variant
  const textVariant = size === 'small' ? 'supporting11Medium' : 'body12Medium';

  const alignItems = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';

  return (
    <div
      className={className}
      style={{
        ...containerStyle,
        justifyContent: alignItems,
        ...style,
      }}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        icon || getDefaultIcon(severity, color, iconSize)
      )}
      <Text variant={textVariant} style={textStyle}>{message}</Text>
    </div>
  );
}
