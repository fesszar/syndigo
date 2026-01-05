import type { CSSProperties } from 'react';
import type { PillProps, PillState } from './types';

/**
 * Default triangle/chip icon
 */
function DefaultIcon({ color = '#718094' }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 2L9.46 8.5H2.54L6 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Close/remove icon
 */
function CloseIcon({ color = '#718094' }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M1 1L9 9M9 1L1 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * State-based styles
 */
const stateStyles: Record<PillState, {
  background: string;
  border: string;
  textColor: string;
  iconColor: string;
  cursor: string;
}> = {
  default: {
    background: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    textColor: 'var(--color-text-primary, black)',
    iconColor: '#718094',
    cursor: 'pointer',
  },
  hover: {
    background: 'var(--color-surface-light, #f7f9fb)',
    border: '1px solid var(--color-stroke-medium, #91a0b3)',
    textColor: 'var(--color-text-primary, black)',
    iconColor: '#718094',
    cursor: 'pointer',
  },
  active: {
    background: 'var(--color-system-focus, #2d75e2)',
    border: 'none',
    textColor: 'var(--color-text-white, white)',
    iconColor: 'white',
    cursor: 'pointer',
  },
  disabled: {
    background: 'var(--color-surface-medium, #dee5ef)',
    border: 'none',
    textColor: 'var(--color-text-tertiary, #91a0b3)',
    iconColor: '#91a0b3',
    cursor: 'not-allowed',
  },
};

/**
 * Pill component
 * 
 * A selectable chip/tag component with icon support.
 */
export function Pill({
  label,
  state: stateProp,
  selected = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  removable = false,
  onClick,
  onRemove,
  className,
  style,
}: PillProps) {
  // Determine effective state
  const effectiveState: PillState = disabled
    ? 'disabled'
    : selected
      ? 'active'
      : stateProp || 'default';

  const styles = stateStyles[effectiveState];

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: iconPosition === 'iconOnly' ? '0' : '4px',
    padding: '8px',
    backgroundColor: styles.background,
    border: styles.border,
    borderRadius: '4px',
    cursor: styles.cursor,
    overflow: 'hidden',
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    color: styles.textColor,
    whiteSpace: 'nowrap',
  };

  const removeButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginLeft: '4px',
    background: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const iconElement = icon || <DefaultIcon color={styles.iconColor} />;

  // Icon only mode
  if (iconPosition === 'iconOnly') {
    return (
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={className}
        style={containerStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
      >
        {iconElement}
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={className}
      style={containerStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      aria-pressed={selected}
    >
      {/* Left icon */}
      {iconPosition === 'left' && iconElement}

      {/* Label */}
      {label && <span style={labelStyle}>{label}</span>}

      {/* Right icon */}
      {iconPosition === 'right' && iconElement}

      {/* Remove button */}
      {removable && (
        <button
          type="button"
          style={removeButtonStyle}
          onClick={handleRemove}
          aria-label="Remove"
          disabled={disabled}
        >
          <CloseIcon color={styles.iconColor} />
        </button>
      )}
    </div>
  );
}
