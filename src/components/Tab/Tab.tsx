import { useState, type CSSProperties } from 'react';
import type { TabComponentProps } from './types';
import { EllipsesVerticalIcon } from '../Icons';
import { Text } from '../Text';
import { CountIndicator } from '../CountIndicator';

/**
 * Tab component
 * 
 * A panel-style tab with optional badge count and menu icon.
 * Distinct from TabHeader - this is for panel-style tabs with badge and menu.
 */
export function Tab({
  label,
  isActive = false,
  badge,
  showMenu = false,
  onMenuClick,
  onClick,
  disabled = false,
  className,
  style,
}: TabComponentProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getContainerStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      background: 'none',
      border: 'none',
      borderBottom: '2px solid transparent',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      transition: 'all 0.15s ease',
    };

    if (isActive) {
      return {
        ...baseStyle,
        borderBottomColor: 'var(--color-system-focus, #2d75e2)',
      };
    }

    return baseStyle;
  };

  const getLabelColor = (): string => {
    if (isActive) {
      return 'var(--color-text-link, #2d75e2)';
    }
    if (isHovered && !disabled) {
      return 'var(--color-text-primary, black)';
    }
    return 'var(--color-text-secondary, #4d5c6e)';
  };

  const textVariant = isActive || (isHovered && !disabled) ? 'body12Semibold' : 'body12Medium';

  const menuButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <button
      type="button"
      className={className}
      style={{ ...getContainerStyle(), ...style }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
    >
      <Text
        variant={textVariant}
        style={{ color: getLabelColor(), textAlign: 'center', whiteSpace: 'nowrap' }}
      >
        {label}
      </Text>
      {badge !== undefined && (
        <CountIndicator count={badge} type="neutral" contrast="strong" />
      )}
      {showMenu && (
        <span
          role="button"
          style={menuButtonStyle}
          onClick={handleMenuClick}
          aria-label={`${label} menu`}
        >
          <EllipsesVerticalIcon />
        </span>
      )}
    </button>
  );
}
