/**
 * Design System Tokens
 * TypeScript token map for programmatic access to design tokens.
 * All values must match tokens.css exactly.
 */

export {
  textStyles,
  fontFamilies,
  fontWeights,
  letterSpacing,
  type TextStyle,
  type TextStyleVariant,
} from './typography';

export {
  colors,
  basePalette,
  colorTokens,
  type Colors,
  type BasePalette,
  type ColorTokens,
} from './colors';

export {
  spacing,
  type Spacing,
  type SpacingKey,
} from './spacing';

export {
  radius,
  type Radius,
  type RadiusKey,
} from './radius';

export {
  shadow,
  type Shadow,
  type ShadowKey,
} from './shadow';

export const tokens = {
  colors: {
    // Base palette (do not use directly)
    grayWhite: 'var(--color-gray-white)',
    blue100: 'var(--color-blue-100)',
    // Semantic - Text
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    // Semantic - Surface
    surfaceWhite: 'var(--color-surface-white)',
    surfaceBlack: 'var(--color-surface-black)',
    surfaceLight: 'var(--color-surface-light)',
    // Semantic - Stroke
    strokeLight: 'var(--color-stroke-light)',
  },
  typography: {
    fontSizeLg: 'var(--size-font-size-lg)',
    fontSizeMd: 'var(--size-font-size-md)',
    fontSizeSm: 'var(--size-font-size-sm)',
    fontSizeXs: 'var(--size-font-size-xs)',
    fontSize2xs: 'var(--size-font-size-2xs)',
    fontSize3xs: 'var(--size-font-size-3xs)',
    fontSize4xs: 'var(--size-font-size-4xs)',
    fontSize5xs: 'var(--size-font-size-5xs)',
    lineHeightLg: 'var(--line-height-font-line-height-lg)',
    lineHeightMd: 'var(--line-height-font-line-height-md)',
    lineHeightSm: 'var(--line-height-font-line-height-sm)',
    lineHeightXs: 'var(--line-height-font-line-height-xs)',
    lineHeight2xs: 'var(--line-height-font-line-height-2xs)',
    lineHeight3xs: 'var(--line-height-font-line-height-3xs)',
    letterSpacingNormal: 'var(--spacing-font-letter-spacing-normal)',
    letterSpacingDense: 'var(--spacing-font-letter-spacing-dense)',
    fontWeightBold: 'var(--weight-font-weight-bold)',
    fontWeightSemibold: 'var(--weight-font-weight-semibold)',
    fontWeightMedium: 'var(--weight-font-weight-medium)',
  },
  spacing: {
    0: '0px',
    2: '2px',
    4: '4px',
    6: '6px',
    8: '8px',
    12: '12px',
    16: '16px',
    24: '24px',
    32: '32px',
    48: '48px',
    64: '64px',
  },
  radius: {
    2: '2px',
    4: '4px',
    8: '8px',
    12: '12px',
    16: '16px',
  },
  shadow: {
    sm: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0px 14px 18px rgba(77, 92, 110, 0.15)',
    buttonPrimaryHover: '0px 0px 0px 3px rgba(45, 117, 226, 0.25)',
    buttonSecondaryDefault: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    buttonSecondaryHover: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    buttonCriticalHover: '0px 0px 0px 3px rgba(219, 58, 58, 0.25)',
  },
} as const;

export type Tokens = typeof tokens;
