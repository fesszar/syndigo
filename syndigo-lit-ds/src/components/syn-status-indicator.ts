import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type StatusType = 'default' | 'neutral' | 'warning' | 'critical' | 'success';

const statusColors: Record<StatusType, { dot: string; text: string }> = {
  default: { dot: 'var(--color-text-tertiary, #91a0b3)', text: 'var(--color-text-secondary, #4d5c6e)' },
  neutral: { dot: 'var(--color-text-tertiary, #91a0b3)', text: 'var(--color-text-secondary, #4d5c6e)' },
  warning: { dot: 'var(--color-system-warning, #f58319)', text: 'var(--color-system-warning, #f58319)' },
  critical: { dot: 'var(--color-system-critical, #db3a3a)', text: 'var(--color-system-critical, #db3a3a)' },
  success: { dot: 'var(--color-system-success, #0e8662)', text: 'var(--color-system-success, #0e8662)' },
};

/**
 * Status indicator component with colored dot and label
 * 
 * @element syn-status-indicator
 */
@customElement('syn-status-indicator')
export class SynStatusIndicator extends LitElement {
  @property() status: StatusType = 'default';
  @property() label?: string;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-6, 6px);
    }

    .indicator {
      display: flex;
      align-items: center;
      gap: var(--spacing-6, 6px);
      padding: 4px 8px;
      border-radius: 12px;
      background-color: var(--color-surface-light, #f7f9fb);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .label {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      white-space: nowrap;
    }
  `;

  render() {
    const colors = statusColors[this.status];

    return html`
      <div class="indicator">
        <span class="dot" style="background-color: ${colors.dot}"></span>
        ${this.label
          ? html`<span class="label" style="color: ${colors.text}">${this.label}</span>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-status-indicator': SynStatusIndicator;
  }
}
