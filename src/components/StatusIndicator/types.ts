import type { CSSProperties } from 'react';

/**
 * StatusIndicator Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22496:28818
 * 
 * A pill-shaped status indicator with colored dot and label.
 * 
 * IMPORTANT: These status types are from the Design System.
 * Do NOT invent new status types.
 */

/**
 * Status types from Design System
 * - default: Blue (#2d75e2) - Primary/default status
 * - neutral: Grey (#718094) - Informational/neutral status
 * - warning: Orange (#f58319) - Warning status
 * - critical: Red (#db3a3a) - Critical/error status
 * - success: Green (#0e8662) - Success status
 */
export type StatusIndicatorType = 'default' | 'neutral' | 'warning' | 'critical' | 'success';

export interface StatusIndicatorProps {
  /** Status type */
  type?: StatusIndicatorType;
  /** Label text */
  label: string;
  /** Hide label (show only dot) */
  hideLabel?: boolean;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
