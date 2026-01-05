import type { CSSProperties } from 'react';
import { Text } from '../Text';
import type { ComplexStatusProps, ComplexStatusType, StatusItem } from './types';

// Status dot colors from Figma
const statusColors: Record<ComplexStatusType, string> = {
  success: 'var(--color-system-success, #0e8662)',
  partialSuccess: 'var(--color-system-warning, #f58319)',
  processing: 'var(--color-button-primary, #2d75e2)',
  error: 'var(--color-system-critical, #db3a3a)',
};

const containerStyle: CSSProperties = {
  position: 'relative',
  backgroundColor: 'var(--color-surface-white, white)',
  border: '1px solid var(--color-stroke-light, #dee5ef)',
  borderRadius: '4px',
  boxShadow: '0px 14px 18px 0px rgba(77, 92, 110, 0.15)',
  overflow: 'hidden',
};

const singleRowContainerStyle: CSSProperties = {
  ...containerStyle,
  minHeight: '67px',
};

const doubleRowContainerStyle: CSSProperties = {
  ...containerStyle,
  minHeight: '130px',
};

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '19px',
  padding: '14px 19px',
};

const statusItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const statusLabelRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const dotStyle: CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  flexShrink: 0,
};

const dividerHorizontalStyle: CSSProperties = {
  width: '1px',
  height: '34px',
  backgroundColor: 'var(--color-stroke-light, #dee5ef)',
};

const dividerVerticalStyle: CSSProperties = {
  width: '100%',
  height: '1px',
  backgroundColor: 'var(--color-stroke-light, #dee5ef)',
};

export function ComplexStatus({
  items,
  levels,
  className,
  style,
}: ComplexStatusProps) {
  const itemCount = levels ?? items.length;
  const displayItems = items.slice(0, itemCount);

  // Single item layout
  if (itemCount === 1) {
    return (
      <div className={className} style={{ ...singleRowContainerStyle, ...style }}>
        <div style={{ ...rowStyle, justifyContent: 'center' }}>
          <StatusItemComponent item={displayItems[0]} />
        </div>
      </div>
    );
  }

  // Two items - single row
  if (itemCount === 2) {
    return (
      <div className={className} style={{ ...singleRowContainerStyle, ...style }}>
        <div style={rowStyle}>
          <StatusItemComponent item={displayItems[0]} />
          <div style={dividerHorizontalStyle} />
          <StatusItemComponent item={displayItems[1]} />
        </div>
      </div>
    );
  }

  // Three items - top row has 2, bottom has 1
  if (itemCount === 3) {
    return (
      <div className={className} style={{ ...doubleRowContainerStyle, ...style }}>
        <div style={rowStyle}>
          <StatusItemComponent item={displayItems[0]} />
          <div style={dividerHorizontalStyle} />
          <StatusItemComponent item={displayItems[1]} />
        </div>
        <div style={dividerVerticalStyle} />
        <div style={rowStyle}>
          <StatusItemComponent item={displayItems[2]} />
        </div>
      </div>
    );
  }

  // Four items - 2x2 grid
  return (
    <div className={className} style={{ ...doubleRowContainerStyle, ...style }}>
      <div style={rowStyle}>
        <StatusItemComponent item={displayItems[0]} />
        <div style={dividerHorizontalStyle} />
        <StatusItemComponent item={displayItems[1]} />
      </div>
      <div style={dividerVerticalStyle} />
      <div style={rowStyle}>
        <StatusItemComponent item={displayItems[2]} />
        <div style={dividerHorizontalStyle} />
        <StatusItemComponent item={displayItems[3]} />
      </div>
    </div>
  );
}

function StatusItemComponent({ item }: { item: StatusItem }) {
  if (!item) return null;

  return (
    <div style={statusItemStyle}>
      <Text
        variant="heading16Medium"
        style={{ color: 'var(--color-text-primary, black)' }}
      >
        {item.count}
      </Text>
      <div style={statusLabelRowStyle}>
        <div
          style={{
            ...dotStyle,
            backgroundColor: statusColors[item.type],
          }}
        />
        <Text
          variant="body12Medium"
          style={{ color: 'var(--color-text-secondary, #4d5c6e)' }}
        >
          {item.label}
        </Text>
      </div>
    </div>
  );
}
