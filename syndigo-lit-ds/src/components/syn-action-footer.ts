import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('syn-action-footer')
export class SynActionFooter extends LitElement {
  @property({ type: Boolean, attribute: 'show-secondary' }) showSecondary = true;
  @property({ attribute: 'primary-label' }) primaryLabel = 'Save';
  @property({ attribute: 'secondary-label' }) secondaryLabel = 'Cancel';
  @property({ type: Boolean, attribute: 'primary-disabled' }) primaryDisabled = false;
  @property({ type: Boolean, attribute: 'secondary-disabled' }) secondaryDisabled = false;
  @property({ type: Boolean, attribute: 'primary-loading' }) primaryLoading = false;

  static styles = css`
    :host {
      display: block;
    }
    .container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-8, 8px);
      padding: var(--spacing-8, 8px) var(--spacing-16, 16px);
      background-color: var(--color-surface-white, white);
      border-top: 1px solid var(--color-stroke-light, #dee5ef);
      box-sizing: border-box;
    }
  `;

  private _handlePrimaryClick() {
    this.dispatchEvent(new CustomEvent('syn-primary-click', { bubbles: true, composed: true }));
  }

  private _handleSecondaryClick() {
    this.dispatchEvent(new CustomEvent('syn-secondary-click', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container">
        <slot name="secondary">
          ${this.showSecondary ? html`
            <syn-button
              variant="secondary"
              ?disabled=${this.secondaryDisabled}
              @click=${this._handleSecondaryClick}
            >
              ${this.secondaryLabel}
            </syn-button>
          ` : ''}
        </slot>
        <slot name="primary">
          <syn-button
            variant="primary"
            ?disabled=${this.primaryDisabled}
            ?loading=${this.primaryLoading}
            @click=${this._handlePrimaryClick}
          >
            ${this.primaryLabel}
          </syn-button>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-action-footer': SynActionFooter;
  }
}
