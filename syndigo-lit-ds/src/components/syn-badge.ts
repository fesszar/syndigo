import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'critical';
export type BadgeSize = 'sm' | 'md';

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  default: { bg: 'var(--color-surface-medium, #dee5ef)', color: 'var(--color-text-secondary, #4d5c6e)' },
  primary: { bg: 'var(--color-blue-100, #e7f1ff)', color: 'var(--color-button-primary, #2d75e2)' },
  success: { bg: '#e1fbf5', color: 'var(--color-system-success, #0e8662)' },
  warning: { bg: '#fff4eb', color: 'var(--color-system-warning, #f58319)' },
  critical: { bg: '#ffecec', color: 'var(--color-system-critical, #db3a3a)' },
};

/**
 * Badge component for counts and labels
 * 
 * @element syn-badge
 * @slot - Badge content
 */
@customElement('syn-badge')
export class SynBadge extends LitElement {
  @property() variant: BadgeVariant = 'default';
  @property() size: BadgeSize = 'md';

  static styles = css`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-weight: 500;
      border-radius: 10px;
    }

    .badge.sm {
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: 10px;
      line-height: 12px;
    }

    .badge.md {
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      font-size: 11px;
      line-height: 12px;
    }
  `;

  render() {
    const styles = variantStyles[this.variant];

    return html`
      <span
        class="badge ${this.size}"
        style="background-color: ${styles.bg}; color: ${styles.color}"
      >
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-badge': SynBadge;
  }
}
