import type { CSSProperties } from 'react';
import type { ProductPanelProps, ProductMetaField } from './types';

/**
 * Star icon for favorite button
 */
function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L12.09 7.26L18 7.97L13.82 11.63L15.18 17.24L10 14.27L4.82 17.24L6.18 11.63L2 7.97L7.91 7.26L10 2Z"
        fill={filled ? '#2d75e2' : 'transparent'}
        stroke={filled ? '#2d75e2' : '#718094'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Package icon for product type tag
 */
function PackageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M9.625 5.25L4.375 2.333"
        stroke="#4d5c6e"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.25 9.333V4.667C12.25 4.313 12.064 3.984 11.76 3.8L7.51 1.3C7.196 1.11 6.804 1.11 6.49 1.3L2.24 3.8C1.936 3.984 1.75 4.313 1.75 4.667V9.333C1.75 9.687 1.936 10.016 2.24 10.2L6.49 12.7C6.804 12.89 7.196 12.89 7.51 12.7L11.76 10.2C12.064 10.016 12.25 9.687 12.25 9.333Z"
        stroke="#4d5c6e"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.925 4.025L7 7.008L12.075 4.025"
        stroke="#4d5c6e"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12.775V7"
        stroke="#4d5c6e"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * ProductPanel component
 * 
 * Displays product information in a card layout.
 * Layout/presentation only - no app logic.
 */
export function ProductPanel({
  imageUrl,
  imageAlt = 'Product image',
  title,
  typeLabel = 'Item',
  typeIcon,
  productId,
  metaFields = [],
  isFavorite = false,
  onFavoriteClick,
  onClick,
  className,
  style,
}: ProductPanelProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '14px',
    backgroundColor: 'var(--color-surface-white, white)',
    border: '1px solid var(--color-stroke-light, #dee5ef)',
    borderRadius: '4px',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  const imageContainerStyle: CSSProperties = {
    position: 'relative',
    aspectRatio: '1 / 1',
    width: '100%',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    padding: '10px',
    backgroundColor: 'white',
    border: '1px solid #bfbfbf',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const titleStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    color: 'var(--color-text-primary, black)',
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
    backgroundColor: 'var(--color-accent-grey-200, #f7f9fb)',
    border: '1px solid var(--color-accent-grey-500, #4d5c6e)',
    borderRadius: '30px',
  };

  const tagTextStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-accent-grey-500, #4d5c6e)',
    whiteSpace: 'nowrap',
  };

  const idStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-text-secondary, #4d5c6e)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const metaFieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const metaLabelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: 'var(--color-text-secondary, #4d5c6e)',
  };

  const metaValueStyle: CSSProperties = {
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '15px',
    color: 'var(--color-text-primary, black)',
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.();
  };

  return (
    <div
      className={className}
      style={containerStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image Section */}
      <div style={imageContainerStyle}>
        {imageUrl && (
          <img src={imageUrl} alt={imageAlt} style={imageStyle} />
        )}
        <button
          style={favoriteButtonStyle}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <StarIcon filled={isFavorite} />
        </button>
      </div>

      {/* Content Section */}
      <div style={contentStyle}>
        {/* Top Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={titleStyle}>{title}</p>

          {typeLabel && (
            <div style={tagStyle}>
              {typeIcon || <PackageIcon />}
              <span style={tagTextStyle}>{typeLabel}</span>
            </div>
          )}

          {productId && (
            <p style={idStyle}>ID: #{productId}</p>
          )}
        </div>

        {/* Meta Fields */}
        {metaFields.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {metaFields.map((field: ProductMetaField, index: number) => (
              <div key={`meta-${index}`} style={metaFieldStyle}>
                <span style={metaLabelStyle}>{field.label}</span>
                <span style={metaValueStyle}>{field.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
