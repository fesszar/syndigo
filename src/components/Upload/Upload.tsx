import type { CSSProperties } from 'react';
import type { UploadProps } from './types';
import { Text } from '../Text';

/**
 * Upload icon component
 */
function UploadIcon({ isDragOver }: { isDragOver: boolean }) {
  const size = isDragOver ? 56 : 40;
  const color = isDragOver ? '#2d75e2' : '#4d5c6e';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M3 15L8 10L13 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 13L16 10L21 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="9" r="1.5" fill={color} />
      <path d="M19 2V6M17 4H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Upload component
 * 
 * A drag and drop upload dropzone (UI only - no file handling logic).
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22507:30263
 */
export function Upload({
  title = 'Click or Drag & Drop',
  helperText = 'SVG, PNG, JPG or GIF (max. 800x400px and 5GB)',
  isDragOver = false,
  disabled = false,
  onClick,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  className,
  style,
}: UploadProps) {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    padding: '14px 16px',
    backgroundColor: isDragOver
      ? 'var(--color-blue-100, #e7f1ff)'
      : 'var(--color-surface-light, #f7f9fb)',
    border: `1px dashed ${
      isDragOver
        ? 'var(--color-blue-500, #2d75e2)'
        : 'var(--color-grey-400, #91a0b3)'
    }`,
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
    ...style,
  };

  const textContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    textAlign: 'center',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && onDragEnter) {
      onDragEnter(e);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && onDragLeave) {
      onDragLeave(e);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && onDragOver) {
      onDragOver(e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && onDrop) {
      onDrop(e);
    }
  };

  // Split title to highlight "Click"
  const renderTitle = () => {
    if (title.toLowerCase().startsWith('click')) {
      return (
        <Text variant="body13Semibold" style={{ color: 'var(--color-text-primary, black)' }}>
          <span style={{ color: 'var(--color-blue-500, #2d75e2)' }}>Click</span>
          {title.substring(5)}
        </Text>
      );
    }
    return (
      <Text variant="body13Semibold" style={{ color: 'var(--color-text-primary, black)' }}>
        {title}
      </Text>
    );
  };

  return (
    <div
      className={className}
      style={containerStyle}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <UploadIcon isDragOver={isDragOver} />
      <div style={textContainerStyle}>
        {renderTitle()}
        {helperText && (
          <Text
            variant="supporting11Medium"
            style={{ color: 'var(--color-text-secondary, #4d5c6e)' }}
          >
            {helperText}
          </Text>
        )}
      </div>
    </div>
  );
}
