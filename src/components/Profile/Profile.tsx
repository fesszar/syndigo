import type { CSSProperties } from 'react';
import type { ProfileProps, ProfileMenuItem } from './types';

/**
 * Default avatar placeholder
 */
function DefaultAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const style: CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-surface-medium, #dee5ef)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary, black)',
  };

  return <div style={style}>{initials}</div>;
}

/**
 * Menu item component
 */
function MenuItem({ item }: { item: ProfileMenuItem }) {
  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    height: '38px',
    padding: '0 10px',
    backgroundColor: 'var(--color-surface-white, white)',
    border: 'none',
    borderTop: item.showSeparator ? '1px solid var(--color-stroke-light, #dee5ef)' : 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: item.destructive
      ? 'var(--color-system-critical, #db3a3a)'
      : 'var(--color-text-primary, black)',
    textAlign: 'left',
  };

  const iconStyle: CSSProperties = {
    width: '17px',
    height: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: item.destructive
      ? 'var(--color-system-critical, #db3a3a)'
      : 'var(--color-icon-secondary, #718094)',
  };

  return (
    <button type="button" style={style} onClick={item.onClick}>
      {item.icon && <span style={iconStyle}>{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );
}

/**
 * Profile component
 * 
 * A generic profile dropdown/card with avatar, name, meta info,
 * and optional menu items. No auth/user logic.
 */
export function Profile({
  avatar,
  name,
  email,
  role,
  menuItems = [],
  showMenu = true,
  className,
  style,
}: ProfileProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    ...style,
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    padding: '16px 14px',
    backgroundColor: 'var(--color-surface-light, #f7f9fb)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    boxSizing: 'border-box',
  };

  const headerContentStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  };

  const avatarWrapperStyle: CSSProperties = {
    flexShrink: 0,
  };

  const nameStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '20px',
    color: 'var(--color-text-primary, black)',
    margin: 0,
    wordBreak: 'break-word',
  };

  const metaStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-text-tertiary, #91a0b3)',
    margin: 0,
  };

  const menuStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '7px',
    backgroundColor: 'var(--color-surface-white, white)',
    borderLeft: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRight: '1px solid var(--color-stroke-light, #dee5ef)',
    borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    boxShadow: '0px 14px 18px rgba(77, 92, 110, 0.15)',
    boxSizing: 'border-box',
  };

  return (
    <div className={className} style={containerStyle}>
      {/* Header section */}
      <div style={headerStyle}>
        {/* Avatar + Name row */}
        <div style={headerContentStyle}>
          <div style={avatarWrapperStyle}>
            {avatar || <DefaultAvatar name={name} />}
          </div>
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <p style={nameStyle}>{name}</p>
          </div>
        </div>

        {/* Meta info */}
        {(email || role) && (
          <div style={metaStyle}>
            {email && <p style={{ margin: 0 }}>{email}</p>}
            {role && <p style={{ margin: 0 }}>{role}</p>}
          </div>
        )}
      </div>

      {/* Menu section */}
      {showMenu && menuItems.length > 0 && (
        <div style={menuStyle}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
