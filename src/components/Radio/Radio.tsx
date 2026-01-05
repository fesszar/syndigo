import type { CSSProperties } from 'react';
import type { RadioProps, RadioGroupProps } from './types';

/**
 * Radio component
 * 
 * A single radio input with optional label.
 */
export function Radio({
  name,
  value = '',
  checked = false,
  disabled = false,
  label,
  onChange,
  className,
  style,
}: RadioProps) {
  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 1 : 1,
    ...style,
  };

  const radioStyle: CSSProperties = {
    position: 'relative',
    width: '17px',
    height: '17px',
    flexShrink: 0,
  };

  const circleStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: `1.5px solid ${checked ? 'var(--color-system-focus, #2d75e2)' : 'var(--color-stroke-medium, #91a0b3)'}`,
    backgroundColor: disabled
      ? 'var(--color-surface-medium, #dee5ef)'
      : checked
        ? 'var(--color-system-focus, #2d75e2)'
        : 'white',
    transition: 'all 0.15s ease-in-out',
  };

  const innerDotStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: 'white',
    opacity: checked ? 1 : 0,
    transition: 'opacity 0.15s ease-in-out',
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: disabled
      ? 'var(--color-text-tertiary, #91a0b3)'
      : 'var(--color-grey-500, #4d5c6e)',
  };

  const hiddenInputStyle: CSSProperties = {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
  };

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleChange();
    }
  };

  return (
    <label className={className} style={containerStyle}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        style={hiddenInputStyle}
        aria-checked={checked}
      />
      <span
        style={radioStyle}
        role="radio"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <span style={circleStyle} />
        <span style={innerDotStyle} />
      </span>
      {label && <span style={labelStyle}>{label}</span>}
    </label>
  );
}

/**
 * RadioGroup component
 * 
 * A group of radio inputs with shared state.
 */
export function RadioGroup({
  name,
  value,
  options,
  onChange,
  direction = 'vertical',
  className,
  style,
}: RadioGroupProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    gap: direction === 'horizontal' ? '16px' : '8px',
    ...style,
  };

  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={className}
      style={containerStyle}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          disabled={option.disabled}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
