import * as React from 'react';
import type { CSSProperties } from 'react';
import type { DataWellProps, DataWellSize, DataWellStatusType } from './types';

// Status indicator dot colors
const statusColors: Record<DataWellStatusType, string> = {
  default: 'var(--color-button-primary, #2d75e2)',
  success: 'var(--color-system-success, #0e8662)',
  warning: 'var(--color-system-warning, #f58319)',
  critical: 'var(--color-system-critical, #db3a3a)',
  info: 'var(--color-button-primary, #2d75e2)',
};

// State-based container styles
// Note: Small size in Default state has no border per Figma
const getStateStyles = (size: DataWellSize, state: 'default' | 'hover' | 'active') => {
  if (state === 'default') {
    return {
      backgroundColor: 'var(--color-surface-white, white)',
      border: size === 'large' ? '1px solid var(--color-stroke-light, #dee5ef)' : 'none',
    };
  }
  if (state === 'hover') {
    return {
      backgroundColor: 'var(--color-surface-white, white)',
      border: '1px solid var(--color-stroke-medium, #91a0b3)',
    };
  }
  // active
  return {
    backgroundColor: 'var(--color-blue-100, #e7f1ff)',
    border: '1px solid var(--color-system-focus, #2d75e2)',
  };
};

// Size-based typography styles
const sizeStyles: Record<DataWellSize, { valueFontSize: string; valueLineHeight: string }> = {
  large: {
    valueFontSize: '16px',
    valueLineHeight: '20px',
  },
  small: {
    valueFontSize: '12px',
    valueLineHeight: '14px',
  },
};

const containerBaseStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: '12px',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
};

const leftStackStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flexGrow: 1,
  minWidth: 0,
};

const labelRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const labelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-secondary, #4d5c6e)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const valueRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
};

const valueStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontWeight: 600,
  color: 'var(--color-text-primary, black)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const statusDotStyle: CSSProperties = {
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  flexShrink: 0,
};

const tooltipIconStyle: CSSProperties = {
  width: '14px',
  height: '14px',
  flexShrink: 0,
  color: 'var(--color-icon-secondary, #718094)',
};

const actionButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '2px 0',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '14px',
  color: 'var(--color-text-link, #2d75e2)',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
};

export function DataWell({
  label,
  value,
  size = 'large',
  showStatusIndicator = false,
  statusType = 'default',
  showTooltipTrigger = false,
  tooltipContent,
  actionLabel,
  onActionClick,
  onClick,
  isActive = false,
  className,
  style,
  children,
}: DataWellProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const currentState = isActive ? 'active' : isHovered ? 'hover' : 'default';
  const currentStateStyle = getStateStyles(size, currentState);
  const currentSizeStyle = sizeStyles[size];

  const containerStyle: CSSProperties = {
    ...containerBaseStyle,
    ...currentStateStyle,
    ...style,
  };

  const currentValueStyle: CSSProperties = {
    ...valueStyle,
    fontSize: currentSizeStyle.valueFontSize,
    lineHeight: currentSizeStyle.valueLineHeight,
  };

  return (
    <div
      className={className}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div style={leftStackStyle}>
        {/* Label row */}
        <div style={labelRowStyle}>
          <span style={labelStyle}>{label}</span>
          {showTooltipTrigger && (
            <svg
              style={tooltipIconStyle}
              viewBox="0 0 14 14"
              fill="none"
              aria-label={tooltipContent || 'More information'}
            >
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 6.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="4.5" r="0.75" fill="currentColor" />
            </svg>
          )}
        </div>

        {/* Value row */}
        <div style={valueRowStyle}>
          {showStatusIndicator && (
            <div
              style={{
                ...statusDotStyle,
                backgroundColor: statusColors[statusType],
              }}
            />
          )}
          {children || <span style={currentValueStyle}>{value}</span>}
        </div>
      </div>

      {/* Action button */}
      {actionLabel && (
        <button
          style={actionButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onActionClick?.();
          }}
        >
          {actionLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
