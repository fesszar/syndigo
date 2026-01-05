import * as React from 'react';
import type { CSSProperties } from 'react';
import type { SearchFieldProps, SearchFieldState } from './types';

// Base input container styles
const baseContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-4, 4px)',
  height: '34px',
  padding: '5px 10px',
  borderRadius: 'var(--radius-sm, 4px)',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  boxSizing: 'border-box',
};

// State-specific styles
const stateStyles: Record<SearchFieldState, CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
  },
  hover: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid #91a0b3',
  },
  active: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1.5px solid var(--color-button-primary, #2d75e2)',
  },
  disabled: {
    backgroundColor: '#dee5ef',
    border: 'none',
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1.5px solid var(--color-system-critical, #db3a3a)',
  },
};

// Input styles
const inputStyle: CSSProperties = {
  flex: 1,
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
};

const placeholderStyle: CSSProperties = {
  color: 'var(--color-text-tertiary, #91a0b3)',
};

// Search Icon
function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle
        cx="7"
        cy="7"
        r="4.5"
        stroke="#718094"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 10.5L13.5 13.5"
        stroke="#718094"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Clear Icon
function ClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, cursor: 'pointer' }}
    >
      <circle cx="8" cy="8" r="6" fill="#dee5ef" />
      <path
        d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
        stroke="#718094"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * SearchField component for search inputs
 * Features search icon and optional clear button
 */
export function SearchField({
  state = 'default',
  errorText,
  showClearButton = true,
  fullWidth = false,
  onClear,
  className,
  style,
  inputStyle: customInputStyle,
  disabled,
  value,
  onChange,
  placeholder = 'Search',
  ...rest
}: SearchFieldProps) {
  const [internalState, setInternalState] = React.useState<SearchFieldState>(state);
  const isDisabled = disabled || state === 'disabled';
  const isError = state === 'error' || !!errorText;
  const hasValue = value !== undefined && value !== '';

  const effectiveState = isDisabled ? 'disabled' : isError ? 'error' : internalState;

  const containerStyles: CSSProperties = {
    ...baseContainerStyle,
    ...stateStyles[effectiveState],
    width: fullWidth ? '100%' : '218px',
    ...style,
  };

  const handleFocus = () => {
    if (!isDisabled) setInternalState('active');
  };

  const handleBlur = () => {
    if (!isDisabled) setInternalState('default');
  };

  const handleMouseEnter = () => {
    if (!isDisabled && internalState !== 'active') setInternalState('hover');
  };

  const handleMouseLeave = () => {
    if (!isDisabled && internalState !== 'active') setInternalState('default');
  };

  const handleClear = () => {
    onClear?.();
    if (onChange) {
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <div
        style={containerStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SearchIcon />
        <input
          type="text"
          style={{
            ...inputStyle,
            ...placeholderStyle,
            ...customInputStyle,
          }}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {showClearButton && hasValue && !isDisabled && (
          <div onClick={handleClear} role="button" tabIndex={0}>
            <ClearIcon />
          </div>
        )}
      </div>
      {isError && errorText && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" fill="#db3a3a" fillOpacity="0.15" />
            <circle cx="8" cy="8" r="6" stroke="#db3a3a" strokeWidth="1.5" />
            <path d="M8 5.5V8.5M8 10.5V10.51" stroke="#db3a3a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--color-system-critical, #db3a3a)',
          }}>
            {errorText}
          </span>
        </div>
      )}
    </div>
  );
}
