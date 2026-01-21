import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Checkbox component
 * 
 * @element syn-checkbox
 * @fires syn-change - Fired when checked state changes
 */
@customElement('syn-checkbox')
export class SynCheckbox extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;
  @property() label?: string;

  static styles = css`
    :host {
      display: inline-flex;
    }

    label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    :host([disabled]) label {
      cursor: not-allowed;
    }

    .checkbox {
      position: relative;
      width: 17px;
      height: 17px;
      flex-shrink: 0;
    }

    .box {
      position: absolute;
      inset: 0;
      border-radius: 4px;
      border: 1.5px solid var(--color-stroke-medium, #91a0b3);
      background-color: white;
      transition: all 0.15s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host([checked]) .box,
    :host([indeterminate]) .box {
      border-color: var(--color-system-focus, #2d75e2);
      background-color: var(--color-system-focus, #2d75e2);
    }

    :host([disabled]) .box {
      background-color: var(--color-surface-medium, #dee5ef);
      border-color: var(--color-stroke-medium, #91a0b3);
    }

    .check-icon {
      opacity: 0;
      color: white;
      transition: opacity 0.15s ease-in-out;
    }

    :host([checked]) .check-icon,
    :host([indeterminate]) .check-icon {
      opacity: 1;
    }

    .label-text {
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: 12px;
      font-weight: 500;
      line-height: 17px;
      color: var(--color-grey-500, #4d5c6e);
    }

    :host([disabled]) .label-text {
      color: var(--color-text-tertiary, #91a0b3);
    }

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
    }
  `;

  private _handleChange() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.dispatchEvent(new CustomEvent('syn-change', { detail: { checked: this.checked } }));
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if ((e.key === ' ' || e.key === 'Enter') && !this.disabled) {
      e.preventDefault();
      this._handleChange();
    }
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        />
        <span
          class="checkbox"
          role="checkbox"
          aria-checked=${this.indeterminate ? 'mixed' : this.checked}
          aria-disabled=${this.disabled}
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${this._handleKeyDown}
          @click=${this._handleChange}
        >
          <span class="box">
            ${this.indeterminate
              ? html`
                  <svg class="check-icon" width="10" height="2" viewBox="0 0 10 2" fill="none">
                    <path d="M1 1H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                `
              : html`
                  <svg class="check-icon" width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4L4.5 7.5L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                `}
          </span>
        </span>
        ${this.label ? html`<span class="label-text">${this.label}</span>` : ''}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-checkbox': SynCheckbox;
  }
}
