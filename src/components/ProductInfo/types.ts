import type { CSSProperties, ReactNode } from 'react';

/**
 * ProductInfo Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22495:24089
 * 
 * A generic info row component for displaying item details.
 * No domain-specific data rules - all content passed via props.
 */

export type ProductInfoType = 'metadata' | 'product';

export type ProductInfoLevel = 'main' | 'sub';

export type ProductInfoState = 'default' | 'hover' | 'disabled';

export interface ProductInfoProps {
  /** Display type */
  type?: ProductInfoType;
  /** Row level (main or sub) */
  level?: ProductInfoLevel;
  /** Visual state */
  state?: ProductInfoState;
  /** Primary text/title */
  title: string;
  /** Secondary text/subtitle */
  subtitle?: string;
  /** Metadata items (displayed with separators) */
  metaItems?: string[];
  /** Leading content (avatar, thumbnail, icon) */
  leadingContent?: ReactNode;
  /** Show badge */
  showBadge?: boolean;
  /** Badge count/content */
  badgeCount?: number | string;
  /** Badge type for styling */
  badgeType?: 'critical' | 'success' | 'warning' | 'neutral' | 'default';
  /** Trailing icon/action */
  trailingIcon?: ReactNode;
  /** Show trailing icon */
  showTrailingIcon?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
