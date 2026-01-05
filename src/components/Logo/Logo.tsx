import type { CSSProperties, HTMLAttributes } from 'react';
import { logoAssets } from '../../assets/logos';

export type LogoColor = 'blue' | 'white' | 'black' | 'fullColor';
export type LogoType = 'full' | 'wordmark' | 'icon';
export type LogoBrand = 'syndigo' | 'whiteLabel';

export interface LogoProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  color?: LogoColor;
  type?: LogoType;
  brand?: LogoBrand;
  className?: string;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
}

export function Logo({
  color = 'black',
  type = 'full',
  brand = 'syndigo',
  className,
  style,
  width,
  height = 24,
  ...rest
}: LogoProps) {
  // White label only has full color variant
  if (brand === 'whiteLabel') {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          height: typeof height === 'number' ? `${height}px` : height,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
          ...style,
        }}
        {...rest}
      >
        <img
          src={logoAssets.whiteLabel.fullColor}
          alt="Logo"
          style={{ height: '100%', width: 'auto' }}
        />
      </div>
    );
  }

  // Syndigo logos
  const colorKey = color === 'fullColor' ? 'blue' : color;
  const assets = logoAssets.syndigo[colorKey];

  if (type === 'icon') {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...rest}
      >
        <img
          src={assets.icon}
          alt="Syndigo"
          style={{ height: '83.33%', width: 'auto' }}
        />
      </div>
    );
  }

  if (type === 'wordmark') {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          height: typeof height === 'number' ? `${height}px` : height,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
          ...style,
        }}
        {...rest}
      >
        <img
          src={assets.wordmark}
          alt="Syndigo"
          style={{ height: '100%', width: 'auto' }}
        />
      </div>
    );
  }

  // Full logo (icon + wordmark)
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: typeof height === 'number' ? `${height}px` : height,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        ...style,
      }}
      {...rest}
    >
      <img
        src={assets.icon}
        alt=""
        style={{
          height: '83.33%',
          width: 'auto',
          marginRight: '8px',
        }}
      />
      <img
        src={assets.wordmark}
        alt="Syndigo"
        style={{ height: '100%', width: 'auto' }}
      />
    </div>
  );
}
