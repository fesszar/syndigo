import type { CSSProperties } from 'react';
import type { TooltipProps, TooltipDirection } from './types';
import { Text } from '../Text';

/**
 * Arrow component for tooltip
 */
function TooltipArrow({ direction }: { direction: TooltipDirection }) {
  if (direction === 'none') return null;

  const arrowStyle: CSSProperties = {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    flexShrink: 0,
  };

  // Arrow points in the direction prop, so borders are opposite
  const arrowColor = 'var(--color-grey-500, #4d5c6e)';

  switch (direction) {
    case 'top':
      // Arrow points up
      return (
        <div
          style={{
            ...arrowStyle,
            borderWidth: '0 8px 8px 8px',
            borderColor: `transparent transparent ${arrowColor} transparent`,
          }}
        />
      );
    case 'bottom':
      // Arrow points down
      return (
        <div
          style={{
            ...arrowStyle,
            borderWidth: '8px 8px 0 8px',
            borderColor: `${arrowColor} transparent transparent transparent`,
          }}
        />
      );
    case 'left':
      // Arrow points left
      return (
        <div
          style={{
            ...arrowStyle,
            borderWidth: '8px 8px 8px 0',
            borderColor: `transparent ${arrowColor} transparent transparent`,
          }}
        />
      );
    case 'right':
      // Arrow points right
      return (
        <div
          style={{
            ...arrowStyle,
            borderWidth: '8px 0 8px 8px',
            borderColor: `transparent transparent transparent ${arrowColor}`,
          }}
        />
      );
    default:
      return null;
  }
}

/**
 * Tooltip component
 * 
 * A tooltip for displaying contextual information.
 * 
 * **A11y:** Use the `id` prop with `aria-describedby` on the trigger element:
 * ```tsx
 * <button aria-describedby="my-tooltip">Hover me</button>
 * <Tooltip id="my-tooltip" content="Help text" visible={isHovered} />
 * ```
 * 
 * Source: Figma file Lo9r632ePw6mQTi42uqNCk, node 22506:30008
 */
export function Tooltip({
  content,
  direction = 'none',
  id,
  visible = true,
  maxWidth = 250,
  className,
  style,
}: TooltipProps) {
  if (!visible) return null;

  const isHorizontal = direction === 'left' || direction === 'right';

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: 'center',
    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.22)',
    ...style,
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '12px',
    backgroundColor: 'var(--color-grey-500, #4d5c6e)',
    borderRadius: '8px',
    maxWidth,
  };

  // Determine arrow order based on direction
  const arrowFirst = direction === 'top' || direction === 'left';

  return (
    <div
      id={id}
      role="tooltip"
      className={className}
      style={containerStyle}
    >
      {arrowFirst && <TooltipArrow direction={direction} />}
      <div style={contentStyle}>
        {typeof content === 'string' ? (
          <Text
            variant="body12Medium"
            style={{ color: 'var(--color-text-white, white)' }}
          >
            {content}
          </Text>
        ) : (
          content
        )}
      </div>
      {!arrowFirst && <TooltipArrow direction={direction} />}
    </div>
  );
}
