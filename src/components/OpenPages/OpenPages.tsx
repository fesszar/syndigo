import type { CSSProperties } from 'react';
import type { OpenPagesProps, OpenPagesType, PageTypeConfig } from './types';

/**
 * Page type configuration mapping
 * Maps each type to its label, background color, and text color
 */
const pageTypeConfigs: Record<OpenPagesType, PageTypeConfig> = {
  digitalAssets: {
    label: 'Digital Assets',
    backgroundColor: '#cbffb7',
    textColor: '#4d5c6e',
  },
  product: {
    label: 'Product',
    backgroundColor: '#c8deff',
    textColor: '#4d5c6e',
  },
  rdm: {
    label: 'Reference Data Management',
    backgroundColor: '#ffd6b0',
    textColor: '#4d5c6e',
  },
  edit: {
    label: 'Currently Editing',
    backgroundColor: 'transparent',
    textColor: '#4d5c6e',
    hasIcon: true,
  },
  productDetails: {
    label: 'Product Details',
    backgroundColor: '#5291f0',
    textColor: '#efefef',
  },
  tdm: {
    label: 'Taxonomy Data Management',
    backgroundColor: '#ffd6d6',
    textColor: '#4d5c6e',
  },
  bulkEdit: {
    label: 'Bulk Edit',
    backgroundColor: '#4d5c6e',
    textColor: '#efefef',
  },
  settings: {
    label: 'Settings',
    backgroundColor: '#dee5ef',
    textColor: '#4d5c6e',
  },
  syndication: {
    label: 'Syndication',
    backgroundColor: '#d1fff1',
    textColor: '#4d5c6e',
  },
  reporting: {
    label: 'Reporting',
    backgroundColor: '#505050',
    textColor: 'white',
  },
  apps: {
    label: 'Apps',
    backgroundColor: '#8fedd0',
    textColor: '#4d5c6e',
  },
  backgroundTasks: {
    label: 'Background Tasks',
    backgroundColor: '#d4b3ff',
    textColor: '#4d5c6e',
  },
};

// Edit icon SVG
function EditIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M6.5 2.5L9.5 5.5M1.5 10.5L2.25 7.5L8.5 1.25C8.91421 0.835786 9.58579 0.835786 10 1.25L10.75 2C11.1642 2.41421 11.1642 3.08579 10.75 3.5L4.5 9.75L1.5 10.5Z"
        stroke="#4d5c6e"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * OpenPages component
 * 
 * Displays a colored pill badge indicating an open page/section.
 * Used in navigation, tabs, or breadcrumbs to show active pages.
 */
export function OpenPages({
  type,
  label: customLabel,
  onClick,
  className,
  style,
}: OpenPagesProps) {
  const config = pageTypeConfigs[type];
  const displayLabel = customLabel || config.label;

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: config.hasIcon ? '2px' : undefined,
    padding: '2px 10px',
    borderRadius: '40px',
    backgroundColor: config.backgroundColor,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const textStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '9px',
    fontWeight: 500,
    lineHeight: '11px',
    color: config.textColor,
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
      {config.hasIcon && <EditIcon />}
      <span style={textStyle}>{displayLabel}</span>
    </div>
  );
}

/**
 * OpenPagesList component
 * 
 * Renders a list of open page badges.
 * UI-only - no routing logic.
 */
export interface OpenPagesListProps {
  /** Array of page items to display */
  items: Array<{
    type: OpenPagesType;
    label?: string;
    id?: string;
  }>;
  /** Click handler for individual items */
  onItemClick?: (type: OpenPagesType, id?: string) => void;
  /** Gap between items */
  gap?: number;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export function OpenPagesList({
  items,
  onItemClick,
  gap = 5,
  direction = 'vertical',
  className,
  style,
}: OpenPagesListProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: 'flex-start',
    gap: `${gap}px`,
    flexWrap: direction === 'horizontal' ? 'wrap' : undefined,
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {items.map((item, index) => (
        <OpenPages
          key={item.id || `${item.type}-${index}`}
          type={item.type}
          label={item.label}
          onClick={onItemClick ? () => onItemClick(item.type, item.id) : undefined}
        />
      ))}
    </div>
  );
}
