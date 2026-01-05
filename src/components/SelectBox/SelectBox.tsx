import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { SelectBoxProps, SelectBoxRowProps, SelectBoxRowType } from './types';

/**
 * Search icon
 */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="#718094" strokeWidth="1.5" />
      <path d="M11 11L14 14" stroke="#718094" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Plus icon
 */
function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 4V14M4 9H14" stroke="#2d75e2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Close/X icon
 */
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 5L13 13M13 5L5 13" stroke="#4d5c6e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Drag handle icon
 */
function DragIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="6" r="1.5" fill="#718094" />
      <circle cx="15" cy="6" r="1.5" fill="#718094" />
      <circle cx="9" cy="12" r="1.5" fill="#718094" />
      <circle cx="15" cy="12" r="1.5" fill="#718094" />
      <circle cx="9" cy="18" r="1.5" fill="#718094" />
      <circle cx="15" cy="18" r="1.5" fill="#718094" />
    </svg>
  );
}

/**
 * SelectBoxRow component
 */
function SelectBoxRow({
  option,
  type = 'add',
  showDragHandle = false,
  onClick,
}: SelectBoxRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '7px 10px',
    backgroundColor: isHovered
      ? 'var(--color-surface-light, #f7f9fb)'
      : 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    cursor: option.disabled ? 'not-allowed' : 'pointer',
    opacity: option.disabled ? 0.5 : 1,
    width: '100%',
  };

  const leadingStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const textContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const primaryLabelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: '14px',
    color: 'var(--color-text-primary, black)',
  };

  const secondaryLabelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '9px',
    fontWeight: 500,
    lineHeight: '12px',
    color: 'var(--color-text-secondary, #4d5c6e)',
  };

  const iconStyle: CSSProperties = {
    width: '18px',
    height: '18px',
    flexShrink: 0,
  };

  const dragHandleStyle: CSSProperties = {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    cursor: 'grab',
  };

  const handleClick = () => {
    if (!option.disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      style={rowStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="option"
      aria-disabled={option.disabled}
    >
      <div style={leadingStyle}>
        {showDragHandle && (
          <span style={dragHandleStyle}>
            <DragIcon />
          </span>
        )}
        <div style={textContainerStyle}>
          <span style={primaryLabelStyle}>{option.label}</span>
          {option.secondaryLabel && (
            <span style={secondaryLabelStyle}>{option.secondaryLabel}</span>
          )}
        </div>
      </div>
      <span style={iconStyle}>
        {type === 'add' ? <PlusIcon /> : <CloseIcon />}
      </span>
    </div>
  );
}

/**
 * SelectBox component
 * 
 * A form-like picker with search and selectable rows.
 * Use for transfer list patterns (add/remove items).
 */
export function SelectBox({
  options,
  value = [],
  rowType = 'add',
  showSearch = true,
  searchPlaceholder = 'Search...',
  showDragHandle = false,
  onChange,
  onItemClick,
  onSearchChange,
  maxHeight = 400,
  className,
  style,
}: SelectBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    overflow: 'hidden',
    ...style,
  };

  const searchContainerStyle: CSSProperties = {
    backgroundColor: 'var(--color-surface-light, #f7f9fb)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    padding: '10px 13px',
  };

  const searchInputWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '34px',
    padding: '5px 10px',
    backgroundColor: 'white',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  };

  const searchInputStyle: CSSProperties = {
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-primary, black)',
    backgroundColor: 'transparent',
  };

  const optionsContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 13px 0',
    maxHeight: `${maxHeight}px`,
    overflowY: 'auto',
    flexGrow: 1,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleItemClick = (option: typeof options[0]) => {
    onItemClick?.(option);

    if (onChange) {
      if (rowType === 'add') {
        if (!value.includes(option.value)) {
          onChange([...value, option.value]);
        }
      } else {
        onChange(value.filter((v) => v !== option.value));
      }
    }
  };

  const filteredOptions = searchQuery
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <div className={className} style={containerStyle} role="listbox">
      {showSearch && (
        <div style={searchContainerStyle}>
          <div style={searchInputWrapperStyle}>
            <SearchIcon />
            <input
              type="text"
              style={searchInputStyle}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search options"
            />
          </div>
        </div>
      )}
      <div style={optionsContainerStyle}>
        {filteredOptions.map((option) => (
          <SelectBoxRow
            key={option.value}
            option={option}
            type={rowType}
            showDragHandle={showDragHandle}
            onClick={() => handleItemClick(option)}
          />
        ))}
      </div>
    </div>
  );
}
