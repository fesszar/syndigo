/**
 * Syndigo Design System - Lit Elements
 * 
 * A Lit-based component library for building Syndigo applications.
 * Designed to work alongside Shoelace components.
 * 
 * @packageDocumentation
 */

// Import tokens CSS for side effects
import './tokens/tokens.css';

// Export all components
export * from './components/index.js';

// Export color tokens for TypeScript usage
export { colors, basePalette, colorTokens } from './tokens/colors.js';
export type { Colors, BasePalette, ColorTokens } from './tokens/colors.js';
