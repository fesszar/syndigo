import type { CSSProperties } from 'react';
import type { EmptyStateProps, EmptyStateType } from './types';

// Default content by type
const defaultContent: Record<EmptyStateType, { title: string; description: string; actionLabel?: string }> = {
  recipient: {
    title: 'No linked recipients.',
    description: "Select the retailers or channels you'd like to share your product data with.",
    actionLabel: 'Add Recipients',
  },
  search: {
    title: 'No results found',
    description: 'No results matched your search criteria.',
    actionLabel: 'Clear Search',
  },
  tasks: {
    title: 'All caught up',
    description: 'No action needed at this time.',
  },
};

// Container styles
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '16px',
  overflow: 'hidden',
};

const containerNoBorderStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px',
};

// Icon container style
const iconContainerStyle: CSSProperties = {
  width: '50px',
  height: '50px',
  position: 'relative',
  overflow: 'hidden',
  color: 'var(--color-icon-tertiary, #91a0b3)',
};

// Text wrapper styles - base (Tasks uses 16px bottom padding, others use 32px)
const getTextWrapperStyle = (type: EmptyStateType): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  width: '320px',
  paddingTop: '16px',
  paddingBottom: type === 'tasks' ? '16px' : '32px',
  textAlign: 'center',
});

const titleStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '18px',
  color: 'var(--color-text-primary, black)',
  margin: 0,
  width: '100%',
};

const descriptionStyle: CSSProperties = {
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-tertiary, #91a0b3)',
  margin: 0,
  width: '100%',
};

// Button styles
const buttonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '34px',
  padding: '8px 10px',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'var(--color-text-primary, black)',
  cursor: 'pointer',
};

// Icons as inline SVG components
function BuildingIcon() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <rect x="18.75" y="6.25" width="12.5" height="37.5" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6.25" y="18.75" width="12.5" height="25" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="31.25" y="18.75" width="12.5" height="25" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="22.5" y1="12.5" x2="27.5" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22.5" y1="18.75" x2="27.5" y2="18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22.5" y1="25" x2="27.5" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="22.5" y="31.25" width="5" height="12.5" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <circle cx="22.5" cy="22.5" r="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32.5" y1="32.5" x2="43.75" y2="43.75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <circle cx="25" cy="25" r="10" stroke="currentColor" strokeWidth="2.5" />
      <line x1="25" y1="4" x2="25" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="25" y1="40" x2="25" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="25" x2="10" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="25" x2="46" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10.15" y1="10.15" x2="14.39" y2="14.39" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35.61" y1="35.61" x2="39.85" y2="39.85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10.15" y1="39.85" x2="14.39" y2="35.61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35.61" y1="14.39" x2="39.85" y2="10.15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Get default icon by type
function getDefaultIcon(type: EmptyStateType) {
  switch (type) {
    case 'recipient':
      return <BuildingIcon />;
    case 'search':
      return <SearchIcon />;
    case 'tasks':
      return <SunIcon />;
    default:
      return <BuildingIcon />;
  }
}

/**
 * EmptyState component for displaying empty/blank states
 * Supports preset types (recipient, search, tasks) with customizable content
 */
export function EmptyState({
  type = 'recipient',
  icon,
  title,
  description,
  actionLabel,
  onAction,
  noBorder = false,
  className,
  style,
}: EmptyStateProps) {
  const defaults = defaultContent[type];
  const displayTitle = title ?? defaults.title;
  const displayDescription = description ?? defaults.description;
  const displayActionLabel = actionLabel ?? defaults.actionLabel;
  const displayIcon = icon ?? getDefaultIcon(type);

  const baseStyle = noBorder ? containerNoBorderStyle : containerStyle;

  return (
    <div className={className} style={{ ...baseStyle, ...style }}>
      {/* Icon */}
      <div style={iconContainerStyle}>{displayIcon}</div>

      {/* Text wrapper */}
      <div style={getTextWrapperStyle(type)}>
        <p style={titleStyle}>{displayTitle}</p>
        <p style={descriptionStyle}>{displayDescription}</p>
      </div>

      {/* Action button */}
      {displayActionLabel && onAction && (
        <button type="button" style={buttonStyle} onClick={onAction}>
          {displayActionLabel}
        </button>
      )}
    </div>
  );
}
