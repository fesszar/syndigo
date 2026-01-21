import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DialogType = 'confirm' | 'destructive';

@customElement('syn-dialog')
export class SynDialog extends LitElement {
  @property() type: DialogType = 'confirm';
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = 'Heading';
  @property({ attribute: 'primary-label' }) primaryLabel = 'Confirm';
  @property({ attribute: 'secondary-label' }) secondaryLabel = 'Cancel';
  @property({ type: Boolean, attribute: 'hide-close' }) hideClose = false;
  @property({ type: Boolean, attribute: 'hide-secondary' }) hideSecondary = false;

  static styles = css`
    :host {
      display: none;
    }
    :host([open]) {
      display: block;
    }
    .overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      border-radius: 4px;
      box-shadow: 0px 14px 18px rgba(77, 92, 110, 0.15);
      min-width: 380px;
      max-width: 500px;
      background-color: white;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 8px 10px;
      background-color: var(--color-surface-light, #f7f9fb);
      border-bottom: 1px solid var(--color-surface-medium, #dee5ef);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      box-sizing: border-box;
    }
    .title {
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 11px;
      font-weight: 600;
      line-height: 14px;
      color: var(--color-text-primary, black);
      margin: 0;
    }
    .close-btn {
      width: 20px;
      height: 20px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-icon-secondary, #718094);
    }
    .close-btn:hover {
      color: var(--color-text-primary, black);
    }
    .content {
      width: 100%;
      padding: 20px;
      background-color: white;
      box-sizing: border-box;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 13px;
      font-weight: 500;
      line-height: 16px;
      color: var(--color-text-secondary, #4d5c6e);
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: 100%;
      padding: 0 16px 20px 16px;
      background-color: white;
      box-sizing: border-box;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 10px;
      border-radius: 4px;
      font-family: var(--font-family, Inter, sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      cursor: pointer;
      border: none;
    }
    .btn-secondary {
      height: 32px;
      background-color: white;
      border: 1px solid var(--color-stroke-light, #dee5ef);
      color: var(--color-text-primary, black);
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    }
    .btn-secondary:hover {
      background-color: var(--color-surface-light, #f7f9fb);
    }
    .btn-primary {
      height: 34px;
      background-color: var(--color-button-primary, #2d75e2);
      color: white;
    }
    .btn-primary:hover {
      background-color: var(--color-button-primary-hover, #1a5fc9);
    }
    .btn-critical {
      height: 34px;
      background-color: var(--color-system-critical, #db3a3a);
      color: white;
    }
    .btn-critical:hover {
      background-color: #c52f2f;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._handleKeyDown = this._handleKeyDown.bind(this);
    document.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.open && e.key === 'Escape') {
      this._close();
    }
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('syn-close', { bubbles: true, composed: true }));
  }

  private _handleOverlayClick(e: Event) {
    if (e.target === e.currentTarget) {
      this._close();
    }
  }

  private _handlePrimaryClick() {
    this.dispatchEvent(new CustomEvent('syn-primary', { bubbles: true, composed: true }));
  }

  private _handleSecondaryClick() {
    this.dispatchEvent(new CustomEvent('syn-secondary', { bubbles: true, composed: true }));
    this._close();
  }

  render() {
    if (!this.open) return html``;

    const primaryBtnClass = this.type === 'destructive' ? 'btn btn-critical' : 'btn btn-primary';

    return html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
          <div class="header">
            <h2 id="dialog-title" class="title">${this.title}</h2>
            ${!this.hideClose ? html`
              <button type="button" class="close-btn" @click=${this._close} aria-label="Close dialog">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            ` : ''}
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer">
            ${!this.hideSecondary ? html`
              <button type="button" class="btn btn-secondary" @click=${this._handleSecondaryClick}>
                ${this.secondaryLabel}
              </button>
            ` : ''}
            <button type="button" class=${primaryBtnClass} @click=${this._handlePrimaryClick}>
              ${this.primaryLabel}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-dialog': SynDialog;
  }
}
