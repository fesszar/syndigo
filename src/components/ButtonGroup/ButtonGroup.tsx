import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { ButtonProps } from '../Button';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupAlignment = 'start' | 'center' | 'end';

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation;
  align?: ButtonGroupAlignment;
  gap?: number | string;
  attached?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const alignmentMap: Record<ButtonGroupAlignment, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

export function ButtonGroup({
  orientation = 'horizontal',
  align = 'end',
  gap = 8,
  attached = false,
  fullWidth = false,
  className,
  style,
  children,
}: ButtonGroupProps) {
  const isHorizontal = orientation === 'horizontal';

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: isHorizontal ? 'center' : alignmentMap[align],
    justifyContent: isHorizontal ? alignmentMap[align] : 'center',
    gap: attached ? 0 : (typeof gap === 'number' ? `${gap}px` : gap),
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  // If attached, modify children to have connected borders/radii
  if (attached) {
    return (
      <div className={className} style={containerStyle}>
        {renderAttachedChildren(children, isHorizontal)}
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      {children}
    </div>
  );
}

function renderAttachedChildren(children: ReactNode, isHorizontal: boolean): ReactNode {
  const childArray = getValidChildren(children);
  const count = childArray.length;

  return childArray.map((child, index) => {
    const isFirst = index === 0;
    const isLast = index === count - 1;

    const attachedStyle: CSSProperties = isHorizontal
      ? {
          // Horizontal attached: adjust border-radius
          borderRadius: isFirst
            ? 'var(--radius-sm) 0 0 var(--radius-sm)'
            : isLast
            ? '0 var(--radius-sm) var(--radius-sm) 0'
            : '0',
          // Remove right border for non-last items to avoid double borders
          ...(isLast ? {} : { borderRight: 'none', marginRight: '-1px' }),
        }
      : {
          // Vertical attached: adjust border-radius
          borderRadius: isFirst
            ? 'var(--radius-sm) var(--radius-sm) 0 0'
            : isLast
            ? '0 0 var(--radius-sm) var(--radius-sm)'
            : '0',
          // Remove bottom border for non-last items to avoid double borders
          ...(isLast ? {} : { borderBottom: 'none', marginBottom: '-1px' }),
        };

    // Clone the child with attached styling
    if (isValidButtonElement(child)) {
      return cloneButtonWithStyle(child, attachedStyle, index);
    }

    return child;
  });
}

function getValidChildren(children: ReactNode): ReactElement[] {
  const childArray: ReactElement[] = [];
  
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (isValidElement(child)) {
        childArray.push(child);
      }
    });
  } else if (isValidElement(children)) {
    childArray.push(children);
  }
  
  return childArray;
}

function isValidElement(child: unknown): child is ReactElement {
  return (
    child !== null &&
    child !== undefined &&
    typeof child === 'object' &&
    'type' in child &&
    'props' in child
  );
}

function isValidButtonElement(child: ReactElement): child is ReactElement<ButtonProps> {
  return typeof child.type === 'function' || typeof child.type === 'object';
}

function cloneButtonWithStyle(
  child: ReactElement<ButtonProps>,
  attachedStyle: CSSProperties,
  key: number
): ReactElement {
  const existingStyle = child.props.style || {};
  
  return {
    ...child,
    key: child.key ?? key,
    props: {
      ...child.props,
      style: {
        ...existingStyle,
        ...attachedStyle,
      },
    },
  } as ReactElement;
}
