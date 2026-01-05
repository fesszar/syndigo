import { useState, type CSSProperties } from 'react';
import type {
  TableProps,
  TableHeaderProps,
  TableHeaderCellProps,
  TableRowProps,
  TableCellProps,
} from './types';
import { SortIcon } from '../Icons';
import { Text } from '../Text';

/**
 * Table component - container for table content
 */
export function Table({ children, className, style }: TableProps) {
  const containerStyle: CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    ...style,
  };

  return (
    <div className={className} style={containerStyle} role="table">
      {children}
    </div>
  );
}

/**
 * TableHeader - header row container
 */
export function TableHeader({ children, className, style }: TableHeaderProps) {
  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    padding: '0 16px',
    backgroundColor: 'var(--color-surface-white, white)',
    ...style,
  };

  return (
    <div className={className} style={headerStyle} role="row">
      {children}
    </div>
  );
}

/**
 * TableHeaderCell - individual column header
 */
export function TableHeaderCell({
  children,
  sortable = false,
  sortDirection,
  onSort,
  width,
  className,
  style,
}: TableHeaderCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cellStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '40px',
    padding: '0 16px',
    flex: width ? `0 0 ${typeof width === 'number' ? `${width}px` : width}` : '1 1 0',
    minWidth: '1px',
    minHeight: '1px',
    cursor: sortable ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div
      className={className}
      style={cellStyle}
      role="columnheader"
      onClick={sortable ? onSort : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text
        variant="body12Medium"
        style={{
          color: 'var(--color-text-secondary, #4d5c6e)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </Text>
      {sortable && <SortIcon direction={sortDirection} />}
    </div>
  );
}

/**
 * TableRow - data row container
 */
export function TableRow({
  children,
  selected = false,
  onClick,
  className,
  style,
}: TableRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    padding: '0 16px',
    backgroundColor: selected
      ? 'var(--color-blue-100, #e7f1ff)'
      : isHovered
        ? 'var(--color-surface-light, #f7f9fb)'
        : 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background-color 0.15s ease',
    ...style,
  };

  return (
    <div
      className={className}
      style={rowStyle}
      role="row"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

/**
 * TableCell - individual data cell
 * 
 * For content, use existing DS components:
 * - StatusIndicator for status
 * - Avatar for users
 * - Button for actions
 */
export function TableCell({
  children,
  width,
  className,
  style,
}: TableCellProps) {
  const cellStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '40px',
    padding: '0 16px',
    flex: width ? `0 0 ${typeof width === 'number' ? `${width}px` : width}` : '1 1 0',
    minWidth: '1px',
    minHeight: '1px',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div className={className} style={cellStyle} role="cell">
      {typeof children === 'string' ? (
        <Text
          variant="body12Medium"
          style={{
            color: 'var(--color-text-primary, black)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}
