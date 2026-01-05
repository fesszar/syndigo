import type { CSSProperties, ReactNode } from 'react';

/**
 * Size variants from Figma
 * - Large: 66px height, 16px value text
 * - Small: 60px height, 12px value text
 */
export type DataWellSize = 'large' | 'small';

/**
 * Visual states from Figma
 */
export type DataWellState = 'default' | 'hover' | 'active';

/**
 * Status indicator type for the dot color
 */
export type DataWellStatusType = 'default' | 'success' | 'warning' | 'critical' | 'info';

export interface DataWellProps {
  /** Label text displayed above the value */
  label: string;
  /** The main value to display */
  value: string | number;
  /** Size variant */
  size?: DataWellSize;
  /** Show status indicator dot */
  showStatusIndicator?: boolean;
  /** Status indicator type (determines dot color) */
  statusType?: DataWellStatusType;
  /** Show tooltip trigger (info icon) next to label */
  showTooltipTrigger?: boolean;
  /** Tooltip content (for aria-label) */
  tooltipContent?: string;
  /** Action button label */
  actionLabel?: string;
  /** Action button click handler */
  onActionClick?: () => void;
  /** Click handler for the whole card (for selectable wells) */
  onClick?: () => void;
  /** Whether the well is currently selected/active */
  isActive?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Custom content to render in the value slot */
  children?: ReactNode;
}
