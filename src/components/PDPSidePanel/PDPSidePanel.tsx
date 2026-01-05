import type { CSSProperties } from 'react';
import type { PDPSidePanelProps } from './types';

/**
 * Star icon for favorite button
 */
function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L12.09 7.26L18 7.97L13.82 11.63L15.18 17.19L10 14.27L4.82 17.19L6.18 11.63L2 7.97L7.91 7.26L10 2Z"
        fill={filled ? '#2d75e2' : 'none'}
        stroke="#2d75e2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Package icon for type tag
 */
function PackageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M9.625 5.25L4.375 2.625"
        stroke="#4d5c6e"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.25 9.33333V4.66667C12.2497 4.48232 12.2003 4.30128 12.1068 4.14218C12.0132 3.98307 11.8789 3.85145 11.7175 3.76083L7.4675 1.4275C7.30573 1.33651 7.12237 1.28857 6.93583 1.28857C6.7493 1.28857 6.56593 1.33651 6.40417 1.4275L2.15417 3.76083C1.99279 3.85145 1.85843 3.98307 1.76489 4.14218C1.67134 4.30128 1.62199 4.48232 1.62167 4.66667V9.33333C1.62199 9.51768 1.67134 9.69872 1.76489 9.85782C1.85843 10.0169 1.99279 10.1485 2.15417 10.2392L6.40417 12.5725C6.56593 12.6635 6.7493 12.7114 6.93583 12.7114C7.12237 12.7114 7.30573 12.6635 7.4675 12.5725L11.7175 10.2392C11.8789 10.1485 12.0132 10.0169 12.1068 9.85782C12.2003 9.69872 12.2497 9.51768 12.25 9.33333Z"
        stroke="#4d5c6e"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.76501 4.11667L6.93584 7L12.1067 4.11667"
        stroke="#4d5c6e"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.93584 12.775V7"
        stroke="#4d5c6e"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Skeleton loading state
 */
function SkeletonState() {
  const skeletonBarStyle: CSSProperties = {
    backgroundColor: 'var(--color-accent-grey-300, #dee5ef)',
    borderRadius: '10px',
    height: '12px',
  };

  const skeletonBarDimStyle: CSSProperties = {
    ...skeletonBarStyle,
    opacity: 0.6,
    width: '96px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
      {/* Image skeleton */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1/1',
          backgroundColor: 'var(--color-accent-grey-300, #dee5ef)',
          borderRadius: '6px',
        }}
      />
      
      {/* Title skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <div style={skeletonBarDimStyle} />
        <div style={{ ...skeletonBarStyle, width: '100%' }} />
      </div>

      {/* Meta fields skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={skeletonBarDimStyle} />
          <div style={{ ...skeletonBarStyle, width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={skeletonBarDimStyle} />
          <div style={{ ...skeletonBarStyle, width: '100%' }} />
        </div>
      </div>

      {/* Additional skeleton bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <div style={{ ...skeletonBarStyle, width: '100%' }} />
        <div style={{ ...skeletonBarStyle, width: '100%' }} />
        <div style={{ ...skeletonBarDimStyle, width: '108px' }} />
      </div>
    </div>
  );
}

/**
 * PDPSidePanel component
 * 
 * A generic side panel for displaying item details.
 * Supports loading state and customizable content sections.
 */
export function PDPSidePanel({
  loading = false,
  imageUrl,
  imageAlt = '',
  title,
  typeLabel = 'Item',
  typeIcon,
  itemId,
  metaFields = [],
  isFavorite = false,
  onFavoriteClick,
  className,
  style,
}: PDPSidePanelProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '14px',
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    ...style,
  };

  const imageWrapperStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: '1/1',
    border: '1px solid #dee5ef',
    borderRadius: '6px',
    overflow: 'hidden',
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const favoriteButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: '1px solid #bfbfbf',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: 0,
  };

  const titleStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    color: 'var(--color-text-primary, black)',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  };

  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    height: '24px',
    padding: '4px 7px',
    backgroundColor: 'var(--color-surface-light, #f7f9fb)',
    border: '1px solid var(--color-grey-500, #4d5c6e)',
    borderRadius: '30px',
  };

  const tagTextStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-grey-500, #4d5c6e)',
  };

  const idStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-text-secondary, #4d5c6e)',
    margin: 0,
  };

  const metaLabelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-text-secondary, #4d5c6e)',
    margin: 0,
  };

  const metaValueStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '15px',
    color: 'var(--color-text-primary, black)',
    margin: 0,
  };

  if (loading) {
    return (
      <div className={className} style={containerStyle}>
        <SkeletonState />
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      {/* Image section */}
      {imageUrl && (
        <div style={imageWrapperStyle}>
          <img src={imageUrl} alt={imageAlt} style={imageStyle} />
          <button
            type="button"
            style={favoriteButtonStyle}
            onClick={onFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <StarIcon filled={isFavorite} />
          </button>
        </div>
      )}

      {/* Content section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Top wrapper - title, tag, ID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {title && <p style={titleStyle}>{title}</p>}
          
          {typeLabel && (
            <div style={tagStyle}>
              {typeIcon || <PackageIcon />}
              <span style={tagTextStyle}>{typeLabel}</span>
            </div>
          )}
          
          {itemId && <p style={idStyle}>ID: {itemId}</p>}
        </div>

        {/* Meta fields */}
        {metaFields.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {metaFields.map((field, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={metaLabelStyle}>{field.label}</p>
                <p style={metaValueStyle}>{field.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
