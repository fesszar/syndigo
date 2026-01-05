/**
 * Typography Tokens
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22399:214
 * 
 * Edge cases verified:
 * - 22399:277 "11-semibold-caps" MUST be uppercase
 * - 22399:281 "10-semibold-caps" MUST NOT be uppercase
 * - 22399:251 "13-semibold" baseline
 */

import type { CSSProperties } from 'react';

export interface TextStyle {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string | number;
  letterSpacing?: string;
  textTransform?: CSSProperties['textTransform'];
}

export const fontFamilies = {
  sans: 'Inter, sans-serif',
} as const;

export const fontWeights = {
  bold: 'var(--weight-font-weight-bold)',
  semibold: 'var(--weight-font-weight-semibold)',
  medium: 'var(--weight-font-weight-medium)',
} as const;

export const letterSpacing = {
  normal: 'var(--spacing-font-letter-spacing-normal)',
  dense: 'var(--spacing-font-letter-spacing-dense)',
} as const;

export const textStyles = {
  // Heading styles (20px, 16px)
  headingLg: {
    fontFamily: fontFamilies.sans,
    fontSize: '20px',
    lineHeight: '20px',
    fontWeight: 700,
    letterSpacing: '-0.2px',
  },
  heading16Bold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-md)',
    lineHeight: 'var(--line-height-font-line-height-md)',
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.normal,
  },
  heading16Semibold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-md)',
    lineHeight: 'var(--line-height-font-line-height-md)',
    fontWeight: fontWeights.semibold,
  },
  heading16Medium: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-md)',
    lineHeight: 'var(--line-height-font-line-height-md)',
    fontWeight: fontWeights.medium,
  },

  // Body styles (14px, 13px, 12px)
  body14Bold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-sm)',
    lineHeight: 'var(--line-height-font-line-height-sm)',
    fontWeight: fontWeights.bold,
  },
  body14Semibold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-sm)',
    lineHeight: 'var(--line-height-font-line-height-sm)',
    fontWeight: fontWeights.semibold,
  },
  body14Medium: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-sm)',
    lineHeight: 'var(--line-height-font-line-height-sm)',
    fontWeight: fontWeights.medium,
  },
  body13Semibold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-xs)',
    lineHeight: 'var(--line-height-font-line-height-xs)',
    fontWeight: fontWeights.semibold,
  },
  body13Medium: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-xs)',
    lineHeight: 'var(--line-height-font-line-height-xs)',
    fontWeight: fontWeights.medium,
  },
  body12Semibold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-2xs)',
    lineHeight: 'var(--line-height-font-line-height-2xs)',
    fontWeight: fontWeights.semibold,
  },
  body12Medium: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-2xs)',
    lineHeight: 'var(--line-height-font-line-height-2xs)',
    fontWeight: fontWeights.medium,
  },

  // Supporting styles (11px, 10px, 9px)
  supporting11Semibold: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-3xs)',
    lineHeight: 'var(--line-height-font-line-height-2xs)',
    fontWeight: fontWeights.semibold,
  },
  supporting11Medium: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-3xs)',
    lineHeight: 'var(--line-height-font-line-height-2xs)',
    fontWeight: fontWeights.medium,
  },
  // Edge case: 22399:277 - MUST be uppercase
  supporting11SemiboldCaps: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-3xs)',
    lineHeight: 'var(--line-height-font-line-height-2xs)',
    fontWeight: fontWeights.semibold,
    textTransform: 'uppercase' as const,
  },
  // Edge case: 22399:281 - MUST NOT be uppercase (despite name)
  supporting10SemiboldCaps: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-4xs)',
    lineHeight: 'var(--line-height-font-line-height-3xs)',
    fontWeight: fontWeights.semibold,
    // Note: No textTransform - per Figma source, this style is NOT uppercase
  },
  supporting9Medium: {
    fontFamily: fontFamilies.sans,
    fontSize: 'var(--size-font-size-5xs)',
    lineHeight: 'var(--line-height-font-line-height-3xs)',
    fontWeight: fontWeights.medium,
  },
} as const satisfies Record<string, TextStyle>;

export type TextStyleVariant = keyof typeof textStyles;
