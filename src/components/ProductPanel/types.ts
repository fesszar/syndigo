import type { CSSProperties, ReactNode } from 'react';

/**
 * ProductPanel Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22490:19517
 * 
 * Product detail card for displaying product information
 */

export interface ProductMetaField {
  /** Field label (e.g., "Created By") */
  label: string;
  /** Field value (e.g., "Jessica James") */
  value: string;
}

export interface ProductPanelProps {
  /** Product image URL */
  imageUrl?: string;
  /** Product image alt text */
  imageAlt?: string;
  /** Product title/name */
  title: string;
  /** Product type label (e.g., "Item", "Asset") */
  typeLabel?: string;
  /** Product ID */
  productId?: string;
  /** Metadata fields to display */
  metaFields?: ProductMetaField[];
  /** Whether the product is favorited */
  isFavorite?: boolean;
  /** Callback when favorite button is clicked */
  onFavoriteClick?: () => void;
  /** Callback when the panel is clicked */
  onClick?: () => void;
  /** Custom icon for product type */
  typeIcon?: ReactNode;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
