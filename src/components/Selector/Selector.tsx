import type { CSSProperties } from 'react';
import type { SelectorProps, SelectorState } from './types';

/**
 * Chevron down icon
 */
function ChevronDownIcon({ color = '#718094' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9L12 15L18 9"
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
const stateStyles: Record<SelectorState, {
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
  focus: {
    background: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-system-focus, #2d75e2)',
    textColor: 'var(--color-text-primary, black)',
    iconColor: '#718094',
    cursor: 'pointer',
  },
  disabled: {
    background: 'var(--color-surface-medium, #dee5ef)',
    border: '1px solid var(--color-stroke-medium, #91a0b3)',
    textColor: 'var(--color-text-tertiary, #91a0b3)',
    iconColor: '#91a0b3',
    cursor: 'not-allowed',
  },
  error: {
    background: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-system-critical, #db3a3a)',
    textColor: 'var(--color-text-primary, black)',
    iconColor: '#718094',
    cursor: 'pointer',
  },
};

/**
 * Selector component
 * 
 * A dropdown trigger button (select-like control).
 * Use to trigger dropdown menus or filter selections.
 */
export function Selector({
  label,
  placeholder,
  state: stateProp,
  disabled = false,
  error = false,
  open = false,
  onClick,
  className,
  style,
}: SelectorProps) {
  // Determine effective state
  const effectiveState: SelectorState = disabled
    ? 'disabled'
    : error
      ? 'error'
      : stateProp || 'default';

  const styles = stateStyles[effectiveState];

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '5px 11px',
    backgroundColor: styles.background,
    border: styles.border,
    borderRadius: '4px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: styles.cursor,
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    color: styles.textColor,
    textAlign: 'center',
    flexGrow: 1,
  };

  const iconWrapperStyle: CSSProperties = {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.15s ease-in-out',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type="button"
      className={className}
      style={containerStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <span style={labelStyle}>{label || placeholder}</span>
      <span style={iconWrapperStyle}>
        <ChevronDownIcon color={styles.iconColor} />
      </span>
    </button>
  );
}
