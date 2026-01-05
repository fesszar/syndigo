import type { CSSProperties, ReactNode } from 'react';

/**
 * PageHeader Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22488:19490
 */

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Click handler for navigation */
  onClick?: () => void;
  /** Whether this is the current/active page */
  isActive?: boolean;
}

export interface PageHeaderProps {
  /** Page title (required) */
  title: string;
  /** Breadcrumb trail (optional) - items before the title */
  breadcrumbs?: BreadcrumbItem[];
  /** Actions slot - rendered on the right side */
  actions?: ReactNode;
  /** Whether to show bottom border */
  showBorder?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface RecipientSelectorProps {
  /** Current locale/recipient display text */
  label: string;
  /** Icon element (optional) */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
