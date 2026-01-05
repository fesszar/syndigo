import type { CSSProperties } from 'react';

/**
 * ProgressBar Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22492:19788
 */

export type ProgressBarType = 'bar' | 'circle';

export type ProgressBarTone = 'default' | 'success' | 'critical' | 'warning';

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Minimum value (default: 0) */
  min?: number;
  /** Visual type */
  type?: ProgressBarType;
  /** Color tone/status */
  tone?: ProgressBarTone;
  /** Size for circle type (default: 48) */
  size?: number;
  /** Height for bar type (default: 14) */
  height?: number;
  /** Show percentage label (circle only) */
  showLabel?: boolean;
  /** Accessible label */
  ariaLabel?: string;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
