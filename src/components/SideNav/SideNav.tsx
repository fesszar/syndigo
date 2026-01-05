import type { CSSProperties } from 'react';
import type { SideNavProps, SideNavMenuItemProps } from './types';

/**
 * Hamburger menu icon
 */
function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H21M3 12H21M3 18H21" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * SideNavMenuItem component
 */
function SideNavMenuItem({ item, collapsed = false }: SideNavMenuItemProps) {
  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: collapsed ? '0' : '8px',
    height: '30px',
    padding: collapsed ? '4px 8px' : '4px 8px',
    borderRadius: '4px',
    backgroundColor: item.active
      ? 'var(--color-surface-black, black)'
      : 'var(--color-surface-white, white)',
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    width: '100%',
    border: 'none',
    textAlign: 'left',
    position: 'relative',
  };

  const iconStyle: CSSProperties = {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    color: item.active ? 'white' : 'var(--color-icon-tertiary, #91a0b3)',
  };

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '16px',
    color: item.active ? 'white' : 'var(--color-text-secondary, #4d5c6e)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexGrow: 1,
  };

  const handleClick = () => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
  };

  return (
    <button type="button" style={itemStyle} onClick={handleClick}>
      <span style={iconStyle}>{item.icon}</span>
      {!collapsed && <span style={labelStyle}>{item.label}</span>}
    </button>
  );
}

/**
 * SideNav component
 * 
 * A collapsible side navigation with menu items,
 * action buttons, sections, and badges.
 */
export function SideNav({
  state = 'expanded',
  onToggle,
  logo,
  logoIcon,
  actionButtons = [],
  sections = [],
  footer,
  className,
  style,
}: SideNavProps) {
  const collapsed = state === 'collapsed';

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: collapsed ? '68px' : '206px',
    height: '100%',
    backgroundColor: 'white',
    padding: '16px',
    boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
    transition: 'width 0.2s ease-in-out',
    ...style,
  };

  const mainWrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: collapsed ? '36px' : '174px',
  };

  const topWrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    paddingTop: collapsed ? '10px' : '0',
  };

  const hamburgerButtonStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  };

  const logoContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    flexGrow: 1,
  };

  const menuItemsContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  };

  const buttonsContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const actionButtonStyle = (hasBadge: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: collapsed ? '0' : '8px',
    height: '34px',
    padding: collapsed ? '8px' : '8px 10px',
    backgroundColor: 'white',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    position: 'relative',
  });

  const actionIconStyle: CSSProperties = {
    width: collapsed ? '20px' : '16px',
    height: collapsed ? '20px' : '16px',
    flexShrink: 0,
    color: 'var(--color-icon-secondary, #718094)',
  };

  const actionLabelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '16px',
    color: 'var(--color-text-primary, black)',
  };

  const badgeStyle: CSSProperties = {
    position: 'absolute',
    top: '-5px',
    right: collapsed ? '-5px' : 'auto',
    left: collapsed ? 'auto' : '23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '18px',
    padding: '2px 5px',
    backgroundColor: 'var(--color-grey-500, #4d5c6e)',
    borderRadius: '999px',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: '14px',
    color: 'white',
  };

  const sectionContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const dividerStyle: CSSProperties = {
    height: '1px',
    width: '100%',
    backgroundColor: 'var(--color-stroke-light, #dee5ef)',
  };

  const footerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: collapsed ? 'center' : 'flex-start',
    gap: '8px',
    justifyContent: 'flex-end',
  };

  const footerLabelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '14px',
    color: 'var(--color-text-secondary, #4d5c6e)',
  };

  return (
    <nav className={className} style={containerStyle} role="navigation">
      <div style={mainWrapperStyle}>
        {/* Top Section */}
        <div style={topWrapperStyle}>
          {/* Header with hamburger and logo */}
          <div style={headerStyle}>
            <button type="button" style={hamburgerButtonStyle} onClick={onToggle} aria-label="Toggle navigation">
              <HamburgerIcon />
            </button>
            {!collapsed && logo && <div style={logoContainerStyle}>{logo}</div>}
          </div>

          {/* Menu Items */}
          <div style={menuItemsContainerStyle}>
            {/* Action Buttons */}
            {actionButtons.length > 0 && (
              <div style={buttonsContainerStyle}>
                {actionButtons.map((button) => (
                  <button
                    key={button.id}
                    type="button"
                    style={actionButtonStyle(!!button.badge)}
                    onClick={button.onClick}
                  >
                    <span style={actionIconStyle}>{button.icon}</span>
                    {!collapsed && <span style={actionLabelStyle}>{button.label}</span>}
                    {button.badge !== undefined && button.badge > 0 && (
                      <span style={badgeStyle}>{button.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Menu Sections */}
            {sections.map((section, sectionIndex) => (
              <div key={section.id}>
                <div style={sectionContainerStyle}>
                  {section.items.map((item) => (
                    <SideNavMenuItem
                      key={item.id}
                      item={item}
                      collapsed={collapsed}
                    />
                  ))}
                </div>
                {sectionIndex < sections.length - 1 && <div style={{ ...dividerStyle, marginTop: '14px' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          {collapsed ? (
            logoIcon
          ) : (
            footer || (
              <>
                <span style={footerLabelStyle}>Powered by</span>
                {logoIcon}
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
