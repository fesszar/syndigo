import type { CSSProperties } from 'react';
import type { TabGroupProps } from './types';
import { Tab } from '../Tab';

/**
 * TabGroup component
 * 
 * A group of tabs with underline style.
 * Composes the existing Tab component for each tab item.
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29377
 */
export function TabGroup({
  tabs,
  activeTab,
  onTabChange,
  className,
  style,
  ariaLabel,
}: TabGroupProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    ...style,
  };

  return (
    <div
      className={className}
      style={containerStyle}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          badge={tab.badge}
          showMenu={tab.showMenu}
          onMenuClick={tab.onMenuClick}
          disabled={tab.disabled}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  );
}
