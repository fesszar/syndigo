import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type CountIndicatorType = 'default' | 'success' | 'warning' | 'critical' | 'neutral';
export type CountIndicatorContrast = 'strong' | 'subtle';

@customElement('syn-count-indicator')
export class SynCountIndicator extends LitElement {
  @property({ type: Number }) count = 0;
  @property({ type: Number }) max = 99;
  @property() type: CountIndicatorType = 'default';
  @property() contrast: CountIndicatorContrast = 'strong';

  static styles = css`
    :host {
      display: inline-flex;
    }
    .indicator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 3px;
      border-radius: var(--radius-4, 4px);
      min-width: 20px;
      height: 20px;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      box-sizing: border-box;
    }
    /* Strong contrast styles */
    .indicator.strong.default {
      background-color: var(--color-button-primary, #2d75e2);
      color: white;
    }
    .indicator.strong.success {
      background-color: var(--color-system-success, #0e8662);
      color: white;
    }
    .indicator.strong.warning {
      background-color: var(--color-system-warning, #f58319);
      color: white;
    }
    .indicator.strong.critical {
      background-color: var(--color-system-critical, #db3a3a);
      color: white;
    }
    .indicator.strong.neutral {
      background-color: var(--color-gray-500, #4d5c6e);
      color: white;
    }
    /* Subtle contrast styles */
    .indicator.subtle.default {
      background-color: white;
      border: 1px solid var(--color-button-primary, #2d75e2);
      color: var(--color-button-primary, #2d75e2);
    }
    .indicator.subtle.success {
      background-color: white;
      border: 1px solid var(--color-system-success, #0e8662);
      color: var(--color-system-success, #0e8662);
    }
    .indicator.subtle.warning {
      background-color: white;
      border: 1px solid var(--color-system-warning, #f58319);
      color: var(--color-system-warning, #f58319);
    }
    .indicator.subtle.critical {
      background-color: white;
      border: 1px solid var(--color-system-critical, #db3a3a);
      color: var(--color-system-critical, #db3a3a);
    }
    .indicator.subtle.neutral {
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      color: var(--color-text-secondary, #4d5c6e);
    }
  `;

  private _formatCount(): string {
    if (this.count > this.max) {
      return `${this.max}+`;
    }
    return String(this.count);
  }

  render() {
    const classes = ['indicator', this.contrast, this.type].join(' ');

    return html`
      <span class=${classes}>
        ${this._formatCount()}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-count-indicator': SynCountIndicator;
  }
}
