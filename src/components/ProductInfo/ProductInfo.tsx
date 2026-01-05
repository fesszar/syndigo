import type { CSSProperties } from 'react';
import type { ProductInfoProps, ProductInfoState } from './types';

/**
 * Chevron down icon
 */
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * More/ellipsis icon
 */
function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="4" r="1.5" fill="currentColor" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * State-based styles
 */
const stateStyles: Record<ProductInfoState, {
  background: string;
  opacity: number;
  cursor: string;
}> = {
  default: {
    background: 'var(--color-surface-white, white)',
    opacity: 1,
    cursor: 'pointer',
  },
  hover: {
    background: 'var(--color-surface-light, #f7f9fb)',
    opacity: 1,
    cursor: 'pointer',
  },
  disabled: {
    background: 'var(--color-surface-white, white)',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

/**
 * Badge type colors
 */
const badgeColors: Record<string, string> = {
  critical: 'var(--color-system-critical, #db3a3a)',
  success: 'var(--color-system-success, #0e8662)',
  warning: 'var(--color-system-warning, #f58319)',
  neutral: 'var(--color-grey-500, #4d5c6e)',
  default: 'var(--color-grey-500, #4d5c6e)',
};

/**
 * ProductInfo component
 * 
 * A generic info row for displaying item details with optional
 * avatar, badge, and trailing actions. No domain-specific logic.
 */
export function ProductInfo({
  type = 'metadata',
  level = 'main',
  state = 'default',
  title,
  subtitle,
  metaItems = [],
  leadingContent,
  showBadge = false,
  badgeCount,
  badgeType = 'default',
  trailingIcon,
  showTrailingIcon = true,
  onClick,
  className,
  style,
}: ProductInfoProps) {
  const styles = stateStyles[state];

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '8px 16px',
    backgroundColor: styles.background,
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    opacity: styles.opacity,
    cursor: styles.cursor,
    ...style,
  };

  const leftWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexGrow: 1,
    minWidth: 0,
  };

  const textWrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 0,
    flexGrow: 1,
  };

  const titleStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-primary, black)',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const subtitleStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-secondary, #4d5c6e)',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const metaStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-secondary, #4d5c6e)',
  };

  const rightWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    flexShrink: 0,
  };

  const badgeStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 3px',
    backgroundColor: badgeColors[badgeType],
    borderRadius: '4px',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '16px',
    color: 'white',
  };

  const iconButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '8px',
    color: 'var(--color-icon-secondary, #718094)',
  };

  const handleClick = () => {
    if (state !== 'disabled' && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Render meta items with separators
  const renderMetaItems = () => {
    if (metaItems.length === 0) return null;
    
    return (
      <div style={metaStyle}>
        {metaItems.map((item, index) => (
          <span key={index}>
            {index > 0 && <span style={{ margin: '0 2px' }}>·</span>}
            <span>{item}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={state === 'disabled' ? -1 : 0}
      className={className}
      style={containerStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={state === 'disabled'}
    >
      {/* Left Wrapper */}
      <div style={leftWrapperStyle}>
        {/* Leading content (avatar/thumbnail) */}
        {leadingContent}

        {/* Text content */}
        <div style={textWrapperStyle}>
          <p style={titleStyle}>{title}</p>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          {metaItems.length > 0 && renderMetaItems()}
        </div>
      </div>

      {/* Right Wrapper */}
      <div style={rightWrapperStyle}>
        {/* Badge */}
        {showBadge && badgeCount !== undefined && (
          <div style={badgeStyle}>{badgeCount}</div>
        )}

        {/* Trailing icon */}
        {showTrailingIcon && (
          <div style={iconButtonStyle}>
            {trailingIcon || (type === 'metadata' ? <ChevronDownIcon /> : <MoreIcon />)}
          </div>
        )}
      </div>
    </div>
  );
}
