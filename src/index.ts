/**
 * Syndigo Design System
 * Main entry point - exports all tokens and components
 */

// Import CSS tokens (will be bundled)
import './tokens/tokens.css';

// Export tokens
export { tokens } from './tokens';
export type { Tokens } from './tokens';

// Export components
export * from './components';
