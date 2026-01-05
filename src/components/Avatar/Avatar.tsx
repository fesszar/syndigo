import { useState, type CSSProperties } from 'react';
import type { AvatarProps, AvatarSize, AvatarType } from './types';

// Size configurations from Figma
const sizeConfig: Record<AvatarSize, { size: number; fontSize: number; iconSize: number; radius: string }> = {
  sm: { size: 24, fontSize: 12, iconSize: 14, radius: 'var(--radius-sm, 4px)' },
  md: { size: 28, fontSize: 12, iconSize: 16, radius: 'var(--radius-sm, 4px)' },
  lg: { size: 32, fontSize: 16, iconSize: 18, radius: 'var(--radius-sm, 4px)' },
  xl: { size: 40, fontSize: 16, iconSize: 24, radius: 'var(--radius-md, 8px)' },
};

const baseStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-surface-medium, #dee5ef)',
  overflow: 'hidden',
  flexShrink: 0,
  boxSizing: 'border-box',
};

/**
 * Generate initials from a full name
 * Takes first letter of first and last name
 */
function getInitials(name?: string, fallback = 'FL'): string {
  if (!name) return fallback;
  
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return fallback;
  
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  
  const first = parts[0][0] || '';
  const last = parts[parts.length - 1][0] || '';
  return (first + last).toUpperCase();
}

export function Avatar({
  type = 'initials',
  size = 'md',
  src,
  alt,
  initials,
  name,
  onImageError,
  className,
  style,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const config = sizeConfig[size];

  // Determine effective type (fallback to initials if image fails)
  const effectiveType: AvatarType = 
    type === 'image' && (imageError || !src) ? 'initials' : type;

  // Get initials content
  const initialsContent = initials || getInitials(name);

  const containerStyle: CSSProperties = {
    ...baseStyle,
    width: config.size,
    height: config.size,
    borderRadius: config.radius,
    ...style,
  };

  const handleImageError = () => {
    setImageError(true);
    onImageError?.();
  };

  // Render image type
  if (effectiveType === 'image' && src) {
    return (
      <div className={className} style={containerStyle}>
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={handleImageError}
        />
      </div>
    );
  }

  // Render icon type
  if (effectiveType === 'icon') {
    return (
      <div className={className} style={{ ...containerStyle, padding: size === 'xl' ? '8px' : '4px' }}>
        <UserIcon size={config.iconSize} />
      </div>
    );
  }

  // Render initials type (default)
  const textStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: config.fontSize,
    fontWeight: 500,
    lineHeight: 1.25,
    color: 'var(--color-text-primary)',
    textAlign: 'center',
  };

  return (
    <div className={className} style={containerStyle}>
      <span style={textStyle}>{initialsContent}</span>
    </div>
  );
}

// User icon component (from Figma)
function UserIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Head */}
      <circle
        cx="12"
        cy="8"
        r="4"
        fill="var(--color-text-tertiary, #91a0b3)"
      />
      {/* Body */}
      <path
        d="M4 20c0-4 4-6 8-6s8 2 8 6"
        stroke="var(--color-text-tertiary, #91a0b3)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
