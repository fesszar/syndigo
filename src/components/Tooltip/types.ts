import type { CSSProperties, ReactNode } from 'react';

/**
 * Tooltip Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22506:30008
 * 
 * A tooltip component for displaying contextual information.
 */

/**
 * Arrow direction/placement
 * - none: No arrow
 * - top: Arrow points up (tooltip appears below trigger)
 * - bottom: Arrow points down (tooltip appears above trigger)
 * - left: Arrow points left (tooltip appears to the right)
 * - right: Arrow points right (tooltip appears to the left)
 */
export type TooltipDirection = 'none' | 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Arrow direction (indicates where tooltip appears relative to trigger) */
  direction?: TooltipDirection;
  /** Unique id for aria-describedby linkage */
  id: string;
  /** Whether tooltip is visible */
  visible?: boolean;
  /** Max width of tooltip content */
  maxWidth?: number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
