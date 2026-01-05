import type { CSSProperties } from 'react';
import type { ThumbnailProps, ThumbnailSize, ThumbnailRadius } from './types';
import { ImagePlaceholderIcon } from '../Icons';

/**
 * Size configurations
 */
const sizeConfig: Record<ThumbnailSize, {
  container: number;
  icon: number;
  padding: number;
}> = {
  xsmall: { container: 24, icon: 12, padding: 0 },
  small: { container: 40, icon: 16, padding: 0 },
  default: { container: 60, icon: 24, padding: 0 },
  large: { container: 80, icon: 32, padding: 0 },
};

/**
 * Radius configurations
 */
const radiusConfig: Record<ThumbnailRadius, Record<ThumbnailSize, number>> = {
  full: {
    xsmall: 4,
    small: 4,
    default: 8,
    large: 8,
  },
  half: {
    xsmall: 2,
    small: 2,
    default: 4,
    large: 4,
  },
};

/**
 * Thumbnail component
 * 
 * A thumbnail component for displaying images or placeholder icons.
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22500:29539
 */
export function Thumbnail({
  src,
  alt = '',
  size = 'default',
  radius = 'full',
  className,
  style,
}: ThumbnailProps) {
  const config = sizeConfig[size];
  const borderRadius = radiusConfig[radius][size];
  const hasImage = !!src;

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: config.container,
    height: config.container,
    borderRadius,
    backgroundColor: 'var(--color-surface-white, white)',
    overflow: 'hidden',
    flexShrink: 0,
    ...(hasImage
      ? {
          // Image variant - no border, subtle shadow for large
          ...(size === 'large' && {
            boxShadow: '0px 1px 0px 0px rgba(26, 26, 26, 0.07)',
          }),
        }
      : {
          // Placeholder variant - border
          border: '1px solid var(--color-stroke-light, #dee5ef)',
        }),
    ...style,
  };

  const imageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <div className={className} style={containerStyle}>
      {hasImage ? (
        <img src={src} alt={alt} style={imageStyle} />
      ) : (
        <ImagePlaceholderIcon size={config.icon} color="#91a0b3" />
      )}
    </div>
  );
}
