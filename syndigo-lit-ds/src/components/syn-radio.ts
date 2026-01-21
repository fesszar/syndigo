import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Radio button component
 * 
 * @element syn-radio
 * @fires syn-change - Fired when selection changes
 */
@customElement('syn-radio')
export class SynRadio extends LitElement {
  @property() name = '';
  @property() value = '';
  @property({ type: Boolean }) checked = false;
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

    .radio {
      position: relative;
      width: 17px;
      height: 17px;
      flex-shrink: 0;
    }

    .circle {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 1.5px solid var(--color-stroke-medium, #91a0b3);
      background-color: white;
      transition: all 0.15s ease-in-out;
    }

    :host([checked]) .circle {
      border-color: var(--color-system-focus, #2d75e2);
      background-color: var(--color-system-focus, #2d75e2);
    }

    :host([disabled]) .circle {
      background-color: var(--color-surface-medium, #dee5ef);
    }

    .inner-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: white;
      opacity: 0;
      transition: opacity 0.15s ease-in-out;
    }

    :host([checked]) .inner-dot {
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
      this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: this.value } }));
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
          type="radio"
          name=${this.name}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
        />
        <span
          class="radio"
          role="radio"
          aria-checked=${this.checked}
          aria-disabled=${this.disabled}
          tabindex=${this.disabled ? -1 : 0}
          @keydown=${this._handleKeyDown}
        >
          <span class="circle"></span>
          <span class="inner-dot"></span>
        </span>
        ${this.label ? html`<span class="label-text">${this.label}</span>` : ''}
      </label>
    `;
  }
}

/**
 * Radio group component
 * 
 * @element syn-radio-group
 * @fires syn-change - Fired when selection changes
 */
@customElement('syn-radio-group')
export class SynRadioGroup extends LitElement {
  @property() name = '';
  @property() value?: string;
  @property({ type: Array }) options: RadioOption[] = [];
  @property() direction: 'horizontal' | 'vertical' = 'vertical';

  static styles = css`
    :host {
      display: flex;
    }

    :host([direction="vertical"]) {
      flex-direction: column;
      gap: 8px;
    }

    :host([direction="horizontal"]) {
      flex-direction: row;
      gap: 16px;
    }
  `;

  private _handleChange(e: CustomEvent) {
    this.value = e.detail.value;
    this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: this.value } }));
  }

  render() {
    return html`
      ${this.options.map(
        option => html`
          <syn-radio
            name=${this.name}
            value=${option.value}
            label=${option.label}
            ?checked=${this.value === option.value}
            ?disabled=${option.disabled}
            @syn-change=${this._handleChange}
          ></syn-radio>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-radio': SynRadio;
    'syn-radio-group': SynRadioGroup;
  }
}
