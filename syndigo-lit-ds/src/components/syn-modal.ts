import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './syn-button.js';

export type ModalSize = 'small' | 'medium' | 'large';

const sizeWidths: Record<ModalSize, number> = {
  small: 380,
  medium: 620,
  large: 980,
};

/**
 * Modal dialog component
 * 
 * @element syn-modal
 * @slot - Modal content
 * @fires syn-close - Fired when modal requests to close
 * @fires syn-primary - Fired when primary action is clicked
 * @fires syn-secondary - Fired when secondary action is clicked
 */
@customElement('syn-modal')
export class SynModal extends LitElement {
  @property({ type: Boolean }) open = false;
  @property() title?: string;
  @property({ type: Boolean }) showTitle = true;
  @property() size: ModalSize = 'large';
  @property() primaryLabel = 'Confirm';
  @property() secondaryLabel = 'Cancel';
  @property({ type: Boolean }) showSecondaryButton = true;
  @property({ type: Boolean }) showFooter = true;
  @property({ type: Boolean }) closeOnOverlayClick = true;
  @property({ type: Boolean }) closeOnEscape = true;

  static styles = css`
    :host {
      display: contents;
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

    .modal {
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      background-color: var(--color-surface-white, #ffffff);
      border-radius: var(--radius-sm, 4px);
      box-shadow: 0px 4px 6px -2px rgba(26, 26, 26, 0.2);
      overflow: hidden;
    }

    .title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      padding: 12px 16px;
      background-color: var(--color-surface-light, #f7f9fb);
      border-bottom: 1px solid var(--color-stroke-light, #dee5ef);
      box-sizing: border-box;
    }

    .title {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-md, 16px);
      font-weight: var(--weight-font-weight-semibold, 600);
      color: var(--color-text-primary, #1d3261);
      margin: 0;
      flex-grow: 1;
    }

    .close-btn {
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-primary, #1d3261);
      flex-shrink: 0;
    }

    .close-btn:hover {
      color: var(--color-text-secondary, #4d5c6e);
    }

    .content {
      flex-grow: 1;
      width: 100%;
      padding: 16px;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: 100%;
      padding: 8px 16px;
      background-color: var(--color-surface-white, #ffffff);
      border-top: 1px solid var(--color-stroke-light, #dee5ef);
      box-sizing: border-box;
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
    if (this.open && this.closeOnEscape && e.key === 'Escape') {
      this._handleClose();
    }
  }

  private _handleOverlayClick(e: MouseEvent) {
    if (this.closeOnOverlayClick && e.target === e.currentTarget) {
      this._handleClose();
    }
  }

  private _handleClose() {
    this.dispatchEvent(new CustomEvent('syn-close'));
  }

  private _handlePrimary() {
    this.dispatchEvent(new CustomEvent('syn-primary'));
  }

  private _handleSecondary() {
    this.dispatchEvent(new CustomEvent('syn-secondary'));
  }

  render() {
    if (!this.open) return null;

    const width = sizeWidths[this.size];

    return html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div
          class="modal"
          style="width: ${width}px"
          role="dialog"
          aria-modal="true"
          aria-labelledby=${this.showTitle && this.title ? 'modal-title' : ''}
        >
          ${this.showTitle
            ? html`
                <div class="title-bar">
                  <h2 class="title" id="modal-title">${this.title}</h2>
                  <button class="close-btn" @click=${this._handleClose} aria-label="Close modal">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              `
            : ''}

          <div class="content">
            <slot></slot>
          </div>

          ${this.showFooter
            ? html`
                <div class="footer">
                  ${this.showSecondaryButton
                    ? html`
                        <syn-button variant="secondary" @click=${this._handleSecondary}>
                          ${this.secondaryLabel}
                        </syn-button>
                      `
                    : ''}
                  <syn-button variant="primary" @click=${this._handlePrimary}>
                    ${this.primaryLabel}
                  </syn-button>
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-modal': SynModal;
  }
}
