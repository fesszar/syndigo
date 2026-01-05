import type { CSSProperties } from 'react';
import type { SelectMenuProps, SelectMenuItemProps } from './types';

/**
 * Checkmark icon for selected state
 */
function CheckIcon() {
  return (
    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
      <path
        d="M1 2.5L2.5 4L6 1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * SelectMenuItem component
 */
function SelectMenuItem({
  option,
  selected = false,
  showCheckbox = false,
  onClick,
  onKeyDown,
  focused = false,
}: SelectMenuItemProps) {
  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '28px',
    padding: '0 7px',
    borderRadius: '4px',
    backgroundColor: focused || selected ? 'var(--color-surface-medium, #dee5ef)' : 'transparent',
    cursor: option.disabled ? 'not-allowed' : 'pointer',
    opacity: option.disabled ? 0.5 : 1,
    border: 'none',
    width: '100%',
    textAlign: 'left',
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-primary, black)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexGrow: 1,
  };

  const checkboxStyle: CSSProperties = {
    width: '17px',
    height: '17px',
    borderRadius: '2px',
    border: selected
      ? '1px solid var(--color-system-focus, #2d75e2)'
      : '1.5px solid var(--color-text-tertiary, #91a0b3)',
    backgroundColor: selected ? 'var(--color-system-focus, #2d75e2)' : 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const iconStyle: CSSProperties = {
    width: '16px',
    height: '16px',
    flexShrink: 0,
    color: focused ? 'var(--color-grey-600, #4d5c6e)' : 'var(--color-icon-secondary, #718094)',
  };

  const handleClick = () => {
    if (!option.disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      style={itemStyle}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      {option.icon && <span style={iconStyle}>{option.icon}</span>}
      {showCheckbox && (
        <span style={checkboxStyle}>
          {selected && <CheckIcon />}
        </span>
      )}
      <span style={labelStyle}>{option.label}</span>
    </button>
  );
}

/**
 * SelectMenu component
 * 
 * A dropdown menu with selectable items.
 * Supports single and multi-select modes.
 */
export function SelectMenu({
  options,
  value,
  multiple = false,
  onChange,
  maxHeight = 200,
  className,
  style,
}: SelectMenuProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    padding: '7px',
    boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
    ...style,
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
    maxHeight: `${maxHeight}px`,
    overflowY: 'auto',
  };

  const isSelected = (optionValue: string): boolean => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleSelect = (optionValue: string) => {
    if (!onChange) return;

    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const { key } = e;

    if (key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.min(index + 1, options.length - 1);
      focusItem(nextIndex);
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = Math.max(index - 1, 0);
      focusItem(prevIndex);
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      handleSelect(options[index].value);
    } else if (key === 'Home') {
      e.preventDefault();
      focusItem(0);
    } else if (key === 'End') {
      e.preventDefault();
      focusItem(options.length - 1);
    }
  };

  const focusItem = (index: number) => {
    const items = document.querySelectorAll('[role="option"]');
    if (items[index]) {
      (items[index] as HTMLElement).focus();
    }
  };

  return (
    <div
      className={className}
      style={containerStyle}
      role="listbox"
      aria-multiselectable={multiple}
    >
      <div style={listStyle}>
        {options.map((option, index) => (
          <SelectMenuItem
            key={option.value}
            option={option}
            selected={isSelected(option.value)}
            showCheckbox={multiple}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}
