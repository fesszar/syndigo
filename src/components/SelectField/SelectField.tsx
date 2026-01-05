import * as React from 'react';
import type { CSSProperties } from 'react';
import { InputField } from '../InputField';
import type { SelectFieldProps, SelectFieldState, SelectOption } from './types';

// Base trigger styles
const baseTriggerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  height: '34px',
  padding: '5px 10px',
  borderRadius: 'var(--radius-sm, 4px)',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  cursor: 'pointer',
  transition: 'border-color 0.15s ease',
  boxSizing: 'border-box',
};

// State-specific styles
const stateStyles: Record<SelectFieldState, CSSProperties> = {
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

// Dropdown styles
const dropdownStyle: CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  marginTop: '4px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
  zIndex: 1000,
  overflow: 'hidden',
};

const optionStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  height: '28px',
  padding: '0 7px',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
  cursor: 'pointer',
  borderRadius: '4px',
};

const optionHoverStyle: CSSProperties = {
  backgroundColor: 'var(--color-surface-medium, #dee5ef)',
};

// Chevron Icon
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        flexShrink: 0,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * SelectField component for dropdown selection
 * Features label, dropdown menu with optional search
 */
export function SelectField({
  label,
  required = false,
  helpText,
  errorText,
  placeholder = 'Select text',
  options,
  value,
  state = 'default',
  open: controlledOpen,
  showSearch = false,
  searchPlaceholder = 'Search',
  fullWidth = false,
  disabled,
  onChange,
  onOpenChange,
  className,
  style,
}: SelectFieldProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [internalState, setInternalState] = React.useState<SelectFieldState>(state);
  const [searchValue, setSearchValue] = React.useState('');
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const isDisabled = disabled || state === 'disabled';
  const isError = state === 'error' || !!errorText;
  const effectiveState = isDisabled ? 'disabled' : isError ? 'error' : isOpen ? 'active' : internalState;

  const selectedOption = options.find(o => o.value === value);

  const filteredOptions = searchValue
    ? options.filter(o => o.label.toLowerCase().includes(searchValue.toLowerCase()))
    : options;

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: fullWidth ? '100%' : '218px',
    ...style,
  };

  const triggerStyle: CSSProperties = {
    ...baseTriggerStyle,
    ...stateStyles[effectiveState],
    width: '100%',
  };

  const handleToggle = () => {
    if (isDisabled) return;
    const newOpen = !isOpen;
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setInternalOpen(false);
    onOpenChange?.(false);
    setSearchValue('');
  };

  const handleMouseEnter = () => {
    if (!isDisabled && !isOpen) setInternalState('hover');
  };

  const handleMouseLeave = () => {
    if (!isDisabled && !isOpen) setInternalState('default');
  };

  const inputFieldState = isError ? 'error' : isDisabled ? 'disabled' : 'default';

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
      <div
        style={triggerStyle}
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={isDisabled ? -1 : 0}
      >
        <span style={{
          flex: 1,
          fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '14px',
          color: selectedOption ? 'var(--color-text-primary, black)' : 'var(--color-text-tertiary, #91a0b3)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <div style={dropdownStyle}>
          {showSearch && (
            <div style={{ padding: '7px' }}>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{
                  width: '100%',
                  height: '34px',
                  padding: '5px 10px',
                  border: '1px solid var(--color-stroke-light, #dee5ef)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
                  fontSize: '12px',
                  fontWeight: 500,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div style={{ padding: '4px', maxHeight: '200px', overflowY: 'auto' }}>
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                style={{
                  ...optionStyle,
                  ...(hoveredOption === option.value ? optionHoverStyle : {}),
                  opacity: option.disabled ? 0.5 : 1,
                  cursor: option.disabled ? 'not-allowed' : 'pointer',
                }}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.icon}
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </InputField>
  );
}
