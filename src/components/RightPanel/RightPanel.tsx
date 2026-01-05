import type { CSSProperties } from 'react';
import type { RightPanelProps } from './types';
import { CloseIcon } from '../Icons';
import { Text } from '../Text';

/**
 * RightPanel component
 * 
 * A generic side panel container with slots for header tabs,
 * title section, stats, filters, and content.
 * No routing/business logic - all content passed via props/children.
 */
export function RightPanel({
  title,
  headerAction,
  tabs = [],
  activeTab,
  onTabChange,
  onClose,
  statsContent,
  filterContent,
  children,
  width = 376,
  open = true,
  className,
  style,
}: RightPanelProps) {
  if (!open) {
    return null;
  }

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: typeof width === 'number' ? `${width}px` : width,
    height: '100%',
    backgroundColor: 'white',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    overflow: 'hidden',
    ...style,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    flexShrink: 0,
  };

  const tabsContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const tabButtonStyle = (isActive: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    padding: 0,
    background: 'none',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: isActive ? 'var(--color-system-focus, #2d75e2)' : 'var(--color-icon-secondary, #718094)',
  });

  const closeButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14px',
    height: '14px',
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  const titleSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    flexShrink: 0,
  };

  const titleStyle: CSSProperties = {
    color: 'var(--color-text-primary, black)',
    margin: 0,
  };

  const headerActionStyle: CSSProperties = {
    color: 'var(--color-system-focus, #2d75e2)',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const statsSectionStyle: CSSProperties = {
    display: 'flex',
    gap: '12px',
    padding: '12px 16px',
    flexShrink: 0,
  };

  const filterSectionStyle: CSSProperties = {
    padding: '0 16px 12px',
    flexShrink: 0,
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'auto',
    padding: '0 16px 16px',
  };

  return (
    <div className={className} style={containerStyle} role="complementary">
      {/* Header with tabs */}
      {tabs.length > 0 && (
        <div style={headerStyle}>
          <div style={tabsContainerStyle}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                style={tabButtonStyle(tab.id === activeTab)}
                onClick={() => onTabChange?.(tab.id)}
                aria-label={tab.label}
                aria-pressed={tab.id === activeTab}
              >
                {tab.icon}
              </button>
            ))}
          </div>
          {onClose && (
            <button
              type="button"
              style={closeButtonStyle}
              onClick={onClose}
              aria-label="Close panel"
            >
              <CloseIcon size={14} color="#718094" />
            </button>
          )}
        </div>
      )}

      {/* Title section */}
      {(title || headerAction) && (
        <div style={titleSectionStyle}>
          {title && (
            <Text as="h2" variant="heading16Semibold" style={titleStyle}>
              {title}
            </Text>
          )}
          {headerAction && (
            <Text variant="body12Medium" style={headerActionStyle}>
              {headerAction}
            </Text>
          )}
        </div>
      )}

      {/* Stats section */}
      {statsContent && <div style={statsSectionStyle}>{statsContent}</div>}

      {/* Filter section */}
      {filterContent && <div style={filterSectionStyle}>{filterContent}</div>}

      {/* Main content */}
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
