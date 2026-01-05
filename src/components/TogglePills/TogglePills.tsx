import type { CSSProperties } from 'react';
import type { TogglePillsProps, TogglePillOption } from './types';
import { Text } from '../Text';

/**
 * TogglePills component
 * 
 * A pill-based toggle group for single-select options.
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22504:29766
 */
export function TogglePills({
  options,
  value,
  onChange,
  disabled = false,
  allowDeselect = false,
  className,
  style,
  ariaLabel,
}: TogglePillsProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    backgroundColor: 'var(--color-surface-light, #f7f9fb)',
    border: disabled
      ? '1px solid var(--color-stroke-light, #dee5ef)'
      : '1px solid var(--color-stroke-medium, #91a0b3)',
    borderRadius: '4px',
    ...style,
  };

  const getPillStyle = (option: TogglePillOption, isActive: boolean): CSSProperties => {
    const isDisabled = disabled || option.disabled;

    const baseStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '26px',
      padding: '10px',
      borderRadius: '4px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.15s ease',
      flexShrink: 0,
    };

    if (isActive && !isDisabled) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-button-primary, #2d75e2)',
      };
    }

    if (isDisabled && isActive) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-surface-medium, #dee5ef)',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'var(--color-surface-light, #f7f9fb)',
    };
  };

  const getTextColor = (option: TogglePillOption, isActive: boolean): string => {
    const isDisabled = disabled || option.disabled;

    if (isActive && !isDisabled) {
      return 'var(--color-text-white, white)';
    }

    if (isDisabled) {
      return 'var(--color-text-tertiary, #91a0b3)';
    }

    return 'var(--color-text-secondary, #4d5c6e)';
  };

  const handlePillClick = (optionId: string) => {
    const option = options.find((o) => o.id === optionId);
    if (disabled || option?.disabled) return;

    if (value === optionId && allowDeselect) {
      onChange(null);
    } else if (value !== optionId) {
      onChange(optionId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, optionId: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handlePillClick(optionId);
    }
  };

  return (
    <div
      className={className}
      style={containerStyle}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {options.map((option) => {
        const isActive = value === option.id;
        const isDisabled = disabled || option.disabled;

        return (
          <div
            key={option.id}
            role="radio"
            aria-checked={isActive}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            style={getPillStyle(option, isActive)}
            onClick={() => handlePillClick(option.id)}
            onKeyDown={(e) => handleKeyDown(e, option.id)}
          >
            <Text
              variant={isActive && isDisabled ? 'body12Semibold' : 'body12Medium'}
              style={{
                color: getTextColor(option, isActive),
                whiteSpace: 'nowrap',
              }}
            >
              {option.label}
            </Text>
          </div>
        );
      })}
    </div>
  );
}
