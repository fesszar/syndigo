import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './syn-inline-error.js';

/**
 * Input field wrapper providing label, help text, and error handling
 * 
 * @element syn-input-field
 * @slot - Input element (TextField, TextArea, etc.)
 */
@customElement('syn-input-field')
export class SynInputField extends LitElement {
  @property() label?: string;
  @property({ type: Boolean }) required = false;
  @property() helpText?: string;
  @property() errorText?: string;
  @property() tooltip?: string;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4, 4px);
      width: 100%;
    }

    .label-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-4, 4px);
    }

    .label {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      font-weight: var(--weight-font-weight-medium, 500);
      line-height: var(--line-height-font-line-height-2xs, 14px);
      color: var(--color-text-secondary, #4d5c6e);
    }

    .required {
      color: var(--color-system-critical, #db3a3a);
    }

    .help-text {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-3xs, 11px);
      line-height: var(--line-height-font-line-height-3xs, 12px);
      color: var(--color-text-tertiary, #91a0b3);
    }

    .tooltip-icon {
      width: 14px;
      height: 14px;
      color: var(--color-icon-tertiary, #91a0b3);
      cursor: help;
    }

    ::slotted(*) {
      width: 100%;
    }
  `;

  render() {
    return html`
      ${this.label
        ? html`
            <div class="label-row">
              <label class="label">
                ${this.label}
                ${this.required ? html`<span class="required">*</span>` : ''}
              </label>
              ${this.tooltip
                ? html`
                    <svg class="tooltip-icon" viewBox="0 0 24 24" fill="none" title=${this.tooltip}>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16V12M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  `
                : ''}
            </div>
          `
        : ''}

      <slot></slot>

      ${this.helpText && !this.errorText
        ? html`<span class="help-text">${this.helpText}</span>`
        : ''}

      ${this.errorText
        ? html`<syn-inline-error message=${this.errorText} severity="error"></syn-inline-error>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-input-field': SynInputField;
  }
}
