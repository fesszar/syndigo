import type { CSSProperties } from 'react';

/**
 * Upload Types
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22507:30263
 * 
 * A drag and drop upload dropzone component (UI only).
 */

export interface UploadProps {
  /** Title text (default: "Click or Drag & Drop") */
  title?: string;
  /** Helper text describing accepted formats */
  helperText?: string;
  /** Whether the dropzone is in dragover state */
  isDragOver?: boolean;
  /** Whether the dropzone is disabled */
  disabled?: boolean;
  /** Click handler for the dropzone */
  onClick?: () => void;
  /** Drag enter handler */
  onDragEnter?: (e: React.DragEvent) => void;
  /** Drag leave handler */
  onDragLeave?: (e: React.DragEvent) => void;
  /** Drag over handler */
  onDragOver?: (e: React.DragEvent) => void;
  /** Drop handler */
  onDrop?: (e: React.DragEvent) => void;
  /** Additional class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}
