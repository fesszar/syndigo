import * as React from 'react';
import type { CSSProperties } from 'react';
import { InputField } from '../InputField';
import type { TextAreaProps, TextAreaState } from './types';

// Base textarea styles
const baseTextareaStyle: CSSProperties = {
  width: '100%',
  minHeight: '76px',
  padding: '10px',
  borderRadius: 'var(--radius-sm, 4px)',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '17px',
  outline: 'none',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  boxSizing: 'border-box',
};

// State-specific styles
const stateStyles: Record<TextAreaState, CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    color: 'var(--color-text-tertiary, #91a0b3)',
  },
  hover: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid #91a0b3',
    color: 'var(--color-text-tertiary, #91a0b3)',
  },
  active: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1.5px solid var(--color-button-primary, #2d75e2)',
    color: 'var(--color-text-primary, black)',
  },
  disabled: {
    backgroundColor: '#dee5ef',
    border: 'none',
    color: 'var(--color-text-secondary, #4d5c6e)',
    cursor: 'not-allowed',
  },
  filled: {
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    color: 'var(--color-text-primary, black)',
  },
};

const errorStyle: CSSProperties = {
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1.5px solid var(--color-system-critical, #db3a3a)',
  color: 'var(--color-text-primary, black)',
};

/**
 * TextArea component for multi-line text input
 * Features resizable handle and multiple states
 */
export function TextArea({
  label,
  required = false,
  helpText,
  errorText,
  state = 'default',
  resizable = true,
  fullWidth = false,
  rows = 3,
  className,
  style,
  textareaStyle,
  disabled,
  value,
  placeholder = 'Enter details',
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TextAreaProps) {
  const [internalState, setInternalState] = React.useState<TextAreaState>(state);
  
  const isDisabled = disabled || state === 'disabled';
  const isError = !!errorText;
  const hasValue = value !== undefined && value !== '';
  
  const effectiveState = isDisabled ? 'disabled' : hasValue ? 'filled' : internalState;

  const inputFieldState = isError ? 'error' : isDisabled ? 'disabled' : 'default';

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: fullWidth ? '100%' : '323px',
    ...style,
  };

  const computedTextareaStyle: CSSProperties = {
    ...baseTextareaStyle,
    ...(isError ? errorStyle : stateStyles[effectiveState]),
    resize: resizable ? 'vertical' : 'none',
    ...textareaStyle,
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!isDisabled) setInternalState('active');
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!isDisabled) setInternalState(hasValue ? 'filled' : 'default');
    onBlur?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!isDisabled && internalState !== 'active') setInternalState('hover');
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!isDisabled && internalState !== 'active') setInternalState(hasValue ? 'filled' : 'default');
    onMouseLeave?.(e);
  };

  return (
    <InputField
      label={label}
      required={required}
      helpText={helpText}
      errorText={errorText}
      state={inputFieldState}
      className={className}
      style={containerStyle}
    >
      <textarea
        style={computedTextareaStyle}
        disabled={isDisabled}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      />
    </InputField>
  );
}
