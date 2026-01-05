import type { CSSProperties } from 'react';
import type { CountIndicatorProps, CountIndicatorType } from './types';
import { Text } from '../Text';

// Strong contrast: filled background with white text
const strongColors: Record<CountIndicatorType, { background: string; text: string }> = {
  default: {
    background: 'var(--color-button-primary, #2d75e2)',
    text: 'var(--color-text-white, white)',
  },
  success: {
    background: 'var(--color-system-success, #0e8662)',
    text: 'var(--color-text-white, white)',
  },
  warning: {
    background: 'var(--color-system-warning, #f58319)',
    text: 'var(--color-text-white, white)',
  },
  critical: {
    background: 'var(--color-system-critical, #db3a3a)',
    text: 'var(--color-text-white, white)',
  },
  neutral: {
    background: 'var(--color-gray-500, #4d5c6e)',
    text: 'var(--color-text-white, white)',
  },
};

// Subtle contrast: white background with colored border and text
const subtleColors: Record<CountIndicatorType, { background: string; border: string; text: string }> = {
  default: {
    background: 'var(--color-surface-white, white)',
    border: 'var(--color-button-primary, #2d75e2)',
    text: 'var(--color-button-primary, #2d75e2)',
  },
  success: {
    background: 'var(--color-surface-white, white)',
    border: 'var(--color-system-success, #0e8662)',
    text: 'var(--color-system-success, #0e8662)',
  },
  warning: {
    background: 'var(--color-surface-white, white)',
    border: 'var(--color-system-warning, #f58319)',
    text: 'var(--color-system-warning, #f58319)',
  },
  critical: {
    background: 'var(--color-surface-white, white)',
    border: 'var(--color-system-critical, #db3a3a)',
    text: 'var(--color-system-critical, #db3a3a)',
  },
  neutral: {
    background: 'var(--color-surface-white, white)',
    border: 'var(--color-stroke-light, #dee5ef)',
    text: 'var(--color-text-secondary, #4d5c6e)',
  },
};

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2px 3px',
  borderRadius: 'var(--radius-4, 4px)',
  minWidth: '20px',
  height: '20px',
};

/**
 * Formats the count value with max display rules
 * e.g., 150 with max=99 becomes "99+"
 */
function formatCount(count: number, max: number): string {
  if (count > max) {
    return `${max}+`;
  }
  return String(count);
}

export function CountIndicator({
  count,
  max = 99,
  type = 'default',
  contrast = 'strong',
  className,
  style,
}: CountIndicatorProps) {
  const displayValue = formatCount(count, max);

  const getStyles = (): CSSProperties => {
    if (contrast === 'strong') {
      const colors = strongColors[type];
      return {
        ...baseStyle,
        backgroundColor: colors.background,
        color: colors.text,
        ...style,
      };
    }

    // Subtle contrast
    const colors = subtleColors[type];
    return {
      ...baseStyle,
      backgroundColor: colors.background,
      border: `1px solid ${colors.border}`,
      color: colors.text,
      ...style,
    };
  };

  return (
    <span className={className} style={getStyles()}>
      <Text variant="body13Medium" style={{ color: 'inherit' }}>
        {displayValue}
      </Text>
    </span>
  );
}
