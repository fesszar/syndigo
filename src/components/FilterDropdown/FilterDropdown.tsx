import * as React from 'react';
import type { CSSProperties } from 'react';
import { Button } from '../Button';
import type {
  FilterDropdownProps,
  FilterDropdownType,
  CheckboxItemProps,
  FilterPill,
} from './types';

// Container styles
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--color-surface-white, white)',
  borderRadius: '6px',
  boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
  overflow: 'hidden',
};

// Header styles
const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 10px',
  backgroundColor: 'var(--color-surface-light, #f7f9fb)',
  borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
};

const headerLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-secondary, #4d5c6e)',
};

// Body styles
const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  gap: '10px',
  flexGrow: 1,
};

// Footer styles
const footerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '9px 12px',
  backgroundColor: 'var(--color-surface-white, white)',
  borderTop: '1px solid var(--color-stroke-light, #dee5ef)',
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
};

// Dropdown select styles
const dropdownStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '34px',
  padding: '11px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '17px',
  color: 'var(--color-text-primary, black)',
  cursor: 'pointer',
};

// Search input styles
const searchInputStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '34px',
  padding: '10px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
};

const searchTextStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '17px',
  color: 'var(--color-text-tertiary, #91a0b3)',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  flexGrow: 1,
};

// Checkbox item styles
const checkboxItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '26px',
  padding: '3px 13px',
  borderRadius: '4px',
  cursor: 'pointer',
};

const checkboxStyle: CSSProperties = {
  width: '16px',
  height: '16px',
  borderRadius: '2px',
  border: '1.5px solid var(--color-text-tertiary, #91a0b3)',
  backgroundColor: 'var(--color-surface-white, white)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const checkboxCheckedStyle: CSSProperties = {
  ...checkboxStyle,
  backgroundColor: 'var(--color-button-primary, #2d75e2)',
  borderColor: 'var(--color-button-primary, #2d75e2)',
};

const checkboxLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
};

// Toggle pill styles (for boolean)
const toggleContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'var(--color-surface-light, #f7f9fb)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  padding: '4px',
};

const togglePillStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '26px',
  padding: '10px',
  borderRadius: '4px',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '17px',
  cursor: 'pointer',
  flexGrow: 1,
};

const togglePillActiveStyle: CSSProperties = {
  ...togglePillStyle,
  backgroundColor: 'var(--color-button-primary, #2d75e2)',
  color: 'var(--color-text-white, white)',
};

const togglePillInactiveStyle: CSSProperties = {
  ...togglePillStyle,
  backgroundColor: 'transparent',
  color: 'var(--color-text-secondary, #4d5c6e)',
};

// Input field styles
const inputFieldStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '34px',
  padding: '9px 6px 9px 9px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
};

const inputStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '17px',
  color: 'var(--color-text-primary, black)',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  flexGrow: 1,
};

const unitBadgeStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '4px 6px',
  backgroundColor: 'var(--color-surface-medium, #dee5ef)',
  borderRadius: '4px',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
};

// Filter pill styles (for nested)
const filterPillStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '34px',
  padding: '10px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
};

const filterPillTextStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '17px',
  color: 'var(--color-text-link, #2d75e2)',
};

// Field label style
const fieldLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '9px',
  fontWeight: 500,
  lineHeight: '11px',
  color: 'var(--color-text-secondary, #4d5c6e)',
  marginBottom: '4px',
};

// Icons
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5" stroke="#91a0b3" strokeWidth="1.5" />
      <path d="M12 12L15 15" stroke="#91a0b3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 7L9 11L13 7" stroke="#91a0b3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="#4d5c6e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#2d75e2" strokeWidth="1.5" />
      <path d="M9 6V12M6 9H12" stroke="#2d75e2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Checkbox Item Component
function CheckboxItem({ label, checked, onChange, disabled }: CheckboxItemProps) {
  return (
    <div
      style={checkboxItemStyle}
      onClick={() => !disabled && onChange(!checked)}
      role="checkbox"
      aria-checked={checked}
    >
      <div style={checked ? checkboxCheckedStyle : checkboxStyle}>
        {checked && <CheckIcon />}
      </div>
      <span style={checkboxLabelStyle}>{label}</span>
    </div>
  );
}

