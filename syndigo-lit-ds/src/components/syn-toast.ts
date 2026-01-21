import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

const variantColors: Record<ToastVariant, { bg: string; border: string; icon: string }> = {
  info: {
    bg: 'var(--color-blue-100, #e7f1ff)',
    border: 'var(--color-button-primary, #2d75e2)',
    icon: 'var(--color-button-primary, #2d75e2)',
  },
  success: {
    bg: '#e1fbf5',
    border: 'var(--color-system-success, #0e8662)',
    icon: 'var(--color-system-success, #0e8662)',
  },
  warning: {
    bg: '#fff4eb',
    border: 'var(--color-system-warning, #f58319)',
    icon: 'var(--color-system-warning, #f58319)',
  },
  error: {
    bg: '#ffecec',
    border: 'var(--color-system-critical, #db3a3a)',
    icon: 'var(--color-system-critical, #db3a3a)',
  },
};

/**
 * Toast notification component
 * 
 * @element syn-toast
 * @fires syn-close - Fired when toast is dismissed
 */
@customElement('syn-toast')
export class SynToast extends LitElement {
  @property() variant: ToastVariant = 'info';
  @property() message = '';
  @property({ type: Boolean }) dismissible = true;
  @property({ type: Number }) duration = 5000;

  private _timeout?: ReturnType<typeof setTimeout>;

  static styles = css`
    :host {
      display: block;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-10, 10px);
      padding: 12px 16px;
      border-radius: var(--radius-sm, 4px);
      border-left: 4px solid;
      box-shadow: var(--shadow-menu-dropdown, 0 14px 18px 0 #4d5c6e26);
    }

    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
    }

    .content {
      flex: 1;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      line-height: var(--line-height-font-line-height-sm, 18px);
      color: var(--color-text-primary, #1d3261);
    }

    .close-btn {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--color-icon-secondary, #718094);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: var(--color-text-primary, #1d3261);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.duration > 0) {
      this._timeout = setTimeout(() => {
        this._handleClose();
      }, this.duration);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('syn-close'));
  }

  private _getIcon() {
    const color = variantColors[this.variant].icon;
    switch (this.variant) {
      case 'success':
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999M22 4L12 14.01L9 11.01" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      case 'warning':
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81442 19.9905C1.98734 20.2939 2.23673 20.5467 2.5377 20.7238C2.83868 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86ZM12 9V13M12 17H12.01" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      case 'error':
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15 9L9 15M9 9L15 15" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
      default: // info
        return html`
          <svg class="icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16V12M12 8H12.01" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
    }
  }

  render() {
    const colors = variantColors[this.variant];

    return html`
      <div
        class="toast"
        style="background-color: ${colors.bg}; border-color: ${colors.border}"
        role="alert"
      >
        ${this._getIcon()}
        <div class="content">${this.message}</div>
        ${this.dismissible
          ? html`
              <button class="close-btn" @click=${this._handleClose} aria-label="Dismiss">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-toast': SynToast;
  }
}
