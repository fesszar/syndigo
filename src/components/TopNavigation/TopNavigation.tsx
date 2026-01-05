import type { CSSProperties } from 'react';
import type { TopNavigationProps } from './types';
import { Text } from '../Text';
import { Avatar } from '../Avatar';

/**
 * Search icon component
 */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
        stroke="#718094"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Message notification icon
 */
function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C10.5937 20 9.27223 19.6372 8.12398 19"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12H16M8 8H12"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Bell notification icon
 */
function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.5 19C10.1562 20.1825 11.0004 21 12 21C12.9996 21 13.8438 20.1825 14.5 19"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 10V9C5.5 5.41015 8.41015 2.5 12 2.5C15.5899 2.5 18.5 5.41015 18.5 9V10C18.5 12.4 19.5 14.5 21 16H3C4.5 14.5 5.5 12.4 5.5 10Z"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Chevron down icon
 */
function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#91a0b3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * TopNavigation component
 * 
 * A top navigation bar with logo, environment badge, search, and actions.
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22507:30172
 */
export function TopNavigation({
  logo,
  environment,
  environmentStatus = 'success',
  searchPlaceholder = 'Search',
  searchValue = '',
  onSearchChange,
  messageCount,
  alertCount,
  avatarSrc,
  avatarAlt = 'User avatar',
  avatarInitials,
  onAvatarClick,
  onMessageClick,
  onAlertClick,
  className,
  style,
}: TopNavigationProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '58px',
    padding: '0 14px',
    backgroundColor: 'var(--color-surface-white, white)',
    borderBottom: '1px solid var(--color-stroke-light, #dee5ef)',
    ...style,
  };

  const leftSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const rightSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '27px',
  };

  const searchContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '34px',
    padding: '5px 10px',
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
    minWidth: '200px',
    flex: 1,
    maxWidth: '400px',
  };

  const searchInputStyle: CSSProperties = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '12px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    color: 'var(--color-text-primary, black)',
  };

  const badgeStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '6px 10px',
    backgroundColor: 'white',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '30px',
  };

  const statusDotColors: Record<string, string> = {
    success: '#0e8662',
    warning: '#f58319',
    error: '#db3a3a',
  };

  const statusDotStyle: CSSProperties = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: statusDotColors[environmentStatus] || statusDotColors.success,
  };

  const iconsContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const iconButtonStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  };

  const badgeCountStyle: CSSProperties = {
    position: 'absolute',
    top: '-3px',
    right: '-3px',
    minWidth: '17px',
    height: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-system-critical, #db3a3a)',
    border: '2px solid white',
    borderRadius: '60px',
    padding: '2px 4px',
  };

  const avatarContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  return (
    <nav className={className} style={containerStyle}>
      {/* Left Section: Logo + Environment */}
      <div style={leftSectionStyle}>
        {logo && <div>{logo}</div>}
        {environment && (
          <div style={badgeStyle}>
            <div style={statusDotStyle} />
            <Text
              variant="body12Medium"
              style={{ color: 'var(--color-text-secondary, #4d5c6e)' }}
            >
              {environment}
            </Text>
          </div>
        )}
      </div>

      {/* Right Section: Search + Actions + Avatar */}
      <div style={rightSectionStyle}>
        {/* Search Input */}
        <div style={searchContainerStyle}>
          <SearchIcon />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        {/* Action Icons */}
        <div style={iconsContainerStyle}>
          {/* Message Icon */}
          <button
            type="button"
            style={iconButtonStyle}
            onClick={onMessageClick}
            aria-label="Messages"
          >
            <MessageIcon />
            {messageCount !== undefined && messageCount > 0 && (
              <div style={badgeCountStyle}>
                <Text
                  variant="body12Semibold"
                  style={{
                    color: 'white',
                    fontSize: '10px',
                    lineHeight: 'normal',
                  }}
                >
                  {messageCount}
                </Text>
              </div>
            )}
          </button>

          {/* Bell Icon */}
          <button
            type="button"
            style={iconButtonStyle}
            onClick={onAlertClick}
            aria-label="Notifications"
          >
            <BellIcon />
            {alertCount !== undefined && alertCount > 0 && (
              <div style={badgeCountStyle}>
                <Text
                  variant="body12Semibold"
                  style={{
                    color: 'white',
                    fontSize: '10px',
                    lineHeight: 'normal',
                  }}
                >
                  {alertCount}
                </Text>
              </div>
            )}
          </button>
        </div>

        {/* Avatar */}
        <button
          type="button"
          style={avatarContainerStyle}
          onClick={onAvatarClick}
          aria-label="User menu"
        >
          <Avatar
            src={avatarSrc}
            alt={avatarAlt}
            initials={avatarInitials}
            size="sm"
          />
          <ChevronDownIcon />
        </button>
      </div>
    </nav>
  );
}
