import type { CSSProperties } from 'react';

/**
 * Thumbnail Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29539
 * 
 * A thumbnail component for displaying images or placeholder icons.
 */

/**
 * Thumbnail size variants
 * - xsmall: 24x24
 * - small: 40x40
 * - default: 60x60
 * - large: 80x80
 */
export type ThumbnailSize = 'xsmall' | 'small' | 'default' | 'large';

/**
 * Thumbnail radius variants
 * - full: 8px
 * - half: 4px
 */
export type ThumbnailRadius = 'full' | 'half';

export interface ThumbnailProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Thumbnail size */
  size?: ThumbnailSize;
  /** Border radius */
  radius?: ThumbnailRadius;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
