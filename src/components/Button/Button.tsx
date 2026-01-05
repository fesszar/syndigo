import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'critical' | 'text';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const baseStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--spacing-4, 4px)',
  height: '34px',
  padding: '8px 10px',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-family-sans, Inter, sans-serif)',
  fontSize: 'var(--size-font-size-2xs)',
  fontWeight: 'var(--weight-font-weight-medium)',
  lineHeight: '14px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  transition: 'background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
};

const variantStyles: Record<ButtonVariant, {
  default: CSSProperties;
  hover: CSSProperties;
  active: CSSProperties;
  disabled: CSSProperties;
}> = {
  primary: {
    default: {
      backgroundColor: 'var(--color-button-primary)',
      color: '#ffffff',
    },
    hover: {
      backgroundColor: 'var(--color-button-primary)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-button-primary-hover)',
    },
    active: {
      backgroundColor: 'var(--color-blue-400, #5291f0)',
      color: '#ffffff',
    },
    disabled: {
      backgroundColor: '#dee5ef',
      color: '#9ca9b8',
      cursor: 'not-allowed',
    },
  },
  secondary: {
    default: {
      backgroundColor: 'var(--color-surface-white, white)',
      color: 'var(--color-text-primary, black)',
      border: '1px solid var(--color-stroke-light, #dee5ef)',
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      backgroundColor: 'var(--color-surface-light, #f7f9fb)',
      color: 'var(--color-text-primary, black)',
      border: '1px solid var(--color-stroke-medium, #91a0b3)',
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
    },
    active: {
      backgroundColor: 'var(--color-surface-light, #f7f9fb)',
      color: 'var(--color-text-primary, black)',
      border: '1px solid var(--color-stroke-light, #dee5ef)',
    },
    disabled: {
      backgroundColor: '#dee5ef',
      color: '#9ca9b8',
      border: '1px solid #dee5ef',
      cursor: 'not-allowed',
    },
  },
  critical: {
    default: {
      backgroundColor: 'var(--color-system-critical)',
      color: '#ffffff',
    },
    hover: {
      backgroundColor: 'var(--color-system-critical)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-button-critical-hover)',
    },
    active: {
      backgroundColor: '#f17676',
      color: '#ffffff',
    },
    disabled: {
      backgroundColor: '#dee5ef',
      color: '#9ca9b8',
      cursor: 'not-allowed',
    },
  },
  text: {
    default: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-link, #2d75e2)',
      padding: '6px 0',
      height: 'auto',
      fontWeight: 600,
    },
    hover: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-link, #2d75e2)',
      borderBottom: '1.5px solid var(--color-blue-200, #c8deff)',
      padding: '6px 0',
      height: 'auto',
      fontWeight: 600,
    },
    active: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-link, #2d75e2)',
      borderBottom: '1.5px solid var(--color-blue-400, #5291f0)',
      padding: '6px 0',
      height: 'auto',
      fontWeight: 600,
    },
    disabled: {
      backgroundColor: 'transparent',
      color: 'var(--color-blue-300, #85b4fb)',
      padding: '6px 0',
      height: 'auto',
      fontWeight: 600,
      cursor: 'not-allowed',
    },
  },
};

export function Button({
  variant = 'primary',
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  className,
  style,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const getComputedStyle = (): CSSProperties => {
    const variantStyle = variantStyles[variant];
    const stateStyle = isDisabled ? variantStyle.disabled : variantStyle.default;

    return {
      ...baseStyles,
      ...stateStyle,
      ...style,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      const target = e.currentTarget;
      const hoverStyle = variantStyles[variant].hover;
      Object.assign(target.style, hoverStyle);
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      const target = e.currentTarget;
      const defaultStyle = variantStyles[variant].default;
      Object.assign(target.style, defaultStyle);
      // Reset border for text variant
      if (variant === 'text') {
        target.style.borderBottom = 'none';
      }
    }
    onMouseLeave?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      const target = e.currentTarget;
      const activeStyle = variantStyles[variant].active;
      Object.assign(target.style, activeStyle);
    }
    onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      const target = e.currentTarget;
      const hoverStyle = variantStyles[variant].hover;
      Object.assign(target.style, hoverStyle);
    }
    onMouseUp?.(e);
  };

  return (
    <button
      className={className}
      style={getComputedStyle()}
      disabled={isDisabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...rest}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {startIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
          {children}
          {endIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{endIcon}</span>}
        </>
      )}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M14 8a6 6 0 00-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
