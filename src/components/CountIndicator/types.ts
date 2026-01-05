import type { CSSProperties } from 'react';

/**
 * Count indicator type variants from Figma
 */
export type CountIndicatorType = 'default' | 'success' | 'warning' | 'critical' | 'neutral';

/**
 * Contrast level for the indicator
 * - Strong: Filled background with white text
 * - Subtle: White background with colored border and text
 */
export type CountIndicatorContrast = 'strong' | 'subtle';

export interface CountIndicatorProps {
  /** Numeric value to display */
  count: number;
  /** Maximum value before showing "99+" format (default: 99) */
  max?: number;
  /** Visual type/color variant */
  type?: CountIndicatorType;
  /** Contrast level */
  contrast?: CountIndicatorContrast;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
