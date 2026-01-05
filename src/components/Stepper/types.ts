import type { CSSProperties } from 'react';

/**
 * Stepper Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22496:28903
 * 
 * A multi-step progress indicator with step labels.
 */

/**
 * Step states
 * - default: Upcoming step (grey border, grey text)
 * - active: Current step (blue filled, blue text)
 * - completed: Finished step (green filled, checkmark, black text)
 */
export type StepState = 'default' | 'active' | 'completed';

export interface StepItem {
  /** Step identifier */
  id: string;
  /** Step label */
  label: string;
  /** Step state */
  state?: StepState;
}

export interface StepProps {
  /** Step number (1-indexed) */
  stepNumber: number;
  /** Step label */
  label: string;
  /** Step state */
  state?: StepState;
}

export interface StepperProps {
  /** Array of steps */
  steps: StepItem[];
  /** Current active step index (0-indexed) */
  activeStep?: number;
  /** Orientation */
  orientation?: 'horizontal';
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
