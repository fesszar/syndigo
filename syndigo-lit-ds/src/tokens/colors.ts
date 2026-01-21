/**
 * Color Tokens
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 13587:3966
 * 
 * This file exports typed color tokens referencing CSS variables.
 * All color usage in components MUST use these tokens.
 */

/**
 * Base Palette Colors
 * ⚠️ DO NOT USE DIRECTLY in components.
 * These are the raw color values from the design system.
 * Use semantic tokens instead for proper theming support.
 */
export const basePalette = {
  gray: {
    white: '#FFFFFF',
    100: '#F7F9FB',
    200: '#DEE5EF',
    300: '#91A0B3',
    400: '#718094',
    500: '#4D5C6E',
    black: '#000000',
  },
  blue: {
    100: '#E7F1FF',
    200: '#C2DBFF',
    300: '#8FBCFF',
    400: '#5A9AEF',
    500: '#2D75E2',
  },
  green: {
    100: '#E1FBF5',
    200: '#B3F5E3',
    300: '#66E5C3',
    400: '#2DBFA0',
    500: '#0E8662',
  },
  orange: {
    100: '#FFF4EB',
    200: '#FFD6B0',
    300: '#FCBA7D',
    400: '#FFA654',
    500: '#F58319',
  },
  red: {
    100: '#FFECEC',
    200: '#FFD6D6',
    300: '#FCA5A5',
    400: '#F17676',
    500: '#DB3A3A',
  },
  purple: {
    100: '#E9D9FF',
    200: '#D4B3FF',
    300: '#BF8DFF',
    400: '#AA66FF',
    500: '#9747FF',
  },
} as const;

/**
 * Semantic Color Tokens
 * ✅ USE THESE in components.
 * These tokens have semantic meaning and support theming/modes.
 */
export const colors = {
  text: {
    primary: 'var(--color-text-primary, #1d3261)',
    secondary: 'var(--color-text-secondary, #4D5C6E)',
    tertiary: 'var(--color-text-tertiary, #91A0B3)',
    link: 'var(--color-text-link, #2D75E2)',
    white: 'var(--color-text-white, #FFFFFF)',
  },
  icon: {
    primary: 'var(--color-icon-primary, #000000)',
    secondary: 'var(--color-icon-secondary, #718094)',
    tertiary: 'var(--color-icon-tertiary, #91A0B3)',
    link: 'var(--color-icon-link, #2D75E2)',
    white: 'var(--color-icon-white, #FFFFFF)',
  },
  surface: {
    white: 'var(--color-surface-white, #FFFFFF)',
    light: 'var(--color-surface-light, #F7F9FB)',
    medium: 'var(--color-surface-medium, #DEE5EF)',
    black: 'var(--color-surface-black, #000000)',
  },
  stroke: {
    light: 'var(--color-stroke-light, #DEE5EF)',
    medium: 'var(--color-stroke-medium, #91A0B3)',
  },
  button: {
    primary: 'var(--color-button-primary, #2D75E2)',
    primaryHover: 'var(--color-button-primary-hover, #5291f0)',
    primaryActive: 'var(--color-button-primary-active, #1a5bb8)',
    disabled: 'var(--color-button-disabled, #DEE5EF)',
  },
  system: {
    success: 'var(--color-system-success, #0E8662)',
    warning: 'var(--color-system-warning, #F58319)',
    critical: 'var(--color-system-critical, #DB3A3A)',
    info: 'var(--color-system-info, #2D75E2)',
  },
} as const;

export type BasePalette = typeof basePalette;
export type Colors = typeof colors;

/**
 * All color tokens combined for convenience.
 * Prefer using `colors` (semantic) over `basePalette` (raw).
 */
export const colorTokens = {
  base: basePalette,
  semantic: colors,
} as const;

export type ColorTokens = typeof colorTokens;
