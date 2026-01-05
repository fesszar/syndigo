import type { CSSProperties } from 'react';
import type { ProgressBarProps, ProgressBarTone } from './types';

/**
 * Tone color mapping
 */
const toneColors: Record<ProgressBarTone, string> = {
  default: '#2d75e2',
  success: '#0e8662',
  critical: '#db3a3a',
  warning: '#f58319',
};

/**
 * Track background color
 */
const trackColor = 'var(--color-surface-medium, #dee5ef)';

/**
 * LinearProgressBar - Horizontal bar variant
 */
function LinearProgressBar({
  value,
  min,
  max,
  tone,
  height,
  ariaLabel,
  className,
  style,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, ((value - (min || 0)) / ((max || 100) - (min || 0))) * 100));
  const fillColor = toneColors[tone || 'default'];

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: `${height || 14}px`,
    backgroundColor: trackColor,
    borderRadius: '24px',
    overflow: 'hidden',
    ...style,
  };

  const fillStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: fillColor,
    borderRadius: '24px',
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div
      className={className}
      style={containerStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min || 0}
      aria-valuemax={max || 100}
      aria-label={ariaLabel || 'Progress'}
    >
      <div style={fillStyle} />
    </div>
  );
}

/**
 * CircularProgressBar - Ring/circle variant
 */
function CircularProgressBar({
  value,
  min,
  max,
  tone,
  size,
  showLabel,
  ariaLabel,
  className,
  style,
}: ProgressBarProps) {
  const diameter = size || 48;
  const strokeWidth = 4;
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, ((value - (min || 0)) / ((max || 100) - (min || 0))) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const fillColor = toneColors[tone || 'default'];

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: `${diameter}px`,
    height: `${diameter}px`,
    ...style,
  };

  const svgStyle: CSSProperties = {
    transform: 'rotate(-90deg)',
  };

  const labelStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
    fontSize: '10px',
    fontWeight: 600,
    color: 'var(--color-text-primary, black)',
  };

  return (
    <div
      className={className}
      style={containerStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min || 0}
      aria-valuemax={max || 100}
      aria-label={ariaLabel || 'Progress'}
    >
      <svg
        width={diameter}
        height={diameter}
        style={svgStyle}
      >
        {/* Track circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
        />
      </svg>
      {showLabel && (
        <span style={labelStyle}>{Math.round(percentage)}%</span>
      )}
    </div>
  );
}

/**
 * ProgressBar component
 * 
 * Displays progress as a linear bar or circular ring.
 * Supports multiple tones for status indication.
 */
export function ProgressBar(props: ProgressBarProps) {
  const { type = 'bar' } = props;

  if (type === 'circle') {
    return <CircularProgressBar {...props} />;
  }

  return <LinearProgressBar {...props} />;
}
