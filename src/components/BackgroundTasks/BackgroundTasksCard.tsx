import type { CSSProperties, MouseEvent } from 'react';
import { Text } from '../Text';
import type { BackgroundTasksCardProps, BackgroundTaskState, BackgroundTaskType } from './types';

const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 24px',
  backgroundColor: 'var(--color-surface-white)',
  borderLeft: '1px solid var(--color-stroke-light)',
  borderRight: '1px solid var(--color-stroke-light)',
  boxSizing: 'border-box',
};

const cardStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  backgroundColor: 'var(--color-surface-white)',
  borderRadius: '8px',
  width: '100%',
  boxSizing: 'border-box',
};

const iconContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '100px',
  flexShrink: 0,
};

const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  minWidth: 0,
};

const titleRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

// Icon background and card background colors per state (from Figma)
const stateColors: Record<BackgroundTaskState, { 
  iconBg: string; 
  iconBorder: string; 
  iconColor: string;
  cardBg: string;
  dotColor?: string;
}> = {
  queued: {
    iconBg: 'var(--color-surface-light, #f7f9fb)',
    iconBorder: 'var(--color-stroke-light, #dee5ef)',
    iconColor: 'var(--color-text-secondary, #4d5c6e)',
    cardBg: 'var(--color-surface-white, white)',
  },
  processing: {
    iconBg: 'var(--color-blue-100, #e7f1ff)',
    iconBorder: 'var(--color-blue-200, #c8deff)',
    iconColor: 'var(--color-button-primary, #2d75e2)',
    cardBg: 'var(--color-surface-white, white)',
  },
  successNow: {
    iconBg: 'var(--color-green-100, #e1fbf5)',
    iconBorder: 'var(--color-blue-200, #c8deff)',
    iconColor: 'var(--color-system-success, #0e8662)',
    cardBg: 'var(--color-green-100, #e1fbf5)',
    dotColor: 'var(--color-system-success, #0e8662)',
  },
  successDefault: {
    iconBg: 'var(--color-green-100, #e1fbf5)',
    iconBorder: 'var(--color-blue-200, #c8deff)',
    iconColor: 'var(--color-system-success, #0e8662)',
    cardBg: 'var(--color-surface-white, white)',
  },
  failedNow: {
    iconBg: 'var(--color-red-100, #ffecec)',
    iconBorder: 'var(--color-system-critical, #db3a3a)',
    iconColor: 'var(--color-system-critical, #db3a3a)',
    cardBg: 'var(--color-red-100, #ffecec)',
    dotColor: 'var(--color-system-critical, #db3a3a)',
  },
  failedDefault: {
    iconBg: 'var(--color-red-100, #ffecec)',
    iconBorder: 'var(--color-system-critical, #db3a3a)',
    iconColor: 'var(--color-system-critical, #db3a3a)',
    cardBg: 'var(--color-surface-white, white)',
  },
  partialFail: {
    iconBg: 'var(--color-red-100, #ffecec)',
    iconBorder: 'var(--color-system-critical, #db3a3a)',
    iconColor: 'var(--color-system-critical, #db3a3a)',
    cardBg: 'var(--color-surface-white, white)',
  },
  partialFlow: {
    iconBg: 'var(--color-red-100, #ffecec)',
    iconBorder: 'var(--color-system-critical, #db3a3a)',
    iconColor: 'var(--color-system-critical, #db3a3a)',
    cardBg: 'var(--color-surface-white, white)',
  },
};

const stateLabels: Record<BackgroundTaskState, string> = {
  queued: 'Queued',
  processing: 'Processing',
  successNow: 'Successful',
  successDefault: 'Successful',
  failedNow: 'Failed',
  failedDefault: 'Failed',
  partialFail: 'Partially Failed',
  partialFlow: 'Partial',
};

// Title overrides for certain task types (from Figma)
const titleOverrides: Partial<Record<BackgroundTaskType, string>> = {
  uploadProduct: 'Product Upload',
  deleteProduct: 'Delete Products',
  workflowAssignment: 'Assign to Me',
  workflowClearAssignment: 'Clear Assignee',
  workflowChangeAssignment: 'Change Assignee',
};

const filePreviewStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 12px',
  height: '60px',
  backgroundColor: 'var(--color-surface-white)',
  border: '1px solid var(--color-stroke-light)',
  borderRadius: '8px',
  boxSizing: 'border-box',
};

const fileInfoStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const downloadAgainStyle: CSSProperties = {
  color: 'var(--color-button-primary)',
  fontSize: '12px',
  fontWeight: 500,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
};

// States that show expanded card with button
const expandedStates: BackgroundTaskState[] = ['processing', 'successNow', 'successDefault', 'failedNow', 'failedDefault', 'partialFail', 'partialFlow'];

const viewDetailsButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '32px',
  padding: '8px 10px',
  backgroundColor: 'var(--color-surface-white)',
  border: '1px solid var(--color-stroke-light)',
  borderRadius: 'var(--radius-sm, 4px)',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--color-text-primary)',
};

const timestampRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

export function BackgroundTasksCard({
  type,
  state,
  title,
  progress,
  timestamp,
  isNow = false,
  showViewDetails = false,
  onViewDetails,
  progressPercent = 70,
  fileInfo,
  loading = false,
  onClick,
  className,
  style,
}: BackgroundTasksCardProps) {
  const colors = stateColors[state];
  const stateLabel = stateLabels[state];
  const displayTitle = titleOverrides[type] || title;
  const isExpanded = expandedStates.includes(state);
  const hasFilePreview = type === 'downloadAssets' && fileInfo && (state === 'successNow' || state === 'successDefault');
  const showButton = showViewDetails || isExpanded;

  if (loading) {
    return (
      <div className={className} style={{ ...containerStyle, ...style }}>
        <SkeletonCard />
      </div>
    );
  }

  // Determine card background based on state
  const cardBgStyle: CSSProperties = {
    ...cardStyle,
    backgroundColor: colors.cardBg,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  };

  return (
    <div
      className={className}
      style={{ ...containerStyle, cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <div style={cardBgStyle}>
        {/* Main row: Icon + Content */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          {/* Icon with optional progress ring */}
          <div
            style={{
              ...iconContainerStyle,
              backgroundColor: colors.iconBg,
              border: `1px solid ${colors.iconBorder}`,
              position: 'relative',
            }}
          >
            <TaskIcon type={type} state={state} color={colors.iconColor} />
            {/* Progress ring for processing/success states */}
            {(state === 'processing' || state === 'successNow' || state === 'successDefault') && (
              <ProgressRing 
                percent={state === 'processing' ? progressPercent : 100} 
                color={colors.iconColor}
              />
            )}
          </div>

          {/* Content */}
          <div style={{ ...contentStyle, width: '250px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Text variant="body12Medium" style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>
                  {stateLabel}
                </Text>
                <div style={titleRowStyle}>
                  <Text variant="body13Semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {displayTitle}
                  </Text>
                  {progress && (
                    <Text variant="body12Medium" style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>
                      {progress}
                    </Text>
                  )}
                </div>
              </div>
              
              {/* Timestamp with optional dot */}
              {timestamp && (
                <div style={timestampRowStyle}>
                  {isNow && colors.dotColor && <TimestampDot color={colors.dotColor} />}
                  <Text variant="body12Medium" style={{ color: 'var(--color-text-secondary)', fontSize: '11px' }}>
                    {timestamp}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* File preview for download tasks */}
        {hasFilePreview && fileInfo && (
          <div style={{ paddingLeft: '52px', width: '302px' }}>
            <div style={filePreviewStyle}>
              <div style={fileInfoStyle}>
                <Text variant="body12Semibold" style={{ color: 'var(--color-text-primary)', width: '134px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {fileInfo.fileName}
                </Text>
                <Text variant="body12Medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {fileInfo.fileSize}
                </Text>
              </div>
              <button
                type="button"
                style={downloadAgainStyle}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  fileInfo.onDownloadAgain?.();
                }}
              >
                Download again
              </button>
            </div>
          </div>
        )}

        {/* View details button row (only if no file preview) */}
        {showButton && !hasFilePreview && (
          <div style={{ paddingLeft: '52px' }}>
            <button
              type="button"
              style={viewDetailsButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.();
              }}
            >
              View details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', opacity: 0.6 }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--color-surface-light)',
          borderRadius: '100px',
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <div
          style={{
            width: '172px',
            height: '12px',
            backgroundColor: 'var(--color-surface-light)',
            borderRadius: '100px',
          }}
        />
        <div
          style={{
            width: '84px',
            height: '12px',
            backgroundColor: 'var(--color-surface-light)',
            borderRadius: '100px',
          }}
        />
      </div>
    </div>
  );
}

function TaskIcon({ type, state, color }: { type: BackgroundTaskType; state: BackgroundTaskState; color: string }) {
  // Success states use type-specific icons (from Figma)
  if (state === 'successNow' || state === 'successDefault') {
    // Download Assets uses upload-01 icon (download arrow pointing up)
    if (type === 'downloadAssets') {
      return <UploadIcon color={color} />;
    }
    // Other types use package-check icon
    return <PackageCheckIcon color={color} />;
  }
  
  // Failed/Partial states use TYPE-SPECIFIC icons (from Figma)
  if (state === 'failedNow' || state === 'failedDefault' || state === 'partialFail' || state === 'partialFlow') {
    // Upload Product uses file-x-02 icon
    if (type === 'uploadProduct') {
      return <FileXIcon color={color} />;
    }
    // Bulk Edit uses user-x-01 icon
    if (type === 'bulkEdit') {
      return <UserXIcon color={color} />;
    }
    // Others use package-x icon
    return <PackageXIcon color={color} />;
  }

  // Queued state uses clock-refresh icon
  if (state === 'queued') {
    return <ClockRefreshIcon color={color} />;
  }

  // Processing and other states use type-specific icons
  const iconMap: Record<BackgroundTaskType, JSX.Element> = {
    uploadAssets: <PackagePlusIcon color={color} />,
    uploadProduct: <PackagePlusIcon color={color} />,
    downloadAssets: <DownloadIcon color={color} />,
    bulkEdit: <EditIcon color={color} />,
    deleteProduct: <TrashIcon color={color} />,
    workflowAssignment: <ClockRefreshIcon color={color} />,
    workflowClearAssignment: <ClockRefreshIcon color={color} />,
    workflowChangeAssignment: <ClockRefreshIcon color={color} />,
    workflowTransition: <ClockRefreshIcon color={color} />,
    bulkPublish: <SendIcon color={color} />,
    linkRecipients: <LinkIcon color={color} />,
  };

  return iconMap[type] || <ClockRefreshIcon color={color} />;
}

function ProgressRing({ percent, color }: { percent: number; color: string }) {
  const circumference = 2 * Math.PI * 18;
  const strokeDasharray = (percent / 100) * circumference;
  const strokeDashoffset = 0;

  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      style={{ 
        position: 'absolute', 
        top: '-1px', 
        left: '0',
        transform: 'rotate(-90deg)',
      }}
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${strokeDasharray} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
}

function TimestampDot({ color }: { color: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

// Icon components
function PackagePlusIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12V21M12 12L4 7.5M12 12L20 7.5" stroke={color} strokeWidth="1.5" />
      <path d="M16 5.25L8 9.75" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DownloadIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 4V16M12 16L8 12M12 16L16 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// upload-01 icon (from Figma - used for Download Assets success states)
function UploadIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 6L18 9M6 18L9 15L18 6L15 3L6 12L3 21L12 18L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 6V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10 14L14 10M7 17L5.5 18.5C4.1 19.9 4.1 22.1 5.5 23.5C6.9 24.9 9.1 24.9 10.5 23.5L12 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 7L18.5 5.5C19.9 4.1 19.9 1.9 18.5 0.5C17.1 -0.9 14.9 -0.9 13.5 0.5L12 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// State-specific icons (from Figma)
function PackageCheckIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12V21M12 12L4 7.5M12 12L20 7.5" stroke={color} strokeWidth="1.5" />
      <path d="M8 14L10 16L16 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PackageXIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12V21M12 12L4 7.5M12 12L20 7.5" stroke={color} strokeWidth="1.5" />
      <path d="M9 11L15 17M15 11L9 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// file-x-02 icon (from Figma - used for Upload Product failed states)
function FileXIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12.5L14.5 17.5M14.5 12.5L9.5 17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// user-x-01 icon (from Figma - used for Bulk Edit partial fail states)
function UserXIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 10 12.5H5C4.11594 12.5 3.26809 12.8512 2.64298 13.4763C2.01786 14.1014 1.66666 14.9493 1.66666 15.8333V17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16666 3.99238 4.16666 5.83333C4.16666 7.67428 5.65905 9.16667 7.5 9.16667Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5.83334L18.3333 9.16667M18.3333 5.83334L15 9.16667" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockRefreshIcon({ color }: { color: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 6V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 12C20 7.58 16.42 4 12 4C9.5 4 7.27 5.12 5.75 6.88" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4V8H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
