import type { CSSProperties, ReactNode } from 'react';
import type { ActionBarProps, ActionBarVariant } from './types';

const baseContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-16, 16px)',
  boxSizing: 'border-box',
  overflow: 'hidden',
};

const variantStyles: Record<ActionBarVariant, CSSProperties> = {
  attributes: {
    backgroundColor: 'var(--color-surface-white)',
    borderBottom: '1px solid var(--color-stroke-light)',
    borderTopLeftRadius: 'var(--radius-sm)',
    borderTopRightRadius: 'var(--radius-sm)',
  },
  relationships: {
    backgroundColor: 'var(--color-surface-white)',
    borderBottom: '1px solid var(--color-stroke-light)',
    borderTopLeftRadius: 'var(--radius-sm)',
    borderTopRightRadius: 'var(--radius-sm)',
  },
  assets: {
    backgroundColor: 'var(--color-surface-white)',
    borderBottom: '1px solid var(--color-stroke-light)',
    borderTopLeftRadius: 'var(--radius-sm)',
    borderTopRightRadius: 'var(--radius-sm)',
  },
  productSearch: {
    backgroundColor: '#e7ecf4', // Figma: specific product search bg
    flexWrap: 'wrap',
    gap: '10px',
  },
};

const slotStyles: Record<string, CSSProperties> = {
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-16, 16px)',
    flexShrink: 0,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: 0,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-8, 8px)',
    flexShrink: 0,
  },
};

export function ActionBar({
  variant = 'attributes',
  left,
  center,
  right,
  showBorder = true,
  altBackground = false,
  className,
  style,
  children,
}: ActionBarProps) {
  const containerStyle: CSSProperties = {
    ...baseContainerStyle,
    ...variantStyles[variant],
    ...(altBackground && { backgroundColor: '#e7ecf4' }),
    ...(!showBorder && { border: 'none' }),
    ...style,
  };

  // If children provided, render them directly
  if (children) {
    return (
      <div className={className} style={containerStyle}>
        {children}
      </div>
    );
  }

  // Slot-based rendering
  const hasCenter = !!center;

  return (
    <div className={className} style={containerStyle}>
      {left && (
        <div style={slotStyles.left}>
          {left}
        </div>
      )}

      {hasCenter && (
        <div style={slotStyles.center}>
          {center}
        </div>
      )}

      {right && (
        <div style={slotStyles.right}>
          {right}
        </div>
      )}
    </div>
  );
}

// Compound components for slot content
ActionBar.Left = function ActionBarLeft({ 
  children, 
  style 
}: { 
  children: ReactNode; 
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...slotStyles.left, ...style }}>
      {children}
    </div>
  );
};

ActionBar.Center = function ActionBarCenter({ 
  children, 
  style 
}: { 
  children: ReactNode; 
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...slotStyles.center, ...style }}>
      {children}
    </div>
  );
};

ActionBar.Right = function ActionBarRight({ 
  children, 
  style 
}: { 
  children: ReactNode; 
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...slotStyles.right, ...style }}>
      {children}
    </div>
  );
};
