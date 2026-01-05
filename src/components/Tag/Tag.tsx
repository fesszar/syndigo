import { useState, type CSSProperties } from 'react';
import type { TagProps } from './types';
import { CloseIcon } from '../Icons';
import { Text } from '../Text';

/**
 * Tag component
 * 
 * A removable tag/chip component with label and optional close button.
 */
export function Tag({
  label,
  removable = true,
  onRemove,
  onClick,
  disabled = false,
  selected = false,
  className,
  style,
}: TagProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.15s ease',
    };

    // Focused state
    if (isFocused && !disabled) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-blue-100, #e7f1ff)',
        borderColor: 'var(--color-system-focus, #2d75e2)',
      };
    }

    // Selected or Hover state
    if ((selected || isHovered) && !disabled) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-surface-light, #f7f9fb)',
        borderColor: 'var(--color-stroke-medium, #91a0b3)',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
      };
    }

    // Disabled state
    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: 'var(--color-surface-white, white)',
        borderColor: 'var(--color-surface-medium, #dee5ef)',
      };
    }

    // Default state
    return {
      ...baseStyle,
      backgroundColor: 'var(--color-surface-white, white)',
      borderColor: 'var(--color-surface-medium, #dee5ef)',
    };
  };

  const getLabelColor = (): string => {
    return disabled
      ? 'var(--color-text-tertiary, #91a0b3)'
      : 'var(--color-text-primary, black)';
  };

  const closeIconColor = disabled ? '#91a0b3' : '#718094';

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
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
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (removable && onRemove) {
        onRemove();
      }
    }
  };

  return (
    <div
      className={className}
      style={{ ...getContainerStyle(), ...style }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Text variant="body12Medium" style={{ color: getLabelColor(), whiteSpace: 'nowrap' }}>
        {label}
      </Text>
      {removable && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          aria-label={`Remove ${label}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <CloseIcon color={closeIconColor} />
        </button>
      )}
    </div>
  );
}
