import type { CSSProperties } from 'react';

/**
 * Status type for individual status items
 * From Figma: Success (green), Partial Success (orange), Processing (blue), Error (red)
 */
export type ComplexStatusType = 'success' | 'partialSuccess' | 'processing' | 'error';

/**
 * Individual status item data
 */
export interface StatusItem {
  /** Status type determines the dot color */
  type: ComplexStatusType;
  /** Numeric count to display */
  count: number;
  /** Label text (e.g., "Success", "Error") */
  label: string;
}

/**
 * Number of status items to display (1-4)
 * Controls layout: 1=single, 2=row, 3=mixed, 4=grid
 */
export type ComplexStatusLevels = 1 | 2 | 3 | 4;

export interface ComplexStatusProps {
  /** Array of status items to display (max 4) */
  items: StatusItem[];
  /** Number of levels/items to show (1-4) */
  levels?: ComplexStatusLevels;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}
