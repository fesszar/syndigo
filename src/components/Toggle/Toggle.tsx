import type { CSSProperties } from 'react';
import type { ToggleProps } from './types';
import { Text } from '../Text';

/**
 * Toggle component
 * 
 * A boolean toggle switch (on/off control).
 * 
 * Note: This is DIFFERENT from Switcher, which is a segmented control
 * for selecting between multiple options. Toggle is for binary on/off states.
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29646
 */
export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  subtext,
  required = false,
  ariaLabel,
  className,
  style,
}: ToggleProps) {
  const getTrackStyle = (): CSSProperties => {
    let backgroundColor: string;

    if (disabled) {
      backgroundColor = 'var(--color-text-tertiary, #91a0b3)';
    } else if (checked) {
      backgroundColor = 'var(--color-button-primary, #2d75e2)';
    } else {
      backgroundColor = 'var(--color-text-secondary, #4d5c6e)';
    }

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      width: '28.8px',
      height: '16px',
      padding: '1.6px',
      backgroundColor,
      borderRadius: '16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.15s ease, justify-content 0.15s ease',
      flexShrink: 0,
    };
  };

  const knobStyle: CSSProperties = {
    width: '12.8px',
    height: '12.8px',
    borderRadius: '50%',
    backgroundColor: 'white',
    flexShrink: 0,
    transition: 'transform 0.15s ease',
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    ...style,
  };

  const labelContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    justifyContent: 'center',
  };

  const labelRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={className} style={containerStyle}>
      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={ariaLabel || label}
        tabIndex={disabled ? -1 : 0}
        style={getTrackStyle()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div style={knobStyle} />
      </div>
      {(label || subtext) && (
        <div style={labelContainerStyle}>
          {label && (
            <div style={labelRowStyle}>
              <Text
                variant="body12Medium"
                style={{ color: 'var(--color-text-secondary, #4d5c6e)' }}
              >
                {label}
              </Text>
              {required && (
                <Text
                  variant="body12Medium"
                  style={{ color: 'var(--color-system-critical, #db3a3a)' }}
                >
                  *
                </Text>
              )}
            </div>
          )}
          {subtext && (
            <Text
              variant="supporting11Medium"
              style={{ color: 'var(--color-text-secondary, #4d5c6e)' }}
            >
              {subtext}
            </Text>
          )}
        </div>
      )}
    </div>
  );
}
