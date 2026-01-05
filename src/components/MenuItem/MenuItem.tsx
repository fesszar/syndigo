import type { CSSProperties } from 'react';
import type { MenuItemProps, MenuItemState } from './types';
import { Text } from '../Text';

/**
 * State-based styling configuration
 */
const stateStyles: Record<MenuItemState, { background: string; textColor: string }> = {
  default: {
    background: 'var(--color-surface-white, white)',
    textColor: 'var(--color-text-secondary, #4d5c6e)',
  },
  hover: {
    background: 'var(--color-surface-medium, #dee5ef)',
    textColor: 'var(--color-text-secondary, #4d5c6e)',
  },
  active: {
    background: 'var(--color-surface-black, black)',
    textColor: 'var(--color-text-white, white)',
  },
  disabled: {
    background: 'var(--color-surface-white, white)',
    textColor: 'var(--color-text-disabled, #91a0b3)',
  },
};

/**
 * MenuItem component
 * 
 * A menu item for navigation menus, dropdowns, and context menus.
 * Supports icons, badges, shortcuts, and multiple states.
 */
export function MenuItem({
  label,
  state = 'default',
  selected = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  badge,
  shortcut,
  collapsed = false,
  onClick,
  className,
  style,
}: MenuItemProps) {
  const currentState: MenuItemState = disabled ? 'disabled' : selected ? 'active' : state;
  const { background, textColor } = stateStyles[currentState];

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    gap: '16px',
    padding: collapsed ? '4px 8px' : '4px 8px',
    minHeight: '32px',
    backgroundColor: background,
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const leftWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexGrow: collapsed ? 0 : 1,
    minWidth: 0,
  };

  const iconWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    flexShrink: 0,
    color: currentState === 'active' ? 'white' : '#91a0b3',
  };

  const labelStyle: CSSProperties = {
    color: textColor,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 1,
    minWidth: 0,
  };

  const trailingWrapperStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  };

  const badgeStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 3px',
    backgroundColor: currentState === 'active' ? 'white' : 'var(--color-grey-500, #4d5c6e)',
    borderRadius: '4px',
  };

  const badgeTextColor = currentState === 'active' ? 'black' : 'white';

  const shortcutColor = currentState === 'active' ? 'rgba(255,255,255,0.7)' : '#91a0b3';

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={className}
      style={containerStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div style={leftWrapperStyle}>
        {leadingIcon && (
          <div style={iconWrapperStyle}>
            {leadingIcon}
          </div>
        )}
        {!collapsed && (
          <Text variant="body13Medium" style={labelStyle}>{label}</Text>
        )}
      </div>

      {!collapsed && (badge !== undefined || shortcut || trailingIcon) && (
        <div style={trailingWrapperStyle}>
          {badge !== undefined && (
            <span style={badgeStyle}>
              <Text variant="body13Medium" style={{ color: badgeTextColor }}>{badge}</Text>
            </span>
          )}
          {shortcut && (
            <Text variant="body12Medium" style={{ color: shortcutColor }}>{shortcut}</Text>
          )}
          {trailingIcon && (
            <div style={iconWrapperStyle}>
              {trailingIcon}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
