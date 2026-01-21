import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ErrorSeverity = 'error' | 'warning' | 'info';

/**
 * Inline error/warning/info message component
 * 
 * @element syn-inline-error
 */
@customElement('syn-inline-error')
export class SynInlineError extends LitElement {
  @property() message: string = '';
  @property() severity: ErrorSeverity = 'error';

  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-4, 4px);
    }

    .icon {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      margin-top: 1px;
    }

    .message {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      font-weight: var(--weight-font-weight-medium, 500);
    }

    :host([severity="error"]) .icon,
    :host([severity="error"]) .message {
      color: var(--color-system-critical, #db3a3a);
    }

    :host([severity="warning"]) .icon,
    :host([severity="warning"]) .message {
      color: var(--color-system-warning, #f58319);
    }

    :host([severity="info"]) .icon,
    :host([severity="info"]) .message {
      color: var(--color-system-info, #2d75e2);
    }
  `;

  private getIcon() {
    switch (this.severity) {
      case 'warning':
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81442 19.9905C1.98734 20.2939 2.23673 20.5467 2.5377 20.7238C2.83868 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86ZM12 9V13M12 17H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      case 'info':
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16V12M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      default: // error
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 8V12M12 16H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
    }
  }

  render() {
    if (!this.message) return null;

    return html`
      ${this.getIcon()}
      <span class="message">${this.message}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-inline-error': SynInlineError;
  }
}
