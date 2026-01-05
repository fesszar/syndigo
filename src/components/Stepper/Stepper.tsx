import type { CSSProperties } from 'react';
import type { StepperProps, StepProps, StepState } from './types';
import { CheckIcon } from '../Icons';
import { ChevronRightIcon } from '../Icons';
import { Text } from '../Text';

/**
 * Step component
 */
function Step({ stepNumber, label, state = 'default' }: StepProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '11px',
  };

  const getCircleStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      width: '21px',
      height: '21px',
      borderRadius: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    };

    switch (state) {
      case 'completed':
        return {
          ...baseStyle,
          backgroundColor: 'var(--color-system-success, #0e8662)',
        };
      case 'active':
        return {
          ...baseStyle,
          backgroundColor: 'var(--color-blue-500, #2d75e2)',
        };
      default:
        return {
          ...baseStyle,
          border: '1px solid var(--color-stroke-medium, #91a0b3)',
          backgroundColor: 'transparent',
        };
    }
  };

  const getNumberColor = (): string => {
    switch (state) {
      case 'completed':
      case 'active':
        return 'white';
      default:
        return 'var(--color-text-secondary, #4d5c6e)';
    }
  };

  const getLabelColor = (): string => {
    switch (state) {
      case 'completed':
        return 'var(--color-text-primary, black)';
      case 'active':
        return 'var(--color-blue-500, #2d75e2)';
      default:
        return 'var(--color-text-secondary, #4d5c6e)';
    }
  };

  return (
    <div style={containerStyle}>
      <div style={getCircleStyle()}>
        {state === 'completed' ? (
          <CheckIcon />
        ) : (
          <Text variant="body13Medium" style={{ color: getNumberColor(), textAlign: 'center' }}>
            {stepNumber}
          </Text>
        )}
      </div>
      <Text variant="body12Medium" style={{ color: getLabelColor(), whiteSpace: 'nowrap' }}>
        {label}
      </Text>
    </div>
  );
}

/**
 * Stepper component
 * 
 * A multi-step progress indicator with step labels.
 */
export function Stepper({
  steps,
  activeStep = 0,
  orientation = 'horizontal',
  className,
  style,
}: StepperProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '4px',
    backgroundColor: 'white',
    ...style,
  };

  const getStepState = (index: number): StepState => {
    if (steps[index].state) {
      return steps[index].state!;
    }
    if (index < activeStep) {
      return 'completed';
    }
    if (index === activeStep) {
      return 'active';
    }
    return 'default';
  };

  return (
    <nav className={className} style={containerStyle} aria-label="Progress">
      {steps.map((step, index) => (
        <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Step
            stepNumber={index + 1}
            label={step.label}
            state={getStepState(index)}
          />
          {index < steps.length - 1 && <ChevronRightIcon />}
        </div>
      ))}
    </nav>
  );
}