// Filter Pill Component
function FilterPillItem({ 
  pill, 
  onRemove 
}: { 
  pill: FilterPill; 
  onRemove: () => void;
}) {
  return (
    <div style={filterPillStyle}>
      <span style={filterPillTextStyle}>
        {pill.attribute} {pill.operator} {pill.value}
      </span>
      <button
        type="button"
        onClick={onRemove}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

// Get container width by type
function getContainerWidth(type: FilterDropdownType): string {
  switch (type) {
    case 'date':
      return '533px';
    case 'workflow':
      return '428px';
    case 'nested':
      return '391px';
    case 'UOM':
      return '264px';
    default:
      return '242px';
  }
}

/**
 * FilterDropdown component for filtering data
 * Supports multiple filter types: multiselect, value, boolean, UOM, date, workflow, nested
 */
export function FilterDropdown({
  type,
  label,
  open = true,
  options = [],
  selectedValues = [],
  operator = 'is',
  operators = [{ label: 'Is', value: 'is' }],
  booleanValue = true,
  minValue = '',
  maxValue = '',
  unit = 'mm',
  inputValue = '',
  filterPills = [],
  searchQuery = '',
  searchPlaceholder = 'Search',
  disabled = false,
  showReset = false,
  onApply,
  onClose,
  onReset,
  onSelectionChange,
  onBooleanChange,
  onInputChange,
  onRangeChange,
  onSearchChange,
  onRemoveFilterPill,
  onAddNestedFilter,
  className,
  style,
}: FilterDropdownProps) {
  if (!open) return null;

  const containerWidth = getContainerWidth(type);

  const renderBody = () => {
    switch (type) {
      case 'multiselect':
        return (
          <>
            {/* Operator dropdown */}
            <div style={dropdownStyle}>
              <span>{operators.find(o => o.value === operator)?.label || 'Is'}</span>
              <div style={{ transform: 'rotate(180deg)' }}>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Search input */}
            <div style={searchInputStyle}>
              <SearchIcon />
              <input
                type="text"
                style={searchTextStyle}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginTop: '8px' }}>
              {options.map((option) => (
                <CheckboxItem
                  key={option.value}
                  label={option.label}
                  checked={selectedValues.includes(option.value)}
                  onChange={(checked) => {
                    const newValues = checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter(v => v !== option.value);
                    onSelectionChange?.(newValues);
                  }}
                  disabled={disabled}
                />
              ))}
            </div>
          </>
        );

      case 'value':
        return (
          <>
            {/* Operator dropdown */}
            <div style={dropdownStyle}>
              <span>Has Value</span>
              <div style={{ transform: 'rotate(180deg)' }}>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Value input */}
            <div style={{ position: 'relative' }}>
              <div style={{ ...inputFieldStyle, border: '1.5px solid var(--color-button-primary, #2d75e2)', height: '38px' }}>
                <input
                  type="text"
                  style={inputStyle}
                  value={inputValue}
                  onChange={(e) => onInputChange?.(e.target.value)}
                  placeholder=""
                />
                <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <PlusIcon />
                </button>
              </div>
              <div style={{
                position: 'absolute',
                top: '-7px',
                left: '6px',
                padding: '0 3px',
                backgroundColor: 'var(--color-surface-white, white)',
                ...fieldLabelStyle,
              }}>
                Enter value
              </div>
            </div>
          </>
        );

      case 'boolean':
        return (
          <>
            {/* Operator dropdown */}
            <div style={dropdownStyle}>
              <span>Is</span>
              <div style={{ transform: 'rotate(180deg)' }}>
                <ChevronDownIcon />
              </div>
            </div>

            {/* True/False toggle */}
            <div style={toggleContainerStyle}>
              <div
                style={booleanValue ? togglePillActiveStyle : togglePillInactiveStyle}
                onClick={() => onBooleanChange?.(true)}
                role="button"
                tabIndex={0}
              >
                True
              </div>
              <div
                style={!booleanValue ? togglePillActiveStyle : togglePillInactiveStyle}
                onClick={() => onBooleanChange?.(false)}
                role="button"
                tabIndex={0}
              >
                False
              </div>
            </div>
          </>
        );

      case 'UOM':
        return (
          <>
            {/* Operator dropdown */}
            <div style={dropdownStyle}>
              <span>Between</span>
              <div style={{ transform: 'rotate(180deg)' }}>
                <ChevronDownIcon />
              </div>
            </div>

            {/* Min/Max inputs */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={inputFieldStyle}>
                <input
                  type="text"
                  style={inputStyle}
                  value={minValue}
                  onChange={(e) => onRangeChange?.(e.target.value, maxValue)}
                  placeholder="Min"
                />
                <div style={unitBadgeStyle}>
                  <span>{unit}</span>
                  <ChevronDownIcon />
                </div>
              </div>
              <div style={inputFieldStyle}>
                <input
                  type="text"
                  style={inputStyle}
                  value={maxValue}
                  onChange={(e) => onRangeChange?.(minValue, e.target.value)}
                  placeholder="Max"
                />
                <div style={unitBadgeStyle}>
                  <span>{unit}</span>
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </>
        );

      case 'workflow':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Row 1: Workflow + Step */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <div style={fieldLabelStyle}>Workflow</div>
                <div style={dropdownStyle}>
                  <span>Enrichment</span>
                  <div style={{ transform: 'rotate(180deg)' }}>
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={fieldLabelStyle}>Workflow Step</div>
                <div style={dropdownStyle}>
                  <span>Ready for copy</span>
                  <div style={{ transform: 'rotate(180deg)' }}>
                    <ChevronDownIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Assigned to */}
            <div>
              <div style={fieldLabelStyle}>Assigned to</div>
              <div style={dropdownStyle}>
                <span>Assigned to me</span>
                <div style={{ transform: 'rotate(180deg)' }}>
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>
        );

      case 'nested':
        return (
          <>
            {/* Match type dropdown + Add button */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ ...dropdownStyle, flexGrow: 1 }}>
                <span>Match in the same row</span>
                <div style={{ transform: 'rotate(180deg)' }}>
                  <ChevronDownIcon />
                </div>
              </div>
              <Button variant="primary" onClick={onAddNestedFilter}>
                Add
              </Button>
            </div>

            {/* Filter pills */}
            {filterPills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                {filterPills.map((pill) => (
                  <FilterPillItem
                    key={pill.id}
                    pill={pill}
                    onRemove={() => onRemoveFilterPill?.(pill.id)}
                  />
                ))}
              </div>
            )}
          </>
        );

      case 'date':
        return (
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Date picker placeholder */}
            <div style={{ flex: 1 }}>
              <div style={fieldLabelStyle}>Select Date</div>
              <div style={{
                border: '1px solid var(--color-stroke-light, #dee5ef)',
                borderRadius: '4px',
                padding: '12px',
                minHeight: '200px',
                backgroundColor: 'var(--color-surface-white, white)',
              }}>
                {/* Calendar placeholder */}
                <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary, #91a0b3)' }}>
                  Calendar
                </div>
              </div>
            </div>

            {/* Time picker placeholder */}
            <div style={{ flex: 1 }}>
              <div style={fieldLabelStyle}>Select Time</div>
              <div style={{
                border: '1px solid var(--color-stroke-light, #dee5ef)',
                borderRadius: '4px',
                padding: '12px',
                minHeight: '200px',
                backgroundColor: 'var(--color-surface-white, white)',
              }}>
                {/* Time picker placeholder */}
                <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary, #91a0b3)' }}>
                  Time Picker
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={className}
      style={{
        ...containerStyle,
        width: containerWidth,
        ...style,
      }}
    >
      {/* Header */}
      <div style={headerStyle}>
        <span style={headerLabelStyle}>{label}</span>
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        {renderBody()}
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <Button
          variant="secondary"
          onClick={onClose}
          style={{ flex: 1, height: '30px' }}
        >
          Close
        </Button>
        {showReset && (
          <Button
            variant="secondary"
            onClick={onReset}
            style={{ flex: 1, height: '30px', color: 'var(--color-system-critical, #db3a3a)' }}
          >
            Reset
          </Button>
        )}
        <Button
          variant="primary"
          onClick={onApply}
          style={{ flex: 1, height: '30px' }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
