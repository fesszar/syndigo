import type { CSSProperties, ReactNode } from 'react';

/**
 * Task type variants (from Figma)
 */
export type BackgroundTaskType =
  | 'uploadAssets'
  | 'uploadProduct'
  | 'downloadAssets'
  | 'bulkEdit'
  | 'deleteProduct'
  | 'workflowAssignment'
  | 'workflowClearAssignment'
  | 'workflowChangeAssignment'
  | 'workflowTransition'
  | 'bulkPublish'
  | 'linkRecipients';

/**
 * Task state variants (from Figma)
 */
export type BackgroundTaskState =
  | 'queued'
  | 'processing'
  | 'successNow'
  | 'successDefault'
  | 'failedNow'
  | 'failedDefault'
  | 'partialFail'
  | 'partialFlow';

/**
 * Section header variants
 */
export type BackgroundTasksSectionVariant =
  | 'currentlyRunning'
  | 'recentlyCompleted'
  | 'skeleton';

/**
 * Panel status variants (from Figma)
 */
export type BackgroundTasksPanelStatus =
  | 'skeleton'
  | 'queued'
  | 'processing'
  | 'successNow'
  | 'successDefault'
  | 'multi'
  | 'mixStatus';

/**
 * BackgroundTasksPanel props (main container)
 */
export interface BackgroundTasksPanelProps {
  /**
   * Panel title
   * @default "Background Tasks"
   */
  title?: string;

  /**
   * Loading state (shows skeleton)
   * @default false
   */
  loading?: boolean;

  /**
   * "See all" link click handler
   */
  onSeeAllClick?: () => void;

  /**
   * Panel content (sections and cards)
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: CSSProperties;
}

/**
 * BackgroundTasksSectionHeader props
 */
export interface BackgroundTasksSectionHeaderProps {
  /**
   * Section variant
   */
  variant: BackgroundTasksSectionVariant;

  /**
   * Loading state (shows skeleton)
   * @default false
   */
  loading?: boolean;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: CSSProperties;
}

/**
 * BackgroundTasksCard props
 */
export interface BackgroundTasksCardProps {
  /**
   * Task type
   */
  type: BackgroundTaskType;

  /**
   * Task state
   */
  state: BackgroundTaskState;

  /**
   * Task title (e.g., "Upload Assets")
   */
  title: string;

  /**
   * Progress indicator (e.g., "5/10")
   */
  progress?: string;

  /**
   * Timestamp or status text (e.g., "Now", "4 seconds ago")
   */
  timestamp?: string;

  /**
   * Show "Now" indicator with colored dot
   * Only applicable when timestamp is "Now"
   * @default false
   */
  isNow?: boolean;

  /**
   * Show "View details" button (shown for processing/success/failed states)
   * @default false
   */
  showViewDetails?: boolean;

  /**
   * "View details" button click handler
   */
  onViewDetails?: () => void;

  /**
   * Progress percentage (0-100) for processing state ring
   * @default 0
   */
  progressPercent?: number;

  /**
   * File info for download tasks (shown in expanded card)
   */
  fileInfo?: {
    fileName: string;
    fileSize: string;
    onDownloadAgain?: () => void;
  };

  /**
   * Loading state (shows skeleton)
   * @default false
   */
  loading?: boolean;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional styles
   */
  style?: CSSProperties;
}
