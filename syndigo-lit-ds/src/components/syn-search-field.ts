import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type SearchFieldState = 'default' | 'hover' | 'active' | 'disabled' | 'error';

/**
 * Search field component with search icon and clear button
 * 
 * @element syn-search-field
 * @fires syn-input - Fired when value changes
 * @fires syn-clear - Fired when clear button is clicked
 */
@customElement('syn-search-field')
export class SynSearchField extends LitElement {
  @property() value = '';
  @property() placeholder = 'Search';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: Boolean }) showClearButton = true;
  @property() errorText?: string;

  @state() private _internalState: SearchFieldState = 'default';

  static styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 4px;
    }

    :host([fullWidth]) {
      width: 100%;
    }

    .container {
      display: flex;
      align-items: center;
      gap: var(--spacing-4, 4px);
      height: 34px;
      padding: 5px 10px;
      border-radius: var(--radius-sm, 4px);
      background-color: var(--color-surface-white, #ffffff);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      transition: border-color 0.15s ease, background-color 0.15s ease;
      box-sizing: border-box;
      width: 218px;
    }

    :host([fullWidth]) .container {
      width: 100%;
    }

    .container:hover:not(.disabled) {
      border-color: #91a0b3;
    }

    .container.active {
      border: 1.5px solid var(--color-button-primary, #2d75e2);
    }

    .container.disabled {
      background-color: #dee5ef;
      border: none;
      cursor: not-allowed;
    }

    .container.error {
      border: 1.5px solid var(--color-system-critical, #db3a3a);
    }

    .search-icon {
      flex-shrink: 0;
      color: var(--color-icon-secondary, #718094);
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background-color: transparent;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: var(--color-text-primary, #1d3261);
      min-width: 0;
    }

    input::placeholder {
      color: var(--color-text-tertiary, #91a0b3);
    }

    input:disabled {
      cursor: not-allowed;
    }

    .clear-btn {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-system-critical, #db3a3a);
    }
  `;

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('syn-input', { detail: { value: this.value } }));
  }

  private _handleFocus() {
    if (!this.disabled) this._internalState = 'active';
  }

  private _handleBlur() {
    if (!this.disabled) this._internalState = 'default';
  }

  private _handleClear() {
    this.value = '';
    this.dispatchEvent(new CustomEvent('syn-clear'));
    this.dispatchEvent(new CustomEvent('syn-input', { detail: { value: '' } }));
  }

  render() {
    const isError = !!this.errorText;
    const effectiveState = this.disabled ? 'disabled' : isError ? 'error' : this._internalState;

    return html`
      <div class="container ${effectiveState}">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <input
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        />
        ${this.showClearButton && this.value && !this.disabled
          ? html`
              <button class="clear-btn" @click=${this._handleClear} aria-label="Clear">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" fill="#dee5ef"/>
                  <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#718094" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            `
          : ''}
      </div>
      ${isError
        ? html`
            <div class="error-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" fill="#db3a3a" fill-opacity="0.15"/>
                <circle cx="8" cy="8" r="6" stroke="#db3a3a" stroke-width="1.5"/>
                <path d="M8 5.5V8.5M8 10.5V10.51" stroke="#db3a3a" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>${this.errorText}</span>
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-search-field': SynSearchField;
  }
}
