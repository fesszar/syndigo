import type { CSSProperties, ReactNode } from 'react';

/**
 * PDPSidePanel Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22493:23238
 * 
 * Generic side panel for displaying item details.
 * No product-specific logic - use props to pass data.
 */

export interface SidePanelMetaField {
  /** Field label (e.g., "Created By") */
  label: string;
  /** Field value (e.g., "Jessica James") */
  value: string;
}

export interface PDPSidePanelProps {
  /** Whether to show loading skeleton */
  loading?: boolean;
  /** Image URL */
  imageUrl?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Title text */
  title?: string;
  /** Type/category label */
  typeLabel?: string;
  /** Type icon (optional ReactNode) */
  typeIcon?: ReactNode;
  /** Item identifier */
  itemId?: string;
  /** Metadata fields */
  metaFields?: SidePanelMetaField[];
  /** Whether item is favorited */
  isFavorite?: boolean;
  /** Favorite button click handler */
  onFavoriteClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
