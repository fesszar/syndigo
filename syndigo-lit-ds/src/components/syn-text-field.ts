import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './syn-input-field.js';

export type TextFieldState = 'default' | 'error' | 'disabled';

/**
 * Text input field component
 * 
 * @element syn-text-field
 * @fires syn-input - Fired when the input value changes
 * @fires syn-change - Fired when the input loses focus after value change
 */
@customElement('syn-text-field')
export class SynTextField extends LitElement {
  @property() value = '';
  @property() placeholder?: string;
  @property() label?: string;
  @property({ type: Boolean }) required = false;
  @property() helpText?: string;
  @property() errorText?: string;
  @property({ type: Boolean }) disabled = false;
  @property() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @property({ type: Number }) maxLength?: number;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    input {
      width: 100%;
      height: 34px;
      padding: 5px 10px;
      border-radius: var(--radius-sm, 4px);
      border: 1px solid var(--color-stroke-light, #dee5ef);
      background-color: var(--color-surface-medium, #dee5ef);
      font-family: var(--font-family, 'Inter', sans-serif);
      font-size: var(--size-font-size-2xs, 12px);
      line-height: var(--line-height-font-line-height-2xs, 14px);
      color: var(--color-text-primary, #1d3261);
      box-sizing: border-box;
      outline: none;
      transition: all 0.15s ease;
    }

    input::placeholder {
      color: var(--color-text-tertiary, #91a0b3);
    }

    input:hover:not(:disabled):not(:focus) {
      border-color: var(--color-stroke-medium, #91a0b3);
    }

    input:focus {
      border-color: var(--color-button-primary, #2d75e2);
      background-color: var(--color-surface-white, #ffffff);
    }

    input:disabled {
      background-color: var(--color-surface-light, #f7f9fb);
      color: var(--color-text-tertiary, #91a0b3);
      cursor: not-allowed;
    }

    :host([error]) input {
      background-color: var(--color-surface-medium, #dee5ef);
      border-color: var(--color-stroke-light, #dee5ef);
    }
  `;

  private get isError() {
    return !!this.errorText;
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('syn-input', { detail: { value: this.value } }));
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.dispatchEvent(new CustomEvent('syn-change', { detail: { value: input.value } }));
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('errorText')) {
      if (this.errorText) {
        this.setAttribute('error', '');
      } else {
        this.removeAttribute('error');
      }
    }
  }

  render() {
    return html`
      <syn-input-field
        label=${ifDefined(this.label)}
        ?required=${this.required}
        helpText=${ifDefined(this.helpText)}
        errorText=${ifDefined(this.errorText)}
      >
        <input
          type=${this.type}
          .value=${this.value}
          placeholder=${ifDefined(this.placeholder)}
          ?disabled=${this.disabled}
          maxlength=${ifDefined(this.maxLength)}
          @input=${this.handleInput}
          @change=${this.handleChange}
        />
      </syn-input-field>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'syn-text-field': SynTextField;
  }
}
