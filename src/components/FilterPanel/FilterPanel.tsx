import * as React from 'react';
import type { CSSProperties } from 'react';
import { Button } from '../Button';
import type {
  FilterPanelProps,
  FilterBoxProps,
  FilterListItemProps,
  FilterSection,
} from './types';

// Panel container styles
const panelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--color-surface-white, white)',
  borderRadius: '4px',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
  overflow: 'hidden',
};

const compactPanelStyle: CSSProperties = {
  ...panelStyle,
  backgroundColor: 'var(--color-surface-light, #f7f9fb)',
  padding: '20px',
};

// Header styles
const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px',
  borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
};

const titleStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '18px',
  color: 'var(--color-text-primary, black)',
  margin: 0,
};

const headerActionsStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

// Search input styles
const searchContainerStyle: CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
};

const searchInputStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  height: '34px',
  padding: '8px 12px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--color-text-primary, black)',
  outline: 'none',
};

// Body styles
const bodyStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  gap: '12px',
  flexGrow: 1,
  overflowY: 'auto',
};

const gridBodyStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(211px, 1fr))',
  gap: '12px',
  padding: '12px',
  flexGrow: 1,
  overflowY: 'auto',
};

// Filter box styles
const filterBoxStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--color-surface-light, #f7f9fb)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '6px',
  overflow: 'hidden',
  minWidth: '211px',
};

const filterBoxHeaderStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '34px',
  padding: '8px',
  backgroundColor: 'var(--color-surface-medium, #dee5ef)',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
};

const filterBoxTitleStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
  margin: 0,
};

const filterBoxListStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '7px',
  overflow: 'hidden',
};

// List item styles
const listItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  height: '28px',
  padding: '0 7px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
};

const listItemHoverStyle: CSSProperties = {
  backgroundColor: 'var(--color-surface-medium, #dee5ef)',
};

const listItemSelectedStyle: CSSProperties = {
  backgroundColor: 'var(--color-blue-100, #e8f1fd)',
};

const listItemLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-secondary, #4d5c6e)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L2 6L9 10L16 6L9 2Z" fill="#718094" />
      <path d="M2 9L9 13L16 9" stroke="#718094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L9 16L16 12" stroke="#718094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 9H12M12 9L9 6M12 9L9 12" stroke="#718094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="2" width="14" height="14" rx="7" stroke="#718094" strokeWidth="1.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 9L8 11L12 7" stroke="#718094" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="7" stroke="#718094" strokeWidth="1.5" />
    </svg>
  );
}

// Filter List Item Component
function FilterListItem({ label, selected, disabled, onClick }: FilterListItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const itemStyle: CSSProperties = {
    ...listItemStyle,
    ...(selected && listItemSelectedStyle),
    ...(isHovered && !selected && listItemHoverStyle),
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <div
      style={itemStyle}
      onClick={() => !disabled && onClick?.()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      <span style={listItemLabelStyle}>{label}</span>
    </div>
  );
}

// Filter Box Component
export function FilterBox({
  title,
  icon,
  items,
  collapsed = false,
  onToggle,
  onItemClick,
  className,
  style,
}: FilterBoxProps) {
  return (
    <div className={className} style={{ ...filterBoxStyle, ...style }}>
      <div
        style={filterBoxHeaderStyle}
        onClick={onToggle}
        role={onToggle ? 'button' : undefined}
        tabIndex={onToggle ? 0 : undefined}
      >
        {icon || <LayersIcon />}
        <p style={filterBoxTitleStyle}>{title}</p>
      </div>
      {!collapsed && (
        <div style={filterBoxListStyle}>
          {items.map((item) => (
            <FilterListItem
              key={item.id}
              label={item.label}
              selected={item.selected}
              disabled={item.disabled}
              onClick={() => onItemClick?.(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Get icon for section type
function getSectionIcon(title: string): React.ReactNode {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('workflow')) return <WorkflowIcon />;
  if (lowerTitle.includes('publication') || lowerTitle.includes('status')) return <CheckCircleIcon />;
  return <LayersIcon />;
}

/**
 * FilterPanel component for filtering data
 * Displays filter sections with collapsible boxes and action buttons
 */
export function FilterPanel({
  variant = 'default',
  title = 'Filter',
  sections,
  showSearch = false,
  searchPlaceholder = 'Search attributes',
  searchValue = '',
  showHeader = true,
  clearAllText = 'Clear All',
  applyText = 'Apply',
  applyDisabled = false,
  onSearchChange,
  onClearAll,
  onApply,
  onItemClick,
  onSectionToggle,
  className,
  style,
  children,
}: FilterPanelProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={className}
      style={{
        ...(isCompact ? compactPanelStyle : panelStyle),
        ...style,
      }}
    >
      {/* Header with actions */}
      {showHeader && !isCompact && (
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <div style={headerActionsStyle}>
            <Button variant="text" onClick={onClearAll}>
              {clearAllText}
            </Button>
            <Button variant="primary" onClick={onApply} disabled={applyDisabled}>
              {applyText}
            </Button>
          </div>
        </div>
      )}

      {/* Search input */}
      {showSearch && !isCompact && (
        <div style={searchContainerStyle}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: '12px' }}>
              <SearchIcon />
            </div>
            <input
              type="text"
              style={{ ...searchInputStyle, paddingLeft: '40px' }}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Filter sections grid */}
      <div style={isCompact ? bodyStyle : gridBodyStyle}>
        {sections.map((section) => (
          <FilterBox
            key={section.id}
            title={section.title}
            icon={section.icon || getSectionIcon(section.title)}
            items={section.items}
            collapsed={section.collapsed}
            onToggle={() => onSectionToggle?.(section.id)}
            onItemClick={(itemId) => onItemClick?.(section.id, itemId)}
          />
        ))}
        {children}
      </div>
    </div>
  );
}
