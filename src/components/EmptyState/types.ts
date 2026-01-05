import type { CSSProperties, ReactNode } from 'react';

/**
 * EmptyState type variants from Figma
 * - recipient: No linked recipients (building icon)
 * - search: No search results (search icon)
 * - tasks: All tasks completed (sun icon)
 */
export type EmptyStateType = 'recipient' | 'search' | 'tasks';

export interface EmptyStateProps {
  /** Preset type variant (provides default icon, title, description) */
  type?: EmptyStateType;
  /** Custom icon element (overrides type default) */
  icon?: ReactNode;
  /** Title text (overrides type default) */
  title?: string;
  /** Description text (overrides type default) */
  description?: string;
  /** Action button label */
  actionLabel?: string;
  /** Action button click handler */
  onAction?: () => void;
  /** Hide the container border and background */
  noBorder?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
