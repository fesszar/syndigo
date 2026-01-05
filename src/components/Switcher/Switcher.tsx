import { useState, type CSSProperties } from 'react';
import type { SwitcherProps, SwitcherType } from './types';
import { Text } from '../Text';

/**
 * Switcher component
 * 
 * A segmented control / tab switcher with labeled options.
 */
export function Switcher({
  options,
  value,
  onChange,
  type = 'primary',
  disabled = false,
  className,
  style,
  ariaLabel,
}: SwitcherProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getContainerStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 4px',
      borderRadius: '4px',
      border: '1px solid var(--color-stroke-light, #dee5ef)',
    };

    if (type === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-surface-light, #f7f9fb)',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'var(--color-surface-white, white)',
    };
  };

  const getOptionStyle = (optionId: string, optionDisabled?: boolean): CSSProperties => {
    const isActive = value === optionId;
    const isHovered = hoveredId === optionId && !isActive;
    const isDisabled = disabled || optionDisabled;

    const baseStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '26px',
      padding: '10px',
      borderRadius: '4px',
      flex: '1 1 0',
      minWidth: '1px',
      minHeight: '1px',
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'background-color 0.15s ease',
    };

    if (isActive) {
      if (type === 'primary') {
        return {
          ...baseStyle,
          backgroundColor: 'var(--color-button-primary, #2d75e2)',
        };
      }
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-blue-100, #e7f1ff)',
        border: '1px solid var(--color-stroke-medium, #91a0b3)',
      };
    }

    if (isHovered && !isDisabled) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-surface-medium, #dee5ef)',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: 'transparent',
    };
  };

  const getLabelColor = (optionId: string): string => {
    const isActive = value === optionId;

    if (isActive) {
      if (type === 'primary') {
        return 'var(--color-text-white, white)';
      }
      return 'var(--color-text-primary, black)';
    }

    return 'var(--color-text-secondary, #4d5c6e)';
  };

  const handleOptionClick = (optionId: string, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return;
    onChange(optionId);
  };

  return (
    <div
      className={className}
      style={{ ...getContainerStyle(), ...style }}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          disabled={disabled || option.disabled}
          style={getOptionStyle(option.id, option.disabled)}
          onClick={() => handleOptionClick(option.id, option.disabled)}
          onMouseEnter={() => setHoveredId(option.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Text variant="body12Medium" style={{ color: getLabelColor(option.id), whiteSpace: 'nowrap' }}>
            {option.label}
          </Text>
        </button>
      ))}
    </div>
  );
}
