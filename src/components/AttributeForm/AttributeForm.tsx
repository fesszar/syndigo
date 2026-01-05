import type { CSSProperties, ReactNode } from 'react';
import type { AttributeFormProps } from './types';

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--color-surface-white)',
  boxSizing: 'border-box',
};

const attributesWrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 var(--spacing-16, 16px)',
  boxSizing: 'border-box',
};

const attributeWrapperStyle: CSSProperties = {
  paddingTop: '24px',
  boxSizing: 'border-box',
};

export function AttributeForm({
  children,
  className,
  style,
}: AttributeFormProps) {
  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      {children}
    </div>
  );
}

// Compound component for wrapping attribute rows
AttributeForm.Attributes = function AttributeFormAttributes({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...attributesWrapperStyle, ...style }}>
      {children}
    </div>
  );
};

// Compound component for individual attribute wrapper (provides spacing)
AttributeForm.AttributeWrapper = function AttributeFormAttributeWrapper({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...attributeWrapperStyle, ...style }}>
      {children}
    </div>
  );
};
