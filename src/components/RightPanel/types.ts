import type { CSSProperties, ReactNode } from 'react';

/**
 * RightPanel Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:25911
 * 
 * A generic side panel container component.
 * No routing/business logic - all content via slots.
 */

export interface RightPanelTab {
  /** Tab identifier */
  id: string;
  /** Tab icon */
  icon: ReactNode;
  /** Tab label (for a11y) */
  label: string;
  /** Whether tab is active */
  active?: boolean;
}

export interface RightPanelProps {
  /** Panel title */
  title?: string;
  /** Header action (e.g., "Manage Recipients" link) */
  headerAction?: ReactNode;
  /** Tab icons in header */
  tabs?: RightPanelTab[];
  /** Currently active tab id */
  activeTab?: string;
  /** Tab change handler */
  onTabChange?: (tabId: string) => void;
  /** Close handler */
  onClose?: () => void;
  /** Stats/summary section content */
  statsContent?: ReactNode;
  /** Search/filter section content */
  filterContent?: ReactNode;
  /** Main content (cards, lists, etc.) */
  children?: ReactNode;
  /** Panel width */
  width?: number | string;
  /** Whether panel is open */
  open?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
