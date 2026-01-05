import type { CSSProperties } from 'react';
import type { PageHeaderProps, BreadcrumbItem, RecipientSelectorProps } from './types';

/**
 * Breadcrumb separator (slash icon)
 */
function BreadcrumbSeparator() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4.5 2.5L7.5 6L4.5 9.5"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Globe icon for RecipientSelector
 */
function GlobeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="7.5" cy="7.5" r="6" stroke="#718094" strokeWidth="1.2" />
      <ellipse cx="7.5" cy="7.5" rx="3" ry="6" stroke="#718094" strokeWidth="1.2" />
      <path d="M1.5 7.5H13.5" stroke="#718094" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * RecipientSelector component
 * Displays locale/recipient selection button
 */
export function RecipientSelector({
  label,
  icon,
  onClick,
  className,
  style,
}: RecipientSelectorProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '34px',
    padding: '10px',
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '16px',
    color: 'var(--color-text-primary, black)',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      className={className}
      style={containerStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon || <GlobeIcon />}
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

/**
 * PageHeader component
 * 
 * Displays page title with optional breadcrumbs and action buttons.
 * Uses slot pattern for flexible composition.
 */
export function PageHeader({
  title,
  breadcrumbs = [],
  actions,
  showBorder = true,
  className,
  style,
}: PageHeaderProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px',
    backgroundColor: 'var(--color-surface-white, white)',
    borderBottom: showBorder ? '1px solid var(--color-stroke-light, #dee5ef)' : 'none',
    isolation: 'isolate',
    ...style,
  };

  const breadcrumbContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    padding: '4px',
    flexGrow: 1,
    maxWidth: '900px',
    minWidth: '1px',
    minHeight: '1px',
    zIndex: 2,
  };

  const breadcrumbLinkStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    color: 'var(--color-text-secondary, #4d5c6e)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
    cursor: 'pointer',
  };

  const titleStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
    color: 'var(--color-text-primary, black)',
    whiteSpace: 'nowrap',
  };

  const actionsContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
    zIndex: 1,
  };

  const renderBreadcrumbs = () => {
    const items: JSX.Element[] = [];

    breadcrumbs.forEach((item: BreadcrumbItem, index: number) => {
      items.push(
        <span
          key={`breadcrumb-${index}`}
          style={breadcrumbLinkStyle}
          onClick={item.onClick}
          role={item.onClick ? 'button' : undefined}
          tabIndex={item.onClick ? 0 : undefined}
        >
          {item.label}
        </span>
      );
      items.push(<BreadcrumbSeparator key={`separator-${index}`} />);
    });

    return items;
  };

  return (
    <header className={className} style={containerStyle}>
      <div style={breadcrumbContainerStyle}>
        {renderBreadcrumbs()}
        <span style={titleStyle}>{title}</span>
      </div>

      {actions && (
        <div style={actionsContainerStyle}>
          {actions}
        </div>
      )}
    </header>
  );
}
