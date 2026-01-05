import type { CSSProperties, ReactNode } from 'react';

/**
 * Table Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22499:29218
 * 
 * A data table with header, rows, and cells.
 * Note: This is a DS-scoped table, not a full data-grid.
 * 
 * Reuses existing components:
 * - StatusIndicator for status cells
 * - Avatar for user cells
 * - Button for button cells
 */

export interface TableProps {
  /** Table content (header and rows) */
  children: ReactNode;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface TableHeaderProps {
  /** Header content (column headers) */
  children: ReactNode;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface TableHeaderCellProps {
  /** Column header label */
  children: ReactNode;
  /** Sortable */
  sortable?: boolean;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Sort handler */
  onSort?: () => void;
  /** Column width */
  width?: string | number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface TableRowProps {
  /** Row content (cells) */
  children: ReactNode;
  /** Selected state */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

export interface TableCellProps {
  /** Cell content */
  children?: ReactNode;
  /** Column width */
  width?: string | number;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
