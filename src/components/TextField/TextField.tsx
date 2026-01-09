import type { CSSProperties, InputHTMLAttributes } from 'react';
import { InputField, type InputFieldState } from '../InputField';

export type TextFieldState = 'default' | 'hover' | 'focus' | 'disabled' | 'error';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  required?: boolean;
  helpText?: string;
  errorText?: string;
  state?: TextFieldState;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
}

const baseInputStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '34px',
  padding: '5px 10px',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: 'var(--size-font-size-2xs)',
  fontWeight: 'var(--weight-font-weight-medium)',
  lineHeight: '14px',
  outline: 'none',
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
  boxSizing: 'border-box',
};

const stateStyles: Record<TextFieldState, CSSProperties> = {
  default: {
    backgroundColor: 'var(--color-surface-white)',
    border: '1px solid var(--color-stroke-light)',
    color: 'var(--color-text-primary)',
  },
  hover: {
    backgroundColor: 'var(--color-surface-white)',
    border: '1px solid #91a0b3',
    color: 'var(--color-text-primary)',
  },
  focus: {
    backgroundColor: 'var(--color-surface-white)',
    border: '1.5px solid var(--color-button-primary)',
    color: 'var(--color-text-primary)',
  },
  disabled: {
    backgroundColor: '#dee5ef',
    border: 'none',
    color: 'var(--color-text-secondary)',
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: 'var(--color-surface-medium, #dee5ef)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    color: 'var(--color-text-primary)',
  },
};

const placeholderColor = '#91a0b3';

export function TextField({
  label,
  required = false,
  helpText,
  errorText,
  state = 'default',
  fullWidth = false,
  className,
  style,
  inputStyle,
  disabled,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TextFieldProps) {
  const isDisabled = disabled || state === 'disabled';
  const isError = state === 'error' || !!errorText;
  const effectiveState = isDisabled ? 'disabled' : isError ? 'error' : state;

  const inputFieldState: InputFieldState = isError ? 'error' : isDisabled ? 'disabled' : 'default';

  const getInputStyle = (): CSSProperties => ({
    ...baseInputStyle,
    ...stateStyles[effectiveState],
    width: fullWidth ? '100%' : '218px',
    ...inputStyle,
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      const target = e.currentTarget;
      Object.assign(target.style, stateStyles.focus);
    }
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      const target = e.currentTarget;
      const newState = isError ? stateStyles.error : stateStyles.default;
      Object.assign(target.style, newState);
    }
    onBlur?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!isDisabled && document.activeElement !== e.currentTarget) {
      const target = e.currentTarget;
      Object.assign(target.style, stateStyles.hover);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!isDisabled && document.activeElement !== e.currentTarget) {
      const target = e.currentTarget;
      const newState = isError ? stateStyles.error : stateStyles.default;
      Object.assign(target.style, newState);
    }
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
      style={style}
    >
      <input
        type="text"
        disabled={isDisabled}
        style={getInputStyle()}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      />
      <style>
        {`
          input::placeholder {
            color: ${placeholderColor};
          }
        `}
      </style>
    </InputField>
  );
}
