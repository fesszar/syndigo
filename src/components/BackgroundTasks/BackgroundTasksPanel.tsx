import type { CSSProperties, ReactNode } from 'react';
import { Text } from '../Text';
import type { BackgroundTasksPanelProps } from './types';

const panelStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--color-surface-white)',
  borderRadius: '12px',
  boxShadow: '0px 14px 18px 0px rgba(77, 92, 110, 0.15)',
  overflow: 'hidden',
  width: '350px',
  boxSizing: 'border-box',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '20px 15px',
  backgroundColor: 'var(--color-surface-white)',
  borderTop: '1px solid var(--color-stroke-light)',
  borderLeft: '1px solid var(--color-stroke-light)',
  borderRight: '1px solid var(--color-stroke-light)',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  boxSizing: 'border-box',
};

const contentStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
  boxSizing: 'border-box',
};

const footerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 16px',
  height: '52px',
  backgroundColor: 'var(--color-surface-light)',
  borderTop: '1px solid var(--color-stroke-light)',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
  boxSizing: 'border-box',
};

const seeAllButtonStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 10px',
  backgroundColor: 'var(--color-surface-white)',
  borderRadius: 'var(--radius-sm, 4px)',
  cursor: 'pointer',
  border: 'none',
  width: '100%',
  justifyContent: 'center',
};

export function BackgroundTasksPanel({
  title = 'Background Tasks',
  loading = false,
  onSeeAllClick,
  children,
  className,
  style,
}: BackgroundTasksPanelProps) {
  return (
    <div className={className} style={{ ...panelStyle, ...style }}>
      {/* Header */}
      <div style={headerStyle}>
        <Text variant="body14Semibold" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </Text>
      </div>

      {/* Content */}
      <div style={contentStyle}>
        {loading ? <SkeletonContent /> : children}
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <button
          type="button"
          style={seeAllButtonStyle}
          onClick={onSeeAllClick}
        >
          <Text variant="body13Semibold" style={{ color: 'var(--color-text-link)' }}>
            See all
          </Text>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function SkeletonContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SkeletonSectionHeader />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard style={{ opacity: 0.5 }} />
    </div>
  );
}

function SkeletonSectionHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 16px',
        backgroundColor: 'var(--color-surface-white)',
        borderLeft: '1px solid var(--color-stroke-light)',
        borderRight: '1px solid var(--color-stroke-light)',
      }}
    >
      <div
        style={{
          width: '79px',
          height: '12px',
          backgroundColor: 'var(--color-surface-light)',
          borderRadius: '100px',
        }}
      />
    </div>
  );
}

function SkeletonCard({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 24px',
        backgroundColor: 'var(--color-surface-white)',
        borderLeft: '1px solid var(--color-stroke-light)',
        borderRight: '1px solid var(--color-stroke-light)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'var(--color-surface-light)',
            borderRadius: '100px',
          }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                width: '64px',
                height: '12px',
                backgroundColor: 'var(--color-surface-light)',
                borderRadius: '100px',
              }}
            />
          </div>
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
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path
        d="M3 2l2 2-2 2"
        stroke="var(--color-text-link)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
