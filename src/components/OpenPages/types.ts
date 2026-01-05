import type { CSSProperties } from 'react';

/**
 * OpenPages Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22486:19167
 * 
 * Page tag/badge component - colored pill badges indicating open pages/sections
 */

export type OpenPagesType =
  | 'digitalAssets'
  | 'product'
  | 'rdm'
  | 'edit'
  | 'productDetails'
  | 'tdm'
  | 'bulkEdit'
  | 'settings'
  | 'syndication'
  | 'reporting'
  | 'apps'
  | 'backgroundTasks';

export interface OpenPagesProps {
  /** Page type determines color and label */
  type: OpenPagesType;
  /** Custom label override (optional) */
  label?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface PageTypeConfig {
  label: string;
  backgroundColor: string;
  textColor: string;
  hasIcon?: boolean;
}
