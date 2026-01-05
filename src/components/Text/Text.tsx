import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { textStyles, type TextStyleVariant, type TextStyle } from '../../tokens/typography';

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  as?: ElementType;
  variant: TextStyleVariant;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Text({
  as: Component = 'span',
  variant,
  className,
  style,
  children,
  ...rest
}: TextProps) {
  const variantStyle: TextStyle = textStyles[variant];

  const computedStyle: CSSProperties = {
    fontFamily: variantStyle.fontFamily,
    fontSize: variantStyle.fontSize,
    lineHeight: variantStyle.lineHeight,
    fontWeight: variantStyle.fontWeight,
    letterSpacing: variantStyle.letterSpacing,
    textTransform: variantStyle.textTransform,
    ...style,
  };

  return (
    <Component className={className} style={computedStyle} {...rest}>
      {children}
    </Component>
  );
}
