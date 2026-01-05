import type { CSSProperties } from 'react';

/**
 * Avatar type variants (from Figma)
 */
export type AvatarType = 'initials' | 'icon' | 'image';

/**
 * Avatar size variants (from Figma)
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /**
   * Content type
   * @default 'initials'
   */
  type?: AvatarType;

  /**
   * Size variant
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Image source URL (for type="image")
   */
  src?: string;

  /**
   * Alt text for image
   */
  alt?: string;

  /**
   * Initials to display (for type="initials")
   * If not provided, will be generated from name prop
   */
  initials?: string;

  /**
   * Full name (used to generate initials if initials prop not provided)
   */
  name?: string;

  /**
   * Callback when image fails to load (falls back to initials)
   */
  onImageError?: () => void;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: CSSProperties;
}
