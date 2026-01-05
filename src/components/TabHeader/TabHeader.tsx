import { useState, type CSSProperties } from 'react';
import type { TabHeaderProps, TabProps, TabHeaderSize } from './types';
import { LayoutIcon } from '../Icons';
import { Text } from '../Text';

/**
 * Tab component
 */
function Tab({ label, isActive, size = 'default', disabled, onClick }: TabProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getContainerStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 0 16px 0',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      borderBottom: isActive ? '2px solid var(--color-blue-500, #2d75e2)' : '2px solid transparent',
      background: 'none',
      border: 'none',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: isActive ? 'var(--color-blue-500, #2d75e2)' : 'transparent',
    };

    return baseStyle;
  };

  const getLabelColor = (): string => {
    if (isActive) {
      return 'var(--color-blue-500, #2d75e2)';
    }
    if (isHovered && !disabled) {
      return 'var(--color-text-primary, black)';
    }
    return 'var(--color-text-secondary, #4d5c6e)';
  };

  const textVariant = size === 'small' ? 'supporting11SemiboldCaps' : 'body13Medium';

  return (
    <button
      type="button"
      style={getContainerStyle()}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
    >
      <Text
        variant={textVariant}
        style={{
          color: getLabelColor(),
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {label}
      </Text>
    </button>
  );
}

/**
 * TabHeader component
 * 
 * A tab navigation header with selectable tabs.
 */
export function TabHeader({
  tabs,
  activeTab,
  onTabChange,
  size = 'default',
  showTrailingIcon = false,
  onTrailingIconClick,
  className,
  style,
}: TabHeaderProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '16px 16px 0 16px',
    backgroundColor: 'var(--color-surface-white, white)',
    position: 'relative',
    ...(size === 'small' && {
      borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    }),
    ...style,
  };

  const tabsContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    width: '100%',
  };

  const trailingIconStyle: CSSProperties = {
    position: 'absolute',
    right: '16.67px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  return (
    <div className={className} style={containerStyle} role="tablist">
      <div style={tabsContainerStyle}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            size={size}
            disabled={tab.disabled}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
      {showTrailingIcon && (
        <button
          type="button"
          style={trailingIconStyle}
          onClick={onTrailingIconClick}
          aria-label="Toggle layout"
        >
          <LayoutIcon />
        </button>
      )}
    </div>
  );
}
